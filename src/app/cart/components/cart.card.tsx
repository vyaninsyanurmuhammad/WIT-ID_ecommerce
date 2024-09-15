import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash } from "lucide-react";
import LittleImage from "@/app/[id]/components/little-image";
import { useDispatch } from "react-redux";
import {
  removeProduct,
  setAmount,
} from "@/redux/features/dashboard/cart.slice";

type CartCardProps = {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  index: number;
  amount: number;
};

const CartCard = ({
  id,
  title,
  price,
  category,
  image,
  index,
  amount,
}: CartCardProps) => {
  const dispatch = useDispatch();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      dispatch(setAmount({ id, amount: value }));
    }
  };

  const handleIncrease = () => {
    dispatch(setAmount({ id, amount: amount + 1 }));
  };

  const handleDecrease = () => {
    if (amount > 1) {
      dispatch(setAmount({ id, amount: amount - 1 }));
    }
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="flex w-full gap-4">
      {/* <Skeleton className="h-20 w-20 shrink-0 rounded-lg" /> */}
      <LittleImage image={image} index={index} />
      <div className="flex w-full flex-col gap-1 font-rubik">
        <h3 className="line-clamp-1 w-full text-lg font-semibold text-zinc-700 dark:text-white">
          {title}
        </h3>
        <div className="flex w-full flex-row justify-between">
          <div className="flex w-full flex-col gap-0">
            <p>{category}</p>
            <p className="text-lg font-bold text-zinc-800 dark:text-white">
              ${price}
            </p>
          </div>
          <div className="flex w-fit flex-row items-end gap-2">
            <Button
              size={"icon"}
              className="hover:bg-destructive/90 hover:text-white"
              variant={"ghost"}
              onClick={handleRemoveProduct}
            >
              <Trash className="h-4 w-4" />
            </Button>
            <div className="flex w-fit shrink-0 flex-row rounded-lg dark:border dark:border-input dark:border-white">
              <Button size={"icon"} onClick={handleDecrease}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                className="w-10 text-center"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                min={1}
              />
              <Button size={"icon"} onClick={handleIncrease}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
