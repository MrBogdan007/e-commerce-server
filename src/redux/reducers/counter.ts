import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useAppSelector } from "../../hooks/reduxHooks";

const initialState = 0

const couterSlice = createSlice({
   name: 'offset',
   initialState,
   reducers: {
      counterSet: (state,action) => {

         
      }
   }
})

const counterReducer = couterSlice.reducer

export const  {counterSet} = couterSlice.actions

export default counterReducer;