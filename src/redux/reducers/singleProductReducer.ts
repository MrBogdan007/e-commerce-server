import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";

import { ModalInt } from "../../types/form";
import { ProductType } from "../../types/product";
import { RootState } from "../store";

const initialState: ProductType[] = []
 
export const singleProduct = createAsyncThunk("singleProduct", async (id:number) => {
   const result = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
   const data = result.data
   return data
} )

const singleProductSlicer = createSlice({
   name: "singleProduct",
   initialState,
   reducers: {
      //methods of reducers object
      sortFetch: (state,action) => {
         state.sort((a,b) => a.price - b.price )
      },

   },
   extraReducers : (build) => {
      build
      .addCase(singleProduct.fulfilled, (state,action) =>{
         return [action.payload]
      })
   }
})
// Points to global state withous s at the end
const singleProductReducer = singleProductSlicer.reducer


export const { sortFetch} = singleProductSlicer.actions

export default singleProductReducer