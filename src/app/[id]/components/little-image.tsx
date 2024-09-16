import FallbackImage from "@/components/fallback-image";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React, { useState } from "react";

const LittleImage = ({ image, index }: { image: string; index: number }) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden">
      {loading && <Skeleton className="absolute aspect-square h-full w-full" />}
      {hasError ? (
        <FallbackImage className="text-xs text-center" />
      ) : (
        <Image
          src={image}
          onLoad={() => setLoading(false)}
          onError={handleError}
          className="!relative !h-full !w-full object-cover"
          alt={`image-product-${index}`}
          sizes="100%"
          fill
          unoptimized
        />
      )}
    </div>
  );
};

export default LittleImage;
