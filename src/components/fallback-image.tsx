import { cn } from "@/lib/utils";

const FallbackImage = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-lime-400 text-xl text-zinc-800",
        className,
      )}
    >
      <p className="font-geist-mono font-black">Image not available</p>
    </div>
  );
};

export default FallbackImage;
