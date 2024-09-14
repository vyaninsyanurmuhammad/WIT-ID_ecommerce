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
    <div className="flex aspect-square h-[384px] w-full max-w-sm overflow-hidden rounded-xl bg-lime-400">
      {loading && <Skeleton className="aspect-square h-full w-full" />}
      {hasError ? (
        <FallbackImage className="text-center" />
      ) : (
        <img
          src={image}
          onLoad={() => setLoading(false)}
          onError={handleError}
          alt={`big-image-product`}
        />
      )}
    </div>
  );
};

export default BigImage;
