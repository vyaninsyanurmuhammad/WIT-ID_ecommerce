import { Product } from "@/app/(dashboard)/dashboard/components/columns";

export type CartInitialStateType = {
  cart: Chart[];
};

export type Chart = {
  product: Product;
  amount: number;
};
