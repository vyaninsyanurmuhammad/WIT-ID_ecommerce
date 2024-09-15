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
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/features/dashboard/cart.slice";
import DetailLoading from "./components/detail.loading";
import { useRouter } from "next/navigation";

const Detail = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();
  const router = useRouter();

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

      router.push("/cart");
    }
  };

  useEffect(() => {
    if (data) {
      const imagesParse = parseImages(data.images);

      setProductData({ ...data, images: imagesParse });
    }
  }, [data]);

  return (
    <div className="h-auto min-h-svh bg-zinc-100 dark:bg-zinc-800">
      <Navbar />

      <div className="container mx-auto flex flex-col gap-20 px-5 pb-20 xl:px-0">
        <main className="flex h-fit flex-col gap-6">
          {isFetching || isLoading ? (
            <DetailLoading />
          ) : error ? (
            <p>Something Wrong</p>
          ) : productData ? (
            <div className="mb-10 mt-40 flex flex-col gap-10 lg:flex-row lg:gap-20">
              <div className="flex w-full flex-col gap-6 lg:w-fit">
                <BigImage image={productData.images[focusImage]} />
                <div className="flex w-full max-w-sm flex-row gap-5 overflow-x-auto">
                  {productData.images.map((image, index) => (
                    <button key={index} onClick={() => setFocusImage(index)}>
                      <LittleImage image={image} index={index} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex h-auto w-full flex-col gap-10">
                <div className="flex h-full flex-col justify-between gap-4">
                  <div className="flex w-full flex-col gap-4">
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
                      className="w-full dark:bg-white"
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
