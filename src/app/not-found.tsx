import Image from "next/image";
import { useEffect } from "react";

export default function Homer (){
    return(
        <main className="min-h-screen bg-homer-color h-full z-50">
            <header className="h-full z-50">
                <h1 className="flex text-8xl align-bottom font-bold justify-end py-5 justify-center h-full">
                    Mr.X's Web Page*
                </h1>
            </header>
            <div className="flex justify-cente z-50">
                <Image src="/man.gif" alt="Rotating man" width={400} height={500}/>
            </div>
            <div className="toasters">
                <strong className="absolute top-64 left-24">
                    <Image src="/toaster.gif" alt="Rotating man" width={50} height={500}/>
                </strong>
                <strong className="absolute top-96 left-56">
                    <Image src="/toaster.gif" alt="Rotating man" width={50} height={500}/>
                </strong>
                <strong className="absolute top-64 right-24">
                    <Image src="/toaster.gif" alt="Rotating man" width={50} height={500}/>
                </strong>
                <strong className="absolute top-32 right-0">
                    <Image src="/toaster.gif" alt="Rotating man" width={50} height={500}/>
                </strong>
            </div>
<audio id='a1'>
  <source src='/static/src.mp3' type='audio/mpeg' />
  Your browser does not support the audio element.
</audio>
            <footer className=" text-xs p-5 mt-24">
                * Not plagiarized modern version
            </footer>
        </main>
    )

}