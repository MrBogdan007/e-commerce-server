import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {}

const productOffset = createSlice({
   name: 'offset',
   initialState,
   reducers: {
      setOffsetReducer: (state,action) => {
         return action.payload.offset
      }
   }
})

const offSetReducer = productOffset.reducer

export const  {setOffsetReducer} = productOffset.actions

export default offSetReducer;