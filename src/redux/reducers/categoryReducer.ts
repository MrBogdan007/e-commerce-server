import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { Category } from "../../types/category";

import { ModalInt } from "../../types/form";
import { ProductType } from "../../types/product";
import { RootState } from "../store";

const initialState: Category[] = []
 
export const fetchCategories = createAsyncThunk("singleProduct", async () => {
   const result = await axios.get(`https://api.escuelajs.co/api/v1/categories`)
   const data = result.data
   
   return data
} )

const categorySlicer = createSlice({
   name: "category",
   initialState,
   reducers: {

   },
   extraReducers : (build) => {
      build
      .addCase(fetchCategories.fulfilled, (state,action) =>{
         return action.payload
      })
   }
})
// Points to global state withous s at the end
const categoryReducer = categorySlicer.reducer


export const { } = categorySlicer.actions

export default categoryReducer