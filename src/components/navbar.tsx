import React, { DetailedHTMLProps } from "react";
import { CircleUser, LayoutGrid, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import NormalButton from "./normal.button";
import Link from "next/link";

interface NavbarProps
  extends DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {}

const Navbar = ({ ...props }: NavbarProps) => {
  return (
    <nav className="fixed left-0 top-0 z-50 w-full" {...props}>
      <div className="container mx-auto flex w-full justify-between pt-8">
        <div className="relative h-8">
          <Image
            className="!relative object-contain brightness-0 dark:invert"
            src={"/assets/images/svg/logo.svg"}
            fill
            priority
            sizes="100%"
            alt="logo-brand"
          />
        </div>

        <div className="flex gap-5">
          <Link
            href={"/"}
            className="flex h-10 w-fit items-center gap-3 rounded-full bg-zinc-800 !px-4 font-rubik font-semibold text-white dark:bg-white dark:text-zinc-900"
          >
            <LayoutGrid className="h-4 w-4 fill-white dark:fill-zinc-800" />
            <span>Home</span>
          </Link>

          <div className="flex gap-2">
            <button className="flex aspect-square h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-white dark:bg-white dark:text-zinc-800">
              <ShoppingCart className="h-4 w-4" />
            </button>
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
