'use client';
import CameraBucket from "@/components/ui/camera-bucket"
import { useCallback, useEffect, useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

interface Face {
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  emotions: {
    angry: number;
    disgust: number;
    fear: number;
    happy: number;
    sad: number;
    surprise: number;
    neutral: number;
  };
  dominant_emotion: string;
}

interface EmotionResponse {
  success: boolean;
  faces: Face[];
  annotated_image: string;
}

export default function Listen() {
    const [emotionData, setEmotionData] = useState<EmotionResponse | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const mockData = [
        {
            spotifyId: "3CmHvyZQQAGkKkTjTBFWN6"
        },
        {
          spotifyId: "7CyPwkp0oE8Ro9Dd5CUDjW"
        }
    ];
    
    const [image, setImage] = useState<string | null>(null);

    const fetchSongsByEmotions = useCallback(async () => {
        try {
            setIsAnalyzing(true);
            const response = await fetch("/api/camera", {
                method: "POST",
                body: JSON.stringify({ image }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            const data: EmotionResponse = await response.json();
            setEmotionData(data);
            
            // Log the emotion data for each detected face
            if (data.faces && data.faces.length > 0) {
                data.faces.forEach((face, index) => {
                    console.log(`Face ${index + 1} emotions:`, face.emotions);
                    console.log(`Face ${index + 1} dominant emotion:`, face.dominant_emotion);
                });
            } else {
                console.log('No faces detected in the image');
            }
        } catch(e) {
            console.error('Error analyzing emotions:', e);
        } finally {
            setIsAnalyzing(false);
        }
    }, [image]);

    useEffect(() => {
        if(image) {
            fetchSongsByEmotions();
        }
    }, [image, fetchSongsByEmotions]);
    
    return(
        <div className="flex flex-col w-full justify-center items-center p-5">
            <CameraBucket setImage={setImage}/>
            <div className="absolute top-32 right-72 z-20 flex flex-col -rotate-[32deg] items-center">
                <ArrowTrendingUpIcon className="text-white h-5 w-5 w-full transform -rotate-[80deg]" />
                <span className="text-center text-sm toon m-0 w-full leading-tight text-white">
                    Take pic!
                </span>
            </div>
            {isAnalyzing && (
                <div className="mt-4 text-white">Analyzing emotions...</div>
            )}
            {emotionData && emotionData.faces.length > 0 && (
                <div className="mt-4 text-white">
                    <h3>Detected Emotions:</h3>
                    {emotionData.faces.map((face, index) => (
                        <div key={index} className="mt-2">
                            <p>Face {index + 1} - Dominant Emotion: {face.dominant_emotion}</p>
                        </div>
                    ))}
                </div>
            )}
            <HoverEffect items={mockData} />
        </div>
    )
}