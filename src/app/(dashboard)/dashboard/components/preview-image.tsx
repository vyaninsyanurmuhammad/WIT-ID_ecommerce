import FallbackImage from "@/components/fallback-image";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React, { useState } from "react";

const PreviewImage = ({ image, index }: { image: string; index: number }) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative flex h-[384px] w-full overflow-hidden rounded-xl">
      {loading && <Skeleton className="absolute h-full w-full" />}
      {hasError ? (
        <FallbackImage className="text-center" />
      ) : (
        <Image
          src={image}
          className="!relative !h-full !w-full object-cover"
          onLoad={() => setLoading(false)}
          onError={handleError}
          sizes="100%"
          fill
          unoptimized
          alt={`preview-${index}`}
        />
      )}
    </div>
  );
};

export default PreviewImage;
