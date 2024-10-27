from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from deepface import DeepFace
import base64
import logging
import socket

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind(('localhost', port))
            return False
        except socket.error:
            return True

# Test endpoint
@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({'status': 'API is running!'})

# Initialize face cascade classifier
try:
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    if face_cascade.empty():
        raise Exception("Error loading face cascade classifier")
except Exception as e:
    logger.error(f"Failed to load face cascade classifier: {str(e)}")
    raise

@app.route('/api/camera', methods=['POST'])
def camera():
    try:
        # Get JSON data
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'success': False, 'error': 'Image data is missing'}), 400
        
        # Extract the base64 image string
        base64_image = data['image'].split(",")[1] if "," in data['image'] else data['image']
        
        # Convert base64 to image
        image_data = base64.b64decode(base64_image)
        nparr = np.frombuffer(image_data, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None:
            return jsonify({'success': False, 'error': 'Failed to decode image'}), 400

        # Convert frame to grayscale for face detection
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect faces in the frame
        faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        results = []
        for (x, y, w, h) in faces:
            # Extract face ROI
            face_roi = frame[y:y + h, x:x + w]
            
            # Analyze emotions
            result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)
            
            emotion_data = result[0]['emotion']
            dominant_emotion = result[0]['dominant_emotion']
            
            # Draw rectangle and emotion label
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(frame, dominant_emotion, (x, y - 10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
            
            results.append({
                'position': {'x': int(x), 'y': int(y), 'width': int(w), 'height': int(h)},
                'emotions': emotion_data,
                'dominant_emotion': dominant_emotion
            })

        # Convert the annotated image to base64
        _, buffer = cv2.imencode('.jpg', frame)
        img_base64 = base64.b64encode(buffer).decode('utf-8')

        return jsonify({
            'success': True,
            'faces': results,
            'annotated_image': f'data:image/jpeg;base64,{img_base64}'
        })

    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5328)