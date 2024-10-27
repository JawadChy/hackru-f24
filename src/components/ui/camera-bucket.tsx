import { ArrowTrendingUpIcon, CameraIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";

export default function CameraBucket({setImage}: {setImage: (image: string) => void}){
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

    return (
        <button
            className="z-30"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={takePicture}
            style={{ position: 'relative' }}
        >
            <div className="p-[2px] rounded-2xl bg-gradient-to-r from-white/30 via-purple-300/30 to-white/30 hover:from-white/40 hover:via-purple-400/40 hover:to-white/40 transition-all duration-300">
                <div className={`w-[200px] h-[113px] hover:w-[300px] hover:h-[169px] transition-all duration-300 rounded-2xl overflow-hidden`}>
                    <Camera
                        ref={camera}
                        aspectRatio={16 / 9}
                        facingMode="environment"
                        errorMessages={{
                            noCameraAccessible: '',
                            permissionDenied: '',
                            switchCamera: '',
                            canvas: '',
                        }}
                    />
                    <div className={`absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                        <CameraIcon className="text-white h-10 w-10" />
                    </div>
                </div>
            </div>

            {isClicked && (
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-purple-500 text-white text-xs rounded-sm">
                    Done!
                </div>
            )}

            <div className="absolute right-0 -bottom-10 flex flex-col -rotate-[32deg] items-center z-20">
                <ArrowTrendingUpIcon
                    className="text-white h-5 w-5 transform -rotate-[80deg]"
                />
                <span className="text-center text-sm cartoon m-0 w-full leading-tight text-white">
                    Take pic!
                </span>
            </div>
        </button>
    );
}