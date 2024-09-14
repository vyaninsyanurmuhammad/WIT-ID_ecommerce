"use client";

import React, { useState } from "react";
import FallbackImage from "./fallback-image";

interface LandingCardProps {
  image: string;
  title: string;
  description: string;
  category: string;
  price: number;
}

const LandingCard = ({
  image,
  title,
  description,
  category,
  price,
}: LandingCardProps) => {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className="flex h-auto w-full flex-col gap-4">
      <div className="flex h-60 w-full overflow-hidden rounded-xl">
        {hasError ? (
          <FallbackImage />
        ) : (
          <img
            src={image}
            alt={`title-${image.split(" ").join("-")}`}
            className="relative w-full object-cover"
            onError={handleError} // Handle image load error
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-px">
          <span className="font-rubik text-lg font-medium text-zinc-800/60 dark:text-white/60">
            {category}
          </span>
          <h2 className="line-clamp-1 font-rubik text-xl font-medium text-zinc-800 dark:text-white">
            {title}
          </h2>
          <p className="line-clamp-2 font-rubik text-zinc-800/60 dark:text-white/60">
            {description}
          </p>
        </div>
        <p className="font-geist-mono text-xl font-black text-zinc-800 dark:text-white">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default LandingCard;
