import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../types/cart";
import { ProductType } from "../../types/product";

const initialState: Cart[] = [];

const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.push(action.payload);
    },
    removeCartItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    priceUpdate: (state, action) => {
      state.map((item) => {
        if (item.id === action.payload.id) {
          return (item.price = action.payload.price + action.payload.price);
        } else {
          return item.price;
        }
      });
    },
    priceRemove: (state, action) => {
      state.map((item) =>
        item.id === action.payload.id
          ? (item.price = action.payload.price - item.price)
          : item.price
      );
    },
  },
});
const cartReducer = cartSlicer.reducer;

export const { addCartItem, removeCartItem, priceUpdate, priceRemove } =
  cartSlicer.actions;

export default cartReducer;
