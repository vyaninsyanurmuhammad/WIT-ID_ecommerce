import React, {
  forwardRef,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from "react";
import { cn } from "../lib/utils";

interface NormalButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const NormalButton = forwardRef<HTMLButtonElement, NormalButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex h-10 w-fit items-center gap-3 rounded-full bg-zinc-800 !px-4 font-rubik font-semibold text-white dark:bg-white dark:text-zinc-900",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

NormalButton.displayName = "NormalButton";

export default NormalButton;
