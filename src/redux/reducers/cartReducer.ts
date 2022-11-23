import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../types/cart";

const initialState: Cart[] = [];
// try count using use effect in one state through cart.map and set totPrice
const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const inTheCart = state.find((item) => {
        return item.id === action.payload.id;
      });
      if (inTheCart) {
        state.map((item) => {
          item.quantity = item.quantity + 1;
          return item;
        });
      } else {
        state.push(action.payload);
      }
    },
    removeCartItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      state.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });
    },
    decreaseQuantity: (state, action) => {
        state.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity = item.quantity - 1;
          }
        });
    },

  },
});
const cartReducer = cartSlicer.reducer;

export const {
  addCartItem,
  removeCartItem,
  increaseQuantity,
  decreaseQuantity,
  
} = cartSlicer.actions;

export default cartReducer;
