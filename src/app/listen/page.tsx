'use client';
import CameraBucket from "@/components/ui/camera-bucket"
import { useEffect, useState } from "react";
export default function Listen(){
    const [image, setImage] = useState<string | null>(null);
    useEffect(() => {
        console.log(image);
    }, [image])

    return(
        <div>
            <CameraBucket setImage={setImage}/>
        </div>
    )
}