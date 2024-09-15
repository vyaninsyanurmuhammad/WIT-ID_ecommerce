"use client";

import React, { DetailedHTMLProps } from "react";
import { CircleUser, LayoutGrid, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hook";

interface NavbarProps
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {}

const Navbar = ({ className, ...props }: NavbarProps) => {
  const chartState = useAppSelector((state) => state.cartReducer);

  return (
    <nav
      className={cn(
        "fixed left-0 top-0 z-50 w-full px-5 backdrop-blur-xl sm:backdrop-blur-none xl:px-0",
        className,
      )}
      {...props}
    >
      <div className="container mx-auto flex w-full items-center justify-between pb-3 pt-4 sm:pb-2 sm:pt-8">
        <div className="relative h-7">
          <Image
            className="!relative object-contain brightness-0 dark:invert"
            src={"/assets/images/svg/logo.svg"}
            fill
            priority
            sizes="100%"
            alt="logo-brand"
          />
        </div>

        <div className="flex gap-3">
          <Link
            href={"/"}
            className="flex h-10 w-fit items-center gap-3 rounded-full bg-zinc-800 !px-4 font-rubik font-semibold text-white dark:bg-white dark:text-zinc-900"
          >
            <LayoutGrid className="h-4 w-4 fill-white dark:fill-zinc-800" />
            <span>Home</span>
          </Link>

          <div className="flex gap-2">
            <Link
              href={"/cart"}
              className="relative flex aspect-square h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-white dark:bg-white dark:text-zinc-800"
            >
              {chartState.cart.length > 0 && (
                <div className="absolute -top-2.5 left-1/2 z-10 flex aspect-square h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-lime-500 text-xs text-white">
                  {chartState.cart.length}
                </div>
              )}
              <ShoppingCart className="h-4 w-4" />
            </Link>
            <Link
              href={"/dashboard"}
              className="flex aspect-square h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-white dark:bg-white dark:text-zinc-800"
            >
              <CircleUser className="h-4 w-4" />
            </Link>
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
