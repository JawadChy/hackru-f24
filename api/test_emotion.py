import cv2
import numpy as np
from deepface import DeepFace
import urllib.request

def analyze_image_from_url(image_url):
    try:
        # Download image from URL
        req = urllib.request.urlopen(image_url)
        arr = np.asarray(bytearray(req.read()), dtype=np.uint8)
        frame = cv2.imdecode(arr, cv2.IMREAD_COLOR)

        # Load face cascade classifier
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

        # Convert to grayscale for face detection
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # Detect faces
        faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        results = []
        for (x, y, w, h) in faces:
            # Extract face ROI
            face_roi = frame[y:y + h, x:x + w]
            
            # Analyze emotions
            result = DeepFace.analyze(face_roi, actions=['emotion'], enforce_detection=False)
            
            # Get emotion data
            emotion_data = result[0]['emotion']
            dominant_emotion = result[0]['dominant_emotion']
            
            # Draw rectangle and emotion label
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(frame, dominant_emotion, (x, y - 10), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
            
            results.append({
                'position': {'x': x, 'y': y, 'width': w, 'height': h},
                'emotions': emotion_data,
                'dominant_emotion': dominant_emotion
            })

        # Save the annotated image
        cv2.imwrite('analyzed_image.jpg', frame)
        
        return results

    except Exception as e:
        return f"Error: {str(e)}"

# Test the function with your image URL
if __name__ == "__main__":
    image_url = "https://www.shutterstock.com/image-photo/portrait-sad-man-260nw-126009806.jpg"  # Replace with your image URL
    results = analyze_image_from_url(image_url)
    
    if isinstance(results, list):
        print("\nEmotion Analysis Results:")
        for i, face in enumerate(results):
            print(f"\nFace {i+1}:")
            print(f"Dominant Emotion: {face['dominant_emotion']}")
            print("\nEmotion Scores:")
            for emotion, score in face['emotions'].items():
                print(f"{emotion}: {score:.2f}%")
    else:
        print(results)  # Print error message
        
    print("\nAnalyzed image has been saved as 'analyzed_image.jpg'")