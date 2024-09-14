import { Product } from "@/app/(dashboard)/dashboard/components/columns";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartInitialState } from "./cart.state";

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.cart.find(
        (data) => data.product.id === action.payload.id,
      );

      if (existingProduct) {
        existingProduct.amount += 1;
      } else {
        state.cart = [
          {
            product: action.payload,
            amount: 1,
          },
          ...state.cart,
        ];
      }
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter(
        (data) => data.product.id !== action.payload,
      );
    },    setAmount: (
      state,
      action: PayloadAction<{ id: number; amount: number }>,
    ) => {
      const existingProduct = state.cart.find(
        (data) => data.product.id === action.payload.id,
      );

      if (existingProduct) {
        existingProduct.amount = action.payload.amount;
      }
    },
  },
});

export const { addProduct, removeProduct, setAmount } = cartSlice.actions;
export default cartSlice.reducer;
