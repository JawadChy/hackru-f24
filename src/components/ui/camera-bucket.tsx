'use client';

import { useRef } from "react";
import { Camera } from "react-camera-pro";
export default function CameraBucket(){
    const cam = useRef(null);

    return(
        <>
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black/[0.96] antialiased bg-grid-white/[0.02]">
            <div className="relative z-10 flex w-full h-[200px]  min-h-screen max-w-7xl flex-col items-center justify-center px-4">
                <div className="animate-fade-in h-[200px] ">
                    <div className=" h-[200px] bg-gradient-to-b from-purple-50 to-purple-400 bg-clip-text py-4 text-center text-4xl font-bold text-transparent md:text-7xl">

                    <Camera
                        aspectRatio="cover"
                        facingMode="environment"
                        errorMessages={{
                            noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
                            permissionDenied: 'Permission denied. Please refresh and give camera permission.',
                            switchCamera:
                            'It is not possible to switch camera to different one because there is only one video device accessible.',
                            canvas: 'Canvas is not supported.',
                        }}
                        videoReadyCallback={() => {
                            console.log('Video feed ready.');
                        }}
                    />
                    </div>
                </div>
            </div>  
            </div>    
        </>
    )
}