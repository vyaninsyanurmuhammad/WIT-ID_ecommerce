"use client";

import NormalButton from "@/components/normal.button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { fetchPublicProducts } from "@/query/product.query";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import LandingSkeletonCard from "@/components/landing-skeleton.card";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ParallaxGsapLayout from "@/components/parallax.gsap.layout";
import dynamic from "next/dynamic";
import { fetchCategorys } from "@/query/category.query";
import { parseImages } from "@/lib/parse";
import { Category, Product } from "../(dashboard)/dashboard/components/columns";
import Navbar from "@/components/navbar";

const LandingCard = dynamic(() => import("@/components/landing.card"), {
  loading: () => <LandingSkeletonCard />,
});

const HomeContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const limit = 8;
  const offset = (page - 1) * limit;
  const titleFilter = searchParams.get("title") || "";
  const minPriceFilter = searchParams.get("minPrice") || "";
  const maxPriceFilter = searchParams.get("maxPrice") || "";
  const categoryFilter = searchParams.get("category") || "";

  const [filters, setFilters] = useState({
    title: titleFilter,
    minPrice: minPriceFilter,
    maxPrice: maxPriceFilter,
    category: categoryFilter,
  });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const debouncedUpdateFilters = useCallback(
    debounce((updatedFilters) => {
      setDebouncedFilters(updatedFilters);

      const { title, minPrice, maxPrice, category } = updatedFilters;
      router.push(
        `?page=1&title=${encodeURIComponent(title)}&minPrice=${encodeURIComponent(minPrice)}&maxPrice=${encodeURIComponent(maxPrice)}&category=${encodeURIComponent(category)}`,
      );
    }, 600),
    [router],
  );

  const { data, error, isLoading, isFetching } = useQuery<Product[]>({
    queryKey: ["publicProducts", page, debouncedFilters],
    queryFn: () => fetchPublicProducts({ offset, limit, ...debouncedFilters }),
  });

  const {
    data: dataCategory,
    error: errorCategory,
    isLoading: isLoadingCategory,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategorys,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      title: e.target.value,
    }));
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      minPrice: e.target.value,
    }));
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      maxPrice: e.target.value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      title: "",
      minPrice: "",
      maxPrice: "",
      category: "",
    });
  };

  useEffect(() => {
    debouncedUpdateFilters(filters);
  }, [filters]);

  return (
    <div className="h-auto min-h-svh bg-zinc-100 dark:bg-zinc-800">
      <Navbar />

      <div className="container mx-auto flex flex-col gap-20 px-5">
        <ParallaxGsapLayout>
          <div className="flex flex-col justify-between gap-10 pt-40 lg:flex-row lg:gap-40">
            <h1 className="w-full max-w-[860px] font-rubik text-5xl font-normal text-zinc-800 dark:text-white">
              Enter the digital bazaar, where every click leads to excitement
            </h1>
            <p className="w-full max-w-[430px] font-geist-sans text-base/5 text-zinc-800/70 dark:text-white/70">
              Celebrate convenience, embrace choice, and experience seamless
              shopping with us! discover a world where every click leads to
              excitement.
            </p>
          </div>
        </ParallaxGsapLayout>
        <main className="flex h-fit flex-col gap-6 pb-20">
          <div className="flex w-full justify-between gap-4">
            <Input
              placeholder="Cari Nama Produk..."
              value={filters.title}
              onChange={handleInputChange}
              className="max-w-sm rounded-full border-zinc-800 font-rubik dark:border-white/50"
            />
            <Sheet>
              <SheetTrigger asChild>
                <NormalButton>Filters</NormalButton>
              </SheetTrigger>
              <SheetContent className="flex flex-col gap-8 font-rubik dark:bg-zinc-900">
                <SheetHeader>
                  <SheetTitle>Edit Filters</SheetTitle>
                  <SheetDescription>
                    Adjust your filters here and apply them.
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-2">
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="grid gap-2 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="minPrice" className="text-right">
                          Min. Price
                        </Label>
                        <Input
                          id="minPrice"
                          value={filters.minPrice}
                          onChange={handleMinPriceChange}
                        />

                        <Label htmlFor="maxPrice" className="text-right">
                          Max. Price
                        </Label>
                        <Input
                          id="maxPrice"
                          value={filters.maxPrice}
                          onChange={handleMaxPriceChange}
                          type="number"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4 py-4">
                        <Label htmlFor="category" className="text-right">
                          Category
                        </Label>

                        <Select
                          onValueChange={handleCategoryChange}
                          defaultValue={categoryFilter}
                          disabled={isLoadingCategory}
                        >
                          <SelectTrigger className="col-span-3 w-full">
                            <SelectValue placeholder={"Select Category"} />
                          </SelectTrigger>
                          <SelectContent side="bottom">
                            {isLoadingCategory ? (
                              <span>Loading...</span>
                            ) : errorCategory ? (
                              <span>{errorCategory.message}</span>
                            ) : dataCategory ? (
                              dataCategory.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={`${category.id}`}
                                >
                                  {category.name}
                                </SelectItem>
                              ))
                            ) : (
                              <span>No Category</span>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <SheetClose asChild>
                        <Button onClick={handleResetFilters}>
                          Reset Filter
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="grid h-fit grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-2 xl:grid-cols-4">
            {isLoading || isFetching ? (
              Array.from({ length: 8 }).map((_, index) => (
                <LandingSkeletonCard key={index} />
              ))
            ) : data ? (
              data.map((product, index) => {
                const parsedImages = parseImages(product.images);

                return (
                  <Link key={index} href={`/${product.id}`}>
                    <LandingCard
                      image={parsedImages[0]}
                      title={product.title}
                      description={product.description}
                      category={product.category.name}
                      price={product.price}
                    />
                  </Link>
                );
              })
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
                  href={`?page=${Math.max(page - 1, 1)}&title=${encodeURIComponent(filters.title)}&minPrice=${encodeURIComponent(filters.minPrice)}&maxPrice=${encodeURIComponent(filters.maxPrice)}&category=${encodeURIComponent(filters.category)}`}
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
                    href={`?page=${page + 1}&title=${encodeURIComponent(filters.title)}&minPrice=${encodeURIComponent(filters.minPrice)}&maxPrice=${encodeURIComponent(filters.maxPrice)}&category=${encodeURIComponent(filters.category)}`}
                    shallow
                    className="px-4 py-2 text-lime-700 hover:text-lime-600"
                  >
                    Next
                  </Link>
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeContent;
