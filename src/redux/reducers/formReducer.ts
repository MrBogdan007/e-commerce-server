import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ModalInt } from "../../types/form";
import { RootState } from "../store";

// if name of the property and name of 
// the property the same its understand
let initialState  = null
const formSlicer = createSlice({
   name: "incomes",
   initialState,
   reducers: {
      //methods of reducers object
      setForm: (state,action: PayloadAction<boolean>) => {

      },

   }
})
// Points to global state withous s at the end
const formReducer = formSlicer.reducer


export const { setForm} = formSlicer.actions

export default formReducer