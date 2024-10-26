'use client';
import CameraBucket from "@/components/ui/camera-bucket"
import { useCallback, useEffect, useState } from "react";
import HoverEffect from "@/components/ui/card-hover-effect";

export default function Listen(){

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
        try{
            const response = await fetch("/api/camera", {
                method: "POST",
                body: JSON.stringify({image}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log(data);
        }catch(e){
            console.log(e)
        }
    }, [image]);
    useEffect(() => {
        if(image){
            fetchSongsByEmotions()
        }
    }, [image, fetchSongsByEmotions])
    return(
        <div className="flex flex-col justify-center items-center p-5">
            <CameraBucket setImage={setImage}/>
            <HoverEffect items={mockData} />
        </div>
    )
}