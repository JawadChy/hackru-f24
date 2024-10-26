'use client';
import CameraBucket from "@/components/ui/camera-bucket"
import { useCallback, useEffect, useState } from "react";
import HoverEffect from "@/components/ui/card-hover-effect";

interface EmotionResponse {
    success: boolean;
    faces: Array<{
        position: { x: number; y: number; width: number; height: number };
        emotions: Record<string, number>;
        dominant_emotion: string;
    }>;
    annotated_image: string;
    error?: string;
}

export default function Listen(){

    const [emotionData, setEmotionData] = useState<EmotionResponse | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const mockData = [
        {
            albumCover: "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/TheMelodicBlueCover.jpeg/220px-TheMelodicBlueCover.jpeg",
            albumName: "The Melodic Blue",
            songName: "Family Ties",
            artist: "Baby Keem",
            genre: "Rap",
            duration: "3:45",
            link: "some shit"
        },
        {
            albumCover: "https://upload.wikimedia.org/wikipedia/en/thumb/9/90/TheMelodicBlueCover.jpeg/220px-TheMelodicBlueCover.jpeg",
            albumName: "The Melodic Blue",
            songName: "Orange Soda",
            artist: "Baby Keem",
            genre: "Rap",
            duration: "2:56",
            link: "some shit"
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
        <div>
            <CameraBucket setImage={setImage}/>
            <HoverEffect items={mockData} />
        </div>
    )
}