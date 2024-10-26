import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Skeleton } from "./skeleton";
import { useState } from "react";
 
export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    albumCover: string;
    albumName: string;
    songName: string;
    artist: string;
    duration: string;
    genre: string;
    link: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
 
  return (
    <div className={cn("max-w-lg mx-auto grid grid-cols-1 gap-4 py-10", className)}>
      {items.map((item, idx) => (
        <div
          key={`${item.albumName}-${item.songName}`}
          className="relative group block h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-purple-900 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 flex-shrink-0">
                <img
                  src={item.albumCover}
                  alt={item.albumName}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0 flex">
                <div>
                <div className="mt-1 text-xs text-zinc-400">{item.artist}</div>
                  <CardTitle className="text-lg">{item.songName}</CardTitle>
                  
                </div>
                <div className="mt-2 flex items-center space-x-4 text-xs text-zinc-500">
                  <span>{item.albumName}</span>
                  <span>•</span>
                  <span>{item.genre}</span>
                  <span>•</span>
                  <span>{item.duration}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-black border border-transparent dark:border-purple/[0.2] group-hover:border-purple-800 relative z-20",
        className
      )}
    >
      <div className="relative ">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide", className)}>
      {children}
    </h4>
  );
};

export default HoverEffect;