import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";
import { stat } from "fs";
import { useState } from "react";

import { useAppSelector } from "../../hooks/reduxHooks";

import { ModalInt } from "../../types/form";
import { EditType, ProductType } from "../../types/product";

import { RootState } from "../store";

const initialState: ProductType[] = []
 
   

export const fetchPagination = createAsyncThunk("fetchPagination", async (offset:number) => {
   
   const result = await axios.get(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=12`)
   //"https://api.escuelajs.co/api/v1/products"
   //`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=10}`
   const data = result.data
   return data
} )
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
      //methods of reducers object
      setProduct: (state,action: PayloadAction<string>) => {
         if(action.payload === 'naming') {
            state.sort((a,b) => a.title > b.title ? 1 : -1)
         }
         if(action.payload === 'cheap') {
            state.sort((a,b) => a.price-b.price)
         }
         if(action.payload === 'expensive'){
            state.sort((a,b) => b.price - a.price)
         }
      },
      setSearchDispatch: (state,action) =>{
       return state.filter(item => item.title.includes(action.payload))
      }

   },
   extraReducers : (build) => {
      build
      .addCase(fetchPagination.fulfilled, (state,action) =>{
         return action.payload
      })
      .addCase(fetchCategory.fulfilled, (state,action) =>{
         return action.payload.sort((a:ProductType,b:ProductType) => a.title > b.title ? 1 : -1)
      })
      .addCase(fetchProducts.fulfilled, (state,action) =>{
         
         return action.payload.sort((a:ProductType,b:ProductType) => a.title > b.title ? 1 : -1)
      })
      .addCase(deleteProducts.fulfilled, (state,action)=> {
         return state.filter(item => item.id !== action.payload)
      })
      .addCase(editProduct.fulfilled,(state,action) => {
        return state.map(item =>{
            if(item.id === action.payload.id){
               item = action.payload
            }
            return item
             
         })
      })
   }
})
// Points to global state withous s at the end
const productReducer = productSlicer.reducer


export const { setProduct,setSearchDispatch} = productSlicer.actions

export default productReducer