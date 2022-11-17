import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { stat } from "fs";
import { useState } from "react";

import { useAppSelector } from "../../hooks/reduxHooks";

import { ModalInt } from "../../types/form";
import { EditType, ProductReducer, ProductType } from "../../types/product";

import { RootState } from "../store";

const initialState: ProductReducer = {products: [], isLoading: false}
 
   


export const fetchCategory = createAsyncThunk("fetchCategory", async (id:number) => {
   
   const result = await axios.get(`https://api.escuelajs.co/api/v1/products`)
   const data = result.data

   return data.filter((item: { category: { id: number; }; }) =>  id === item.category.id );
    
} )

export const fetchProducts = createAsyncThunk("fetchAll", async () => {
   
   const result = await axios.get("https://api.escuelajs.co/api/v1/products")
   //"https://api.escuelajs.co/api/v1/products"
   const data = result.data
   return data
} )
export const editProduct = createAsyncThunk("edit", async ({id, data}: {id: number, data: ProductType}) => {
   
   const result = await axios.put(`https://api.escuelajs.co/api/v1/products/${id}`,data)
 
   const finalData = result.data
   return finalData
} )
export const deleteProducts = createAsyncThunk("delete", async (id:number) => {
   
   const result = await axios.delete(`https://api.escuelajs.co/api/v1/products/${id}`)
   //"https://api.escuelajs.co/api/v1/products"
   const data = result.data

   if(data.rta ){
   return id
}
else {
   throw Error('Cannot delete');
}

} )



const productSlicer = createSlice({
   name: "incomes",
   initialState,
   reducers: {
    
   },
   extraReducers : (build) => {
      build
      .addCase(fetchProducts.fulfilled, (state,action) =>{
         state.isLoading = false;
         state.products = action.payload.sort((a:ProductType,b:ProductType) => a.title > b.title ? 1 : -1)
         return state
      })
      .addCase(fetchCategory.fulfilled, (state,action) =>{
         state.products = action.payload.sort((a:ProductType,b:ProductType) => a.title > b.title ? 1 : -1)
         return state
      })

      .addCase(fetchProducts.pending, (state,action)=> {
       state.isLoading = true;
      })
      .addCase(deleteProducts.fulfilled, (state,action)=> {
       state.products = state.products.filter(item => item.id !== action.payload)
         return state
      })
      .addCase(editProduct.fulfilled,(state,action) => {
      state.products = state.products.map(item =>{
            if(item.id === action.payload.id){
               item = action.payload
            }
            return item
             
         })
         return state
      })
     
   }
})
// Points to global state withous s at the end
const productReducer = productSlicer.reducer


export const { } = productSlicer.actions

export default productReducer