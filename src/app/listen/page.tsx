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
interface Item {
    spotifyId: string;
  }
interface EmotionResponse {
  success: boolean;
  faces: Face[];
  annotated_image: string;
}

export default function Listen() {
    const [emotionData, setEmotionData] = useState< Item[] | null>(null);
    
    const [image, setImage] = useState<string | null>(null);

    const fetchSongsByEmotions = useCallback(async () => {
        try {
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
            <HoverEffect items={emotionData} />
        </div>
    )
}