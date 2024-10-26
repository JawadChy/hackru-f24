'use client';
import CameraBucket from "@/components/ui/camera-bucket"
import { useCallback, useEffect, useState } from "react";

export default function Listen(){
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
    }, [image,fetchSongsByEmotions])
    return(
        <div>
            <CameraBucket setImage={setImage}/>
        </div>
    )
}