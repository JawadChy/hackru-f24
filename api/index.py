from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import socket
from utils import get_emotion_from_picture, get_access_token
import requests
import logging

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


SPOTIFY_API_URL = 'https://api.spotify.com/v1/search'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
@app.route('/api/camera', methods=['POST'])
def camera():
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'success': False, 'error': 'Image data is missing'}), 400
        emotion = get_emotion_from_picture(data)
        if not emotion:
            return jsonify({'success': False, 'error': 'Failed to analyze image'}), 500


        access_token = get_access_token()

        response = requests.get(SPOTIFY_API_URL, params={
            'q': emotion,
            'type': 'track',
            'limit': 10
        }, headers={'Authorization': f'Bearer {access_token}'})

        songs = response.json().get('tracks', {}).get('items', [])
        results = [{
            'spotifyId': song["id"]
        } for song in songs]
        return jsonify(results)
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5328)