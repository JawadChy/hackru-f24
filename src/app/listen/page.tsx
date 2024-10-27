"use client"
import { useCallback, useEffect, useState } from "react";
import CameraBucket from "@/components/ui/camera-bucket";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Music2, Camera, Sparkles } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";


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
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState<string | null>(null);

    const fetchSongsByEmotions = useCallback(async () => {
        try {
            setLoading(true);
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
            setLoading(false);
            
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
    
    return (
        <main className="flex min-h-screen flex-col bg-black">
            <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-black/[0.96] antialiased bg-grid-white/[0.02]">
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />
                <div className="relative z-10 flex w-full flex-col items-center justify-start px-4 pt-10">
                    <div className="animate-fade-in">
                        <div className="mb-6 flex items-center justify-center space-x-2">
                            <Camera className="h-6 w-6 text-purple-400" />
                            <Sparkles className="h-4 w-4 text-purple-400" />
                        </div>
                        <h1 className="bg-gradient-to-b from-purple-50 to-purple-400 bg-clip-text text-center text-4xl font-bold text-transparent mb-4">
                            Capture Your Mood
                        </h1>
                        
                        <div className="flex w-full max-w-2xl mx-auto justify-center">
                            <CameraBucket setImage={setImage} />
                        </div>

                        {/* {isAnalyzing && (
                            <div className="text-center mt-4">
                                <p className="text-purple-400 animate-pulse">
                                    Analyzing your emotions...
                                </p>
                            </div>
                        )} */}

                        {/* {emotionData?.faces && emotionData.faces.length > 0 && (
                            <div className="mt-8 text-center">
                                <h2 className="bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-2xl font-bold text-transparent mb-2">
                                    Detected Emotion
                                </h2>
                                <p className="text-neutral-300">
                                    {emotionData.faces[0].dominant_emotion}
                                </p>
                            </div>
                        )} */}

                        <div className="mt-8 w-full">
                            <HoverEffect items={emotionData} loading={loading}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}