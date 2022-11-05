import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";

import { ModalInt } from "../../types/form";
import { Product } from "../../types/product";
import { RootState } from "../store";

const initialState: Product[] = []
 
   
export const fetchProducts = createAsyncThunk("fetchAll", async () => {
   
   const result = await axios.get("https://api.escuelajs.co/api/v1/products")
   //"https://api.escuelajs.co/api/v1/products"
   const data = result.data
   return data
} )



const productAllSlicer = createSlice({
   name: "incomes",
   initialState,
   reducers: {
      //methods of reducers object
      setForm: (state,action: PayloadAction<boolean>) => {

      },

   },
   extraReducers : (build) => {
      build
      .addCase(fetchProducts.fulfilled, (state,action) =>{
         return action.payload
      })


   }
})
// Points to global state withous s at the end
const productAllReducer = productAllSlicer.reducer


export const { setForm} = productAllSlicer.actions

export default productAllReducer