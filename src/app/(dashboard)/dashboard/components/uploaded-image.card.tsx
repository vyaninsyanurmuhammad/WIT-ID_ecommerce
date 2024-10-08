"use client";

import FallbackImage from "@/components/fallback-image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const UploadedImageCard = ({
  image,
  index,
  onDeleteClick,
}: {
  image: string;
  index: number;
  onDeleteClick: () => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setLoading(false);
    setHasError(true);
  };

  return (
    <div className="flex w-full justify-between gap-3" key={index}>
      <div className="relative aspect-square h-auto max-h-96 w-full overflow-hidden rounded-xl">
        {loading && (
          <Skeleton className="absolute aspect-square h-96 w-full rounded-xl" />
        )}
        {hasError ? (
          <FallbackImage />
        ) : (
          <Image
            src={image}
            className={`!relative !w-full object-cover`}
            onLoad={() => setLoading(false)}
            alt={`upload-image-${index}`}
            onError={handleError}
            sizes="100%"
            fill
            unoptimized
          />
        )}
      </div>
      <Button size={"icon"} type="button" onClick={onDeleteClick}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UploadedImageCard;
