'use client';
import CameraBucket from "@/components/ui/camera-bucket"
import { useCallback, useEffect, useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
export default function Listen(){

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
        <div className="flex flex-col w-full justify-center items-center p-5">
            <CameraBucket setImage={setImage}/>
            <div className="absolute top-32 right-72 z-20 flex  flex-col -rotate-[32deg] items-center">
          <ArrowTrendingUpIcon
            className={`text-white h-5 w-5 w-full transform -rotate-[80deg]`}
          />
          <span
            className={`text-center text-sm toon m-0  w-full leading-tight text-white`}
          >
            Take pic!
          </span>
        </div>
            <HoverEffect items={mockData} />
        </div>
    )
}