import { cn } from "@/lib/utils";
import Image from "next/image";
 
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

  return (
    <div className={"max-w-lg mx-auto grid grid-cols-1 gap-4 py-10"}>
      {items.map((item, idx) => (
        <div
          key={`${item.albumName}-${item.songName}`}
          className="relative group block h-full w-full"

        >

          <Card>
            <div className="flex items-start space-x-4 justify-center">
              <div className="h-20 w-20 flex-shrink-0">
                <Image
                  src={item.albumCover}
                  width={100}
                  height={100}
                  alt={item.albumName}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 min-w-0 flex self-center">
                <div className="flex flex-col justify-center ">
                  <span className="text-[10px] text-zinc-400 m-0">{item.artist}</span>
                  <h2 className="text-md text-white m-0">{item.songName}</h2>
                  <span className="text-[10px] text-zinc-200 m-0">{item.albumName}</span>
                </div>
                <div className="flex items-center space-x-4 px-5 text-xs text-zinc-500">
                  <p className=" text-xs ">{item.genre}</p>
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
        "rounded-2xl h-full w-full overflow-hidden bg-red-500 border border-transparent dark:border-purple/[0.2] group-hover:border-purple-800 relative z-20",
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