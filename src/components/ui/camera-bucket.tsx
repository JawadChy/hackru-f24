'use client';

import { CameraIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";
export default function CameraBucket({setImage: setImage}: {setImage: (image: string) => void}){
    const camera = useRef<CameraType>(null);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isClicked, setIsClicked] = useState(false);
    const takePicture = () => {
        if (camera.current) {
            const image = camera.current.takePhoto();
            setImage(image as string);
            setIsClicked(true);
            setTimeout(() => setIsClicked(false), 2000); 
        }
    };

    return(
            <button className="absolute top-10 right-10 z-10" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onClick={takePicture}>
                <div className={`transition-all duration-300  z-20 rounded-2xl`}>
                    

                    <div className={`transition-all duration-300 rounded-xl w-[200px] h-[113px] hover:w-[300px] hover:h-[169px]`}>
                        <div className="h-full flex flex-col bg-gray-900 z-30 flex items-center justify-center">
                            <CameraIcon className="text-purple-400 h-10 w-10"/>
                            <div className="text-white text-xs mt-1">Camera problem</div>
                        </div>
                        <Camera
                            ref={camera}
                            aspectRatio="cover"
                            facingMode="environment"
                            errorMessages={{
                                noCameraAccessible: '',
                                permissionDenied: '',
                                switchCamera:'',
                                canvas: '',
                            }}
                        />
                        <div className={`absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 transition-all ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                            <CameraIcon className="text-purple-900 h-10 w-10" />
                        </div>
                    </div> 
                    
                </div>  
                {isClicked && (
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-purple-500 text-white text-xs rounded-sm">
                    Done!
                </div>
            )}
            </button>
            
    )
}