import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Category } from "../../types/category";

const initialState: Category[] = [];

export const fetchCategories = createAsyncThunk("category", async () => {
  const result = await axios.get(`https://api.escuelajs.co/api/v1/categories`);
  const data = result.data;

  return data;
});

const categorySlicer = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchCategories.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

const categoryReducer = categorySlicer.reducer;

export const {} = categorySlicer.actions;

export default categoryReducer;
