import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const DetailLoading = () => {
  return (
    <div className="mb-10 mt-40 flex flex-col gap-10 lg:flex-row lg:gap-20">
      <div className="flex w-full flex-col gap-6 lg:w-fit">
        <Skeleton className="flex aspect-square h-auto w-full rounded-xl lg:aspect-auto lg:h-[384px] lg:max-w-sm" />
        <div className="flex w-full max-w-sm flex-row gap-5 overflow-x-auto">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-20 shrink-0 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="flex h-auto w-full flex-col gap-10">
        <div className="flex h-full w-full flex-col justify-between gap-4">
          <div className="flex w-full flex-col gap-4">
            <Skeleton className="flex h-9 w-full max-w-96 rounded-xl" />

            <div className="flex flex-row gap-3">
              <Skeleton className="flex h-8 w-full max-w-24 rounded-xl" />

              <Skeleton className="flex h-8 w-full max-w-24 rounded-xl" />
            </div>

            <Skeleton className="flex h-10 w-full max-w-16 rounded-xl" />

            <Separator orientation="horizontal" className="dark:bg-white" />
            <div className="flex flex-col gap-2">
              <Skeleton className="flex h-5 w-full max-w-[80%] rounded-xl" />
              <Skeleton className="flex h-5 w-full max-w-full rounded-xl" />
              <Skeleton className="flex h-5 w-full max-w-lg rounded-xl" />
            </div>
          </div>

          <Skeleton className="flex h-11 w-full max-w-lg rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default DetailLoading;
