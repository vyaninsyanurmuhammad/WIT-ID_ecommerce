import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { cn } from "../lib/utils";

interface NormalButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const NormalButton = ({ className, children, ...props }: NormalButtonProps) => {
  return (
    <button
      className={cn(
        "font-rubik flex h-10 w-fit items-center gap-3 rounded-full bg-zinc-800 !px-4 font-semibold text-white dark:bg-white dark:text-zinc-900",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default NormalButton;
