import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";





const store = configureStore({
   reducer: rootReducer,
})

store.subscribe(() => { // function works if it detects some changes in store
   //takes whole state and replaces items in localestorage
   
})



export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
