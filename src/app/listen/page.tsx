"use client"
import { useCallback, useEffect, useState } from "react";
import CameraBucket from "@/components/ui/camera-bucket";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Music2, Camera, Sparkles, Smile, Frown, Heart, BadgeCheck } from "lucide-react";
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
  results: Item[];
  error?: string;
}

interface MusicPreferences {
  genres: string[];
  moodPreference: 'complement' | 'enhance' | 'specific';
  targetEmotion?: string | null;
}

const genres = [
  { id: 'pop', name: 'Pop' },
  { id: 'rock', name: 'Rock' },
  { id: 'hip-hop', name: 'Hip Hop' },
  { id: 'r-b', name: 'R&B' },
  { id: 'jazz', name: 'Jazz' },
  { id: 'classical', name: 'Classical' },
  { id: 'electronic', name: 'Electronic' },
  { id: 'indie', name: 'Indie' },
];

const emotions = [
  { id: 'happy', name: 'Happy', icon: Smile },
  { id: 'sad', name: 'Sad', icon: Frown },
  { id: 'energetic', name: 'Energetic', icon: Music2 },
  { id: 'calm', name: 'Calm', icon: Heart },
];

export default function Listen() {
    const [emotionData, setEmotionData] = useState<Item[] | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [preferences, setPreferences] = useState<MusicPreferences>({
        genres: [],
        moodPreference: 'complement',
        targetEmotion: null
    });

    const fetchSongsByEmotions = useCallback(async () => {
        try {
            setIsAnalyzing(true);
            const response = await fetch("/api/camera", {
                method: "POST",
                body: JSON.stringify({ 
                    image,
                    preferences 
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            const data: EmotionResponse = await response.json();
            setEmotionData(data);
        } catch(e) {
            console.error('Error analyzing emotions:', e);
            setEmotionData(null);
        } finally {
            setIsAnalyzing(false);
        }
    }, [image, preferences]);

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
                        
                        {/* Music Preferences Section */}
                        <div className="w-full max-w-2xl mx-auto mb-8 space-y-6 p-4">
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-purple-200">Select Genres</h3>
                                <div className="flex flex-wrap gap-2">
                                    {genres.map((genre) => (
                                        <button
                                            key={genre.id}
                                            onClick={() => setPreferences(prev => ({
                                                ...prev,
                                                genres: prev.genres.includes(genre.id)
                                                    ? prev.genres.filter(g => g !== genre.id)
                                                    : [...prev.genres, genre.id]
                                            }))}
                                            className={`px-4 py-2 rounded-full text-sm transition-all ${
                                                preferences.genres.includes(genre.id)
                                                    ? 'bg-purple-500 text-white'
                                                    : 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30'
                                            }`}
                                        >
                                            {genre.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-purple-200">Music Mood</h3>
                                <div className="flex flex-col space-y-2">
                                    <button
                                        onClick={() => setPreferences(prev => ({
                                            ...prev,
                                            moodPreference: 'complement',
                                            targetEmotion: null
                                        }))}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                                            preferences.moodPreference === 'complement'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30'
                                        }`}
                                    >
                                        <BadgeCheck className="w-5 h-5" />
                                        <span>Balance my mood (recommend opposite)</span>
                                    </button>
                                    <button
                                        onClick={() => setPreferences(prev => ({
                                            ...prev,
                                            moodPreference: 'enhance',
                                            targetEmotion: null
                                        }))}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                                            preferences.moodPreference === 'enhance'
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30'
                                        }`}
                                    >
                                        <Music2 className="w-5 h-5" />
                                        <span>Enhance my current mood</span>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {/* <h3 className="text-lg font-semibold text-purple-200">Or Choose Specific Mood</h3> */}
                                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-2"> */}
                                    {/* {emotions.map((emotion) => (
                                        <button
                                            key={emotion.id}
                                            onClick={() => setPreferences(prev => ({
                                                ...prev,
                                                moodPreference: 'specific',
                                                targetEmotion: emotion.id
                                            }))}
                                            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                                                preferences.moodPreference === 'specific' && preferences.targetEmotion === emotion.id
                                                    ? 'bg-purple-500 text-white'
                                                    : 'bg-purple-500/20 text-purple-200 hover:bg-purple-500/30'
                                            }`}
                                        >
                                            <emotion.icon className="w-5 h-5" />
                                            <span>{emotion.name}</span>
                                        </button>
                                    ))} */}
                                {/* </div> */}
                            </div>
                        </div>

                        <div className="flex w-full max-w-2xl mx-auto justify-center">
                            <CameraBucket setImage={setImage} />
                        </div>

                        {isAnalyzing && (
                            <div className="text-center mt-4">
                                <p className="text-purple-400 animate-pulse">
                                    Analyzing your emotions...
                                </p>
                            </div>
                        )}

                        <div className="mt-8 w-full">
                            <HoverEffect items={emotionData || []} isLoading={isAnalyzing} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}