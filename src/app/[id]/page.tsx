"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchProductById } from "@/query/product.query";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Product } from "../(dashboard)/dashboard/components/columns";
import { parseImages } from "@/lib/parse";
import LittleImage from "./components/little-image";
import BigImage from "./components/big-image";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/features/dashboard/cart.slice";

const Detail = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState<Product | undefined | null>();
  const [focusImage, setFocusImage] = useState<number>(0);

  const id = Number(params.id);

  const { data, isFetching, isLoading, error } = useQuery({
    queryKey: ["publicProduct", id],
    queryFn: () => fetchProductById(id),
  });

  const handleAddCart = () => {
    if (productData) {
      dispatch(addProduct(productData));
    }
  };

  useEffect(() => {
    if (data) {
      const imagesParse = parseImages(data.images);

      setProductData({ images: imagesParse, ...data });
    }
  }, [data]);

  return (
    <div className="h-auto min-h-svh bg-zinc-100 dark:bg-zinc-800">
      <Navbar />

      <div className="container mx-auto flex flex-col gap-20 px-5 xl:px-0">
        <main className="flex h-fit flex-col gap-6">
          {isFetching || isLoading ? (
            <div className="mb-10 mt-40 flex flex-col gap-10 lg:flex-row lg:gap-20">
              <div className="flex flex-col gap-6 sm:w-fit">
                <Skeleton className="flex h-[384px] w-full max-w-sm rounded-xl lg:aspect-square" />
                <div className="flex w-full max-w-sm flex-row gap-5 overflow-x-auto">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-20 w-20 shrink-0 rounded-lg"
                    />
                  ))}
                </div>
              </div>
              <div className="flex h-auto w-full flex-col gap-10">
                <div className="flex h-full w-full flex-col justify-between gap-4">
                  <div className="flex flex-col gap-4">
                    <Skeleton className="flex h-8 w-full max-w-96 rounded-xl" />

                    <div className="flex flex-row gap-3">
                      <Skeleton className="flex h-8 w-full max-w-24 rounded-xl" />

                      <Skeleton className="flex h-8 w-full max-w-24 rounded-xl" />
                    </div>

                    <Skeleton className="flex h-8 w-full max-w-16 rounded-xl" />

                    <Separator
                      orientation="horizontal"
                      className="dark:bg-white"
                    />
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
          ) : productData ? (
            <div className="mb-10 mt-40 flex flex-col gap-10 lg:flex-row lg:gap-20">
              <div className="flex flex-col gap-6 sm:w-fit">
                <BigImage image={productData.images[focusImage]} />
                <div className="flex w-full max-w-sm flex-row gap-5 overflow-x-auto">
                  {productData.images.map((image, index) => (
                    <button key={index} onClick={() => setFocusImage(index)}>
                      <LittleImage image={image} index={index} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex h-auto flex-col gap-10">
                <div className="flex h-full flex-col justify-between gap-4">
                  <div className="flex flex-col gap-4">
                    <h1 className="w-full font-geist-sans text-3xl font-bold text-zinc-800 dark:text-white">
                      {productData.title}
                    </h1>
                    <div className="flex flex-row gap-3">
                      <span className="w-fit rounded-full bg-zinc-800 px-4 py-2 font-rubik font-semibold text-white dark:bg-white dark:text-zinc-800">
                        {productData.category.name}
                      </span>
                      <span className="w-fit rounded-full bg-zinc-800 px-4 py-2 font-rubik font-semibold text-white dark:bg-white dark:text-zinc-800">
                        Stcok 50
                      </span>
                    </div>

                    <h2 className="w-full font-geist-sans text-4xl font-bold text-zinc-800 dark:text-white">
                      ${productData.price}
                    </h2>
                    <Separator
                      orientation="horizontal"
                      className="dark:bg-white"
                    />
                    <p className="w-full font-rubik text-base/5 text-zinc-800/70 dark:text-white/70">
                      {productData.description}
                    </p>
                  </div>

                  <Button
                    className="flex h-fit w-full max-w-lg items-center gap-2 py-2 font-rubik text-lg font-medium"
                    onClick={handleAddCart}
                  >
                    <ShoppingCart className="h-5 w-5" /> Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-svh w-full items-center justify-center">
              <span className="font-rubik font-semibold">Not Found</span>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Detail;
