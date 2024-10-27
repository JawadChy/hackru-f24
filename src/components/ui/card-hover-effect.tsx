import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface Item {
  spotifyId: string;
}

interface HoverEffectProps {
  items: Item[];
}

export const HoverEffect: React.FC<HoverEffectProps> = ({ items }) => {
  if (!items) {
    return(<>
      Upload a picture
    </>);
  }
  return (
    <div className={`mt-12 justify-center z-50 flex flex-col relative`}>
      <h1 className="text-2xl text-purple-800">Recommended Songs</h1>
      <p className="text-zinc-200 homer">Duration</p>
      <div className="flex flex-col items-center">
        {items.map((item, idx) => (
          <motion.iframe 
          key={idx} 
          allowFullScreen={true} 
          src={`https://open.spotify.com/embed/track/${item.spotifyId}?utm_source=generator&theme=0`} 
          width="450" 
          height="90"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          initial={{ opacity: 0, y: 200 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: idx * 0.5 }}
          whileHover={{
            scale: 1.05, 
            boxShadow: "0px 10px 50px 0px rgba(128, 0, 128, 1)",
            zIndex: 0,
            transition: { duration: 0.3 },
          }}
        />
        
        ))}
      </div>
    </div>
  );
};