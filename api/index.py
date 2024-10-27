from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import socket
from utils import get_emotion_from_picture, get_access_token
import requests

from transit_service import TransitDataService

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

transit_service = TransitDataService()

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind(('localhost', port))
            return False
        except socket.error:
            return True

# Spotify API endpoints
SPOTIFY_SEARCH_URL = 'https://api.spotify.com/v1/search'
SPOTIFY_RECOMMENDATIONS_URL = 'https://api.spotify.com/v1/recommendations'
TOKEN_URL = 'https://accounts.spotify.com/api/token'

# Emotion profiles for Spotify recommendations
EMOTION_PROFILES = {
    'happy': {
        'min_valence': 0.6,
        'target_valence': 0.8,
        'min_energy': 0.5,
        'target_energy': 0.7,
        'target_danceability': 0.7,
        'max_instrumentalness': 0.3
    },
    'sad': {
        'max_valence': 0.4,
        'target_valence': 0.3,
        'max_energy': 0.5,
        'target_energy': 0.4,
        'target_danceability': 0.4,
        'min_acousticness': 0.4
    },
    'angry': {
        'min_energy': 0.7,
        'target_energy': 0.8,
        'max_valence': 0.4,
        'target_valence': 0.3,
        'min_tempo': 120,
        'target_loudness': -5
    },
    'neutral': {
        'target_valence': 0.5,
        'target_energy': 0.5,
        'target_danceability': 0.5
    },
    'surprise': {
        'min_energy': 0.6,
        'target_energy': 0.7,
        'target_valence': 0.7,
        'min_danceability': 0.5
    },
    'fear': {
        'max_valence': 0.3,
        'target_energy': 0.7,
        'min_instrumentalness': 0.4,
        'target_tempo': 140
    },
    'disgust': {
        'max_valence': 0.3,
        'target_energy': 0.6,
        'min_instrumentalness': 0.3,
        'target_mode': 0
    }
}

def get_seed_data(emotion, access_token):
    """Get seed tracks and artists based on emotion."""
    try:
        response = requests.get(
            SPOTIFY_SEARCH_URL,
            params={
                'q': emotion,
                'type': 'track,artist',
                'limit': 10
            },
            headers={'Authorization': f'Bearer {access_token}'}
        )
        response.raise_for_status()
        
        data = response.json()
        return {
            'tracks': [track['id'] for track in data.get('tracks', {}).get('items', [])],
            'artists': [artist['id'] for artist in data.get('artists', {}).get('items', [])]
        }
    except Exception as e:
        logger.error(f"Failed to get seed data: {str(e)}")
        return {'tracks': [], 'artists': []}

def get_recommendations(emotion, preferences, access_token):
    """Get song recommendations based on emotion and user preferences."""
    try:
        # Get base profile for detected emotion
        profile = EMOTION_PROFILES.get(emotion, EMOTION_PROFILES['neutral']).copy()
        
        # Adjust profile based on preference
        if preferences.get('moodPreference') == 'complement':
            # Invert the emotional characteristics
            if 'min_valence' in profile:
                profile['min_valence'] = 1 - profile.get('max_valence', 1)
            if 'max_valence' in profile:
                profile['max_valence'] = 1 - profile.get('min_valence', 0)
            if 'target_valence' in profile:
                profile['target_valence'] = 1 - profile['target_valence']
            if 'target_energy' in profile:
                profile['target_energy'] = 1 - profile['target_energy']
                
        elif preferences.get('moodPreference') == 'specific' and preferences.get('targetEmotion'):
            profile = EMOTION_PROFILES.get(preferences['targetEmotion'], profile)

        # Get seed tracks and artists
        seed_data = get_seed_data(emotion, access_token)
        
        # Build recommendation parameters
        params = {
            'limit': 10,
            'market': 'US',
            'min_popularity': 20,
            **profile
        }

        # Add seeds (maximum 5 total)
        if seed_data['tracks']:
            params['seed_tracks'] = ','.join(seed_data['tracks'][:2])
        if seed_data['artists']:
            params['seed_artists'] = ','.join(seed_data['artists'][:1])
        
        # Add genres if specified
        if preferences.get('genres'):
            params['seed_genres'] = ','.join(preferences['genres'][:2])
        
        response = requests.get(
            SPOTIFY_RECOMMENDATIONS_URL,
            params=params,
            headers={'Authorization': f'Bearer {access_token}'}
        )
        response.raise_for_status()
        
        tracks = response.json().get('tracks', [])
        return [{'spotifyId': track['id']} for track in tracks]
        
    except Exception as e:
        logger.error(f"Failed to get recommendations: {str(e)}")
        return []
    
@app.route('/api/nearby-stops', methods=['GET'])
def nearby_stops():
    try:
        lat = float(request.args.get('lat'))
        lon = float(request.args.get('lon'))
        radius = float(request.args.get('radius', 5.0))
        
        stops = transit_service.get_nearby_stops(lat, lon, radius)
        return jsonify({'success': True, 'stops': stops})
    except Exception as e:
        logging.error(f"Error getting nearby stops: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/departures/<int:stop_id>', methods=['GET'])
def departures(stop_id):
    try:
        limit = int(request.args.get('limit', 5))
        departures = transit_service.get_next_departures(stop_id, limit)
        return jsonify({'success': True, 'departures': departures})
    except Exception as e:
        logging.error(f"Error getting departures: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/route', methods=['GET'])
def find_route():
    try:
        from_stop = int(request.args.get('from'))
        to_stop = int(request.args.get('to'))
        
        route = transit_service.find_route(from_stop, to_stop)
        if route is None:
            return jsonify({'success': False, 'error': 'No route found'}), 404
            
        return jsonify({'success': True, 'route': route})
    except Exception as e:
        logging.error(f"Error finding route: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/camera', methods=['POST'])
def camera():
    try:
        data = request.get_json()
        
        if not data or 'image' not in data:
            return jsonify({'success': False, 'error': 'Image data is missing'}), 400
            
        # Get emotion from image
        emotion = get_emotion_from_picture(data)
        if not emotion:
            return jsonify({'success': False, 'error': 'Failed to analyze image'}), 500

        # Get Spotify access token
        access_token = get_access_token()
        
        # Get user preferences or use defaults
        preferences = data.get('preferences', {
            'genres': [],
            'moodPreference': 'complement',
            'targetEmotion': None
        })

        # Get recommendations
        results = get_recommendations(emotion, preferences, access_token)
        
        if not results:
            return jsonify({'success': False, 'error': 'Failed to get recommendations'}), 500
            
        return jsonify({'success': True, 'results': results})
        
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500
    
    

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5328)