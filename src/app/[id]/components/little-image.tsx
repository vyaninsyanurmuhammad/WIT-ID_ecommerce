import FallbackImage from "@/components/fallback-image";
import { Skeleton } from "@/components/ui/skeleton";
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
        <img
          src={image}
          onLoad={() => setLoading(false)}
          onError={handleError}
          alt={`image-product-${index}`}
        />
      )}
    </div>
  );
};

export default LittleImage;
