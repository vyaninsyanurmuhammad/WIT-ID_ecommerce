import React from "react";
import { Skeleton } from "./ui/skeleton";

const LandingSkeletonCard = () => {
  return (
    <div className="flex h-auto w-full flex-col gap-4">
      <Skeleton className="flex h-60 w-full rounded-xl"></Skeleton>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-16"></Skeleton>
          <Skeleton className="h-6 w-full max-w-44"></Skeleton>
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-full"></Skeleton>
            <Skeleton className="h-4 w-full max-w-32"></Skeleton>
          </div>
        </div>
        <Skeleton className="h-6 w-14"></Skeleton>
      </div>
    </div>
  );
};

export default LandingSkeletonCard;
