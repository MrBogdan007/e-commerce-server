import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User, UserEncript, UserReducer } from "../../types/users";
const initialState : UserReducer = {
   users: [],
   currentUser: undefined
}

export const fetchAllUsers = createAsyncThunk(
   "fetchAllUsers",
   async () => {
      const response = await axios.get("https://api.escuelajs.co/api/v1/users")
      return response.data
   }
)
// export const login = createAsyncThunk(
//    "login",
//    async(data:UserEncript) => {
//       try{
//          const responce = await axios.post("https://api.escuelajs.co/api/v1/auth/login",data)
//          const token = responce.data
//          localStorage.setItem("token", token.access_token)
//       }
//      catch (e) {
//       console.log(e);
      
//      }

//    }
// )

export const authenticate = createAsyncThunk(
   "authenticate",
   async (token: string) => {
      try {
         const response = await axios.get("https://api.escuelajs.co/api/v1/auth/profile", {
            headers: {
               "Authorization" : `Bearer ${token}`
            }
         })
         return response.data
      }
      catch (e){
         console.log(e);
         
      }
   }
)
// export const checkEmail = createAsyncThunk(
//    "checkEmail",
//    async 
// )

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      logOut: (state) => {
         state.currentUser = undefined
         localStorage.clear()
      }
   },
   extraReducers: (build) => {
      build.addCase(fetchAllUsers.fulfilled,(state,action:PayloadAction<User[]>)=>{
         state.users = action.payload
      })
      .addCase(authenticate.fulfilled, (state,action:PayloadAction<User>) => {
         state.currentUser = action.payload
      })
   }
})
const userReducer = userSlice.reducer

export const {logOut} = userSlice.actions
export default userReducer
