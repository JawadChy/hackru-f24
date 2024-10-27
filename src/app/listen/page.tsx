'use client';
import CameraBucket from "@/components/ui/camera-bucket"
import { useCallback, useEffect, useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
export default function Listen(){

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
            console.log("Emotion data:", data);
        } catch(e) {
            console.error(e);
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
            <HoverEffect items={mockData} />
        </div>
    )
}