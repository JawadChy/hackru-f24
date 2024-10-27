import { motion } from "framer-motion";

interface Item {
  spotifyId: string;
}

interface HoverEffectProps {
  items: Item[];
}

export const HoverEffect: React.FC<HoverEffectProps> = ({ items }) => {
  return (
    <div className={`mt-12 max-w-lg mx-auto z-50 grid grid-cols-1`}>
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
        ></motion.iframe>
      ))}
    </div>
  );
};
