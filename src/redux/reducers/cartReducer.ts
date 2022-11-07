import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../types/cart";
import { Product } from "../../types/product";

const initialState: Cart[] = []

const cartSlicer = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addCartItem:(state,action) => {
         state.push(action.payload)
      },
      removeCartItem: (state,action) => {
        return state.filter(item => item.id !== action.payload)
      }
   }
})
const cartReducer = cartSlicer.reducer

export const {addCartItem,removeCartItem } = cartSlicer.actions

export default cartReducer;