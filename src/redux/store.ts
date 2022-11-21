import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

const localCartReducer = JSON.parse(localStorage.getItem("cart") || "[]");

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    cartReducer: localCartReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cartReducer));
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
