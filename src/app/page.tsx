"use client";

import LandingCard from "@/components/landing.card";
import Navbar from "@/components/navbar";
import NormalButton from "@/components/normal.button";
import { Input } from "@/components/ui/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPublicProducts } from "@/query/product.query";
import { Product } from "./(dashboard)/dashboard/components/columns";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import LandingSkeletonCard from "@/components/landing-skeleton.card";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const page = Number(searchParams.get("page")) || 1;
  const limit = 8;
  const offset = (page - 1) * limit;
  const titleFilter = searchParams.get("title") || "";
  const priceModeFilter = searchParams.get("mode");

  const [filterTitle, setFilterTitle] = useState(titleFilter);
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 1000]);
  const [singlePrice, setSinglePrice] = useState<number | undefined>(0);
  const [minPrice, setMinPrice] = useState(priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);

  const [isPriceMode, setIsPriceMode] = useState<boolean>(false);

  const { data, error, isLoading, isFetching } = useQuery<Product[]>({
    queryKey: ["publicProducts", page, titleFilter],
    queryFn: () => fetchPublicProducts({ offset, limit, filterTitle }),
  });

  const debouncedSetFilterTitle = useCallback(
    debounce((value) => {
      router.push(`?page=1&title=${encodeURIComponent(value)}`);
    }, 600),
    [router],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterTitle(e.target.value);
  };

  const handleSliderChange = (values: number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
    setPriceRange([values[0], values[1]]);
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMinPrice(value);
    setPriceRange([value, maxPrice]);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
    setPriceRange([minPrice, value]);
  };

  const handleSinglePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSinglePrice(value === "" ? undefined : Number(value));
  };

  const handlePriceModeChange = (e: boolean) => {
    setIsPriceMode(e);
  };

  useEffect(() => {
    if (filterTitle !== titleFilter) {
      debouncedSetFilterTitle(filterTitle);
    }
  }, [filterTitle, debouncedSetFilterTitle]);

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
              placeholder="Cari Nama Produk..."
              value={filterTitle}
              onChange={handleInputChange}
              className="max-w-sm rounded-full border-zinc-800 font-rubik dark:border-white/50"
            />
            <Sheet>
              <SheetTrigger asChild>
                <NormalButton>Filters</NormalButton>
              </SheetTrigger>
              <SheetContent className="flex flex-col gap-8 font-rubik">
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor="priceMode">
                      Harga Filter Mode: {isPriceMode ? "Range" : "Single"}
                    </Label>
                    <Switch
                      id="priceMode"
                      checked={isPriceMode}
                      onCheckedChange={handlePriceModeChange}
                    />
                  </div>
                  {isPriceMode ? (
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <Label>Price Range</Label>
                        <Slider
                          className="w-full"
                          defaultValue={priceRange}
                          min={1}
                          max={1000}
                          step={1}
                          onValueChange={handleSliderChange}
                        />
                      </div>

                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="minPrice" className="text-right">
                            Min. Price
                          </Label>
                          <Input
                            id="minPrice"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            type="number"
                          />

                          <Label htmlFor="maxPrice" className="text-right">
                            Max. Price
                          </Label>
                          <Input
                            id="maxPrice"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            type="number"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="price" className="text-left">
                          Price
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          className="w-full"
                          value={singlePrice !== undefined ? singlePrice : ""}
                          onChange={handleSinglePriceChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Filter</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          <div className="grid h-fit grid-cols-4 grid-rows-2 gap-x-4 gap-y-8">
            {isLoading || isFetching ? (
              Array.from({ length: 8 }).map((_, index) => (
                <LandingSkeletonCard key={index} />
              ))
            ) : data ? (
              data.map((product, index) => (
                <Link key={index} href={`/${product.id}`}>
                  <LandingCard
                    image={product.images[0]}
                    title={product.title}
                    description={product.description}
                    category={product.category.name}
                    price={product.price}
                  />
                </Link>
              ))
            ) : error ? (
              <span>{error.message}</span>
            ) : (
              <span>No Result</span>
            )}
          </div>
          <div className="flex w-full justify-center font-rubik">
            <div>
              {page === 1 ? (
                <span className="pointer-events-none px-4 py-2 text-gray-400/80">
                  Previous
                </span>
              ) : (
                <Link
                  href={`?page=${Math.max(page - 1, 1)}&title=${encodeURIComponent(titleFilter)}`}
                  shallow
                  className="px-4 py-2 text-lime-700 hover:text-lime-600"
                >
                  Previous
                </Link>
              )}
            </div>
            <div>
              {data &&
                (data.length < limit ? (
                  <span className="pointer-events-none px-4 py-2 text-gray-400/80">
                    Next
                  </span>
                ) : (
                  <Link
                    href={`?page=${page + 1}&title=${encodeURIComponent(titleFilter)}`}
                    shallow
                    className="px-4 py-2 text-lime-700 hover:text-lime-600"
                  >
                    Next
                  </Link>
                ))}
            </div>
          </div>
        </main>
        <div>footer</div>
      </div>
    </div>
  );
}
