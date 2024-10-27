import { motion, AnimatePresence } from "framer-motion";
import { Suspense, useState } from "react";
import { cn } from "@/lib/utils";
import { ThreeDots } from "react-loader-spinner";
import { ArrowUp } from "lucide-react";

interface Item {
  spotifyId: string;
}

interface HoverEffectProps {
  items: Item[] | null;
  loading: boolean;
}

export const HoverEffect: React.FC<HoverEffectProps> = ({ items, loading }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className={cn("flex flex-col items-center justify-center w-full", )}>
      <h1 className="mt-12  text-3xl font-bold mb-2 bg-gradient-to-r from-purple-200 via-purple-400 to-purple-200 bg-clip-text text-transparent">
        Recommended Songs
      </h1>
      <p className="text-sm text-neutral-300 mb-8 bg-gradient-to-r from-purple-100/80 to-purple-50/80 bg-clip-text text-transparent font-medium">
        Based on your current mood
      </p>
      <div className="flex flex-col items-center gap-6 w-full max-w-[450px] mb-16">

      {loading ? (
        Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center w-full h-24 bg-purple-500/10 rounded-2xl">
            <ThreeDots height="80" width="80" color="#2E073F" ariaLabel="loading" />
          </div>
        ))
      ):(
        <>
        {!items && (
          <p className="text-lg text-white flex flex-col justify-center items-center">
          <span className="flex justify-center items-center">
            <ArrowUp className="h-10 w-10 mb-2" />
          </span>
          Upload a picture to get song recommendations!
        </p>
        )}
        {items && items.length > 0 && (
          <Suspense fallback={<ThreeDots height="80" width="80" color="#2E073F" ariaLabel="loading" />}>
            {items.map((item, idx) => (
              <div
                key={idx}
                className="relative w-full"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <>
                      <motion.span
                        className="absolute inset-0 -inset-x-6 -inset-y-4 bg-purple-500/20 rounded-2xl blur-md"
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: { duration: 0.2 },
                        }}
                        exit={{
                          opacity: 0,
                          transition: { duration: 0.2, delay: 0.1 },
                        }}
                      />
                      <motion.span
                        className="absolute inset-0 -inset-x-8 -inset-y-6 bg-purple-400/10 rounded-3xl blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: { duration: 0.2 },
                        }}
                        exit={{
                          opacity: 0,
                          transition: { duration: 0.2, delay: 0.1 },
                        }}
                      />
                    </>
                  )}
                </AnimatePresence>
                <motion.div
                  className="relative w-full rounded-xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, y: 200 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                    delay: idx * 0.5,
                  }}
                >
                  <motion.iframe
                    allowFullScreen
                    src={`https://open.spotify.com/embed/track/${item.spotifyId}?utm_source=generator&theme=0`}
                    width="100%"
                    height="90"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="relative z-10 rounded-xl bg-black/90 border border-purple-500/20"
                    style={{
                      transform: hoveredIndex === idx ? 'scale(1.02)' : 'scale(1)',
                      transition: 'all 0.3s ease-out',
                      boxShadow: hoveredIndex === idx
                        ? '0 8px 30px -6px rgba(168, 85, 247, 0.3)'
                        : '0 4px 20px -2px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                </motion.div>
              </div>
            ))}
          </Suspense>
        )}
      </>
      )}
      </div>
    </div>
  );
};

export default HoverEffect;