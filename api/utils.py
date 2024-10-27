import cv2
import os
import numpy as np
from deepface import DeepFace
import base64
import requests
import logging
from dotenv import load_dotenv

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

SPOTIFY_API_URL = 'https://api.spotify.com/v1/search'
TOKEN_URL = 'https://accounts.spotify.com/api/token'

try:
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    if face_cascade.empty():
        raise Exception("Error loading face cascade classifier")
except Exception as e:
    logger.error(f"Failed to load face cascade classifier: {str(e)}")
    raise

def get_access_token():
    client_id = os.getenv('SPOTIFY_CLIENT_ID')
    client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')
    credentials = f"{client_id}:{client_secret}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()

    try:
        response = requests.post(TOKEN_URL, data={
            'grant_type': 'client_credentials'
        }, headers={
            'Authorization': f'Basic {encoded_credentials}',
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        response_data = response.json()
        return response_data['access_token']
    except Exception as e:
        logger.error(f"Failed to retrieve access token: {str(e)}")
        raise

def get_emotion_from_picture(data):
    if 'image' not in data:
        logger.error("Image data is missing from input")
        return {'success': False, 'error': 'Image data is missing'}

    base64_image = data['image'].split(",")[1] if "," in data['image'] else data['image']
    image_data = base64.b64decode(base64_image)
    nparr = np.frombuffer(image_data, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if frame is None:
        logger.error("Failed to decode image")
        return {'success': False, 'error': 'Failed to decode image'}

    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    dominant_emotion = None
    for (x, y, w, h) in faces:
        face_roi = frame[y:y + h, x:x + w]
        result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)
        
        dominant_emotion = result[0]['dominant_emotion']
        

    return dominant_emotion if dominant_emotion else None
