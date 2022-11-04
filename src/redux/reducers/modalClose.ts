import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Modal } from "../../types/modal"

const initialState = {}

const modalCloseSlicer = createSlice({
   name: 'modal',
   initialState,
   reducers: {
      setModal: (state,action: PayloadAction<Modal>) => {
         return action.payload.modal
      }
   }
})

const modalReducer = modalCloseSlicer.reducer

export const  {setModal} = modalCloseSlicer.actions

export default modalReducer;