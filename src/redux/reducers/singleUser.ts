import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";

import { ModalInt } from "../../types/form";
import { ProductType } from "../../types/product";
import { User } from "../../types/users";
import { RootState } from "../store";

const initialState: User[]= []
 
export const singleUser = createAsyncThunk("singleProduct", async (id:number) => {
   const result = await axios.get(`https://api.escuelajs.co/api/v1/users/${id}`)
   const data = result.data
   return data
} )

const singleSlicer = createSlice({
   name: "singleUser",
   initialState,
   reducers: {
      //methods of reducers object
  
   },
   extraReducers : (build) => {
      build
      .addCase(singleUser.fulfilled, (state,action) =>{
         return [action.payload]
      })
   }
})
// Points to global state withous s at the end
const singleUserReducer = singleSlicer.reducer


export const { } = singleSlicer.actions

export default singleUserReducer