import FallbackImage from "@/components/fallback-image";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useState } from "react";

const BigImage = ({ image }: { image: string }) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setLoading(false);
    setHasError(true);
  };

  return (
    <div className="group relative flex h-auto w-full overflow-hidden rounded-xl lg:aspect-square lg:h-[384px] lg:max-w-sm">
      {loading && <Skeleton className="absolute aspect-square h-full w-full" />}
      {hasError ? (
        <FallbackImage className="text-center" />
      ) : (
        <img
          src={image}
          className="relative w-full object-cover transition-all ease-in-out group-hover:scale-125"
          onLoad={() => setLoading(false)}
          onError={handleError}
          alt={`big-image-product`}
        />
      )}
    </div>
  );
};

export default BigImage;
