import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/product";

const initialState:Product[] = []

const cartSlicer = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addCartItem:(state,action) => {
         state.push(action.payload)
      }
   }
})
const cartReducer = cartSlicer.reducer

export const {addCartItem } = cartSlicer.actions

export default cartReducer;