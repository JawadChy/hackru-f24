'use client';

import { useRef } from "react";
import { Camera, CameraType } from "react-camera-pro";
export default function CameraBucket({setImage: setImage}: {setImage: (image: string) => void}){
    const camera = useRef<CameraType>(null);

    const takePicture = () => {
        if (camera.current) {
            const image = camera.current.takePhoto();
            setImage(image as string);
        }
    };

    return(
            <button onClick={takePicture} >
                <div className={`transition-all duration-300 absolute top-10 right-10 z-20 rounded-2xl`}>
                    <div className={`transition-all duration-300 rounded-xl w-[200px] h-[113px] hover:w-[300px] hover:h-[169px]`}>
                        <Camera
                            ref={camera}
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
                        <div className="h-full bg-red-200 z-30"/>
                    </div>  
                </div>  
            </button>
    )
}