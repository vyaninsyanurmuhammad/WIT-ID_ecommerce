import LandingCard from "@/components/landing.card";
import Navbar from "@/components/navbar";
import NormalButton from "@/components/normal.button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
  return (
    <div className="h-auto min-h-svh bg-zinc-100 dark:bg-zinc-800">
      <Navbar />
      <div className="container mx-auto flex flex-col gap-20">
        <div className="flex justify-between gap-40 pt-40">
          <h1 className="w-full max-w-[860px] font-rubik text-5xl font-normal text-zinc-800 dark:text-white">
            Enter the digital bazaar, where every click leads to excitement
          </h1>
          <p className="w-full max-w-[430px] font-geist-sans text-base/5 text-zinc-800/70 dark:text-white/70">
            Celebrate convenience, embrace choice, and experience seamless
            shopping with us! discover a world where every click leads to
            excitement.
          </p>
        </div>
        <main className="flex h-fit flex-col gap-6">
          <div className="flex w-full justify-between">
            <Input
              placeholder="Filter Title..."
              className="max-w-sm dark:border-white/50 font-rubik rounded-full border-zinc-800"
            />
            <NormalButton>Filters</NormalButton>
          </div>
          <div className="grid h-fit grid-cols-4 grid-rows-2 gap-x-4 gap-y-8">
            <LandingCard />
            <LandingCard />
            <LandingCard />
            <LandingCard />
            <LandingCard />
            <LandingCard />
            <LandingCard />
            <LandingCard />
          </div>
          <Pagination className="font-rubik">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
        <div>footer</div>
      </div>
    </div>
  );
}
