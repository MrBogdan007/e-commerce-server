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
    increaseQuantity: (state, action) => {
      
      state.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = item.quantity + 1
      
          return item
        } else {
          return item;
        }
      });
    },
    decreaseQuantity: (state, action) => {
      console.log(action.payload.id);
      
      state.map((item) => {
        if (item.id === action.payload.id) {
          if(item.quantity===0){
            item.quantity= 0
          }
          else {item.quantity = item.quantity - 1}
     
          
            return item
        } else {
          return item;
        }
      });
    },
  },
});
const cartReducer = cartSlicer.reducer;

export const { addCartItem, removeCartItem, increaseQuantity, decreaseQuantity } =
  cartSlicer.actions;

export default cartReducer;
