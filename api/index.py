from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/camera', methods=['POST'])
def camera():
    data = request.get_json()
    if not data or 'image' not in data:
        return jsonify({"error": "Image data is missing"}), 400
    # detector = Detector(emotion_model="svm")
    print(data)
    # result = detector.detect_emotion(data['image'])
    result = {"emotion": "happy"}
    return jsonify(result), 200