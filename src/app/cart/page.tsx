"use client";

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hook";
import React from "react";
import CartCard from "./components/cart.card";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { toast } = useToast();

  const chartState = useAppSelector((state) => state.cartReducer);

  const totalPrice = chartState.cart.reduce((acc, data) => {
    return acc + data.product.price * data.amount;
  }, 0);

  const onBeliHandle = () => {
    toast({
      variant: "default",
      title: "Products Bought successfully!",
      description: `Total: $${totalPrice}`,
    });
  };

  return (
    <div className="h-auto min-h-svh bg-zinc-100 dark:bg-zinc-800">
      <Navbar />

      <div className="container mx-auto flex flex-col gap-20 px-5 pb-20">
        <div className="mt-40 flex flex-col gap-20 lg:grid lg:grid-cols-3">
          <div className="col-span-2 flex w-full flex-col gap-6">
            {chartState.cart.map((data, index) => (
              <CartCard
                key={index}
                id={data.product.id}
                title={data.product.title}
                category={data.product.category.name}
                price={data.product.price}
                image={data.product.images[0]}
                index={index}
                amount={data.amount}
              />
            ))}
          </div>
          <div className="flex w-full flex-col gap-4 font-rubik">
            <h3 className="text-lg font-semibold">Ringkasan belanja</h3>
            {totalPrice > 0 && (
              <div className="flex justify-between gap-4">
                <p>Total</p>
                <p>${totalPrice}</p>
              </div>
            )}

            <Button onClick={onBeliHandle}>Beli Sekarang</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
