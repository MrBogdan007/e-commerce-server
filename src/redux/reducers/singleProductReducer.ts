import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductType } from "../../types/product";

const initialState: ProductType = {
  id: 2,
  title: "some",
  price: 2,
  description: "lorem10",
  category: { id: 2, name: "others", image: "image" },
  images: "assd",
};

export const singleProduct = createAsyncThunk(
  "singleProduct",
  async (id: number) => {
    const result = await axios.get(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    const data = result.data;
    return data;
  }
);

const singleProductSlicer = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(singleProduct.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});
// Points to global state withous s at the end
const singleProductReducer = singleProductSlicer.reducer;

export default singleProductReducer;
