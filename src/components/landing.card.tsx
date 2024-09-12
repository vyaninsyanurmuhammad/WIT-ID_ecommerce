import React from "react";

const LandingCard = () => {
  return (
    <div className="flex h-auto w-full flex-col gap-4">
      <div className="flex h-60 w-full rounded-xl bg-lime-400"></div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-px">
          <span className="font-rubik text-lg font-medium text-zinc-800/60 dark:text-white/60">Others</span>
          <h2 className="font-rubik text-xl font-medium text-zinc-800 dark:text-white">
            Handmade Fresh Table
          </h2>
          <p className="font-rubik text-zinc-800/60 dark:text-white/60">
            Andy shoes are designed to keeping in...
          </p>
        </div>
        <p className="font-geist-mono text-xl font-black text-zinc-800 dark:text-white">
          $687
        </p>
      </div>
    </div>
  );
};

export default LandingCard;
