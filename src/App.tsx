import Home from "./components/Home";
import About from "./components/Product";
import Contact from "./components/Profile";
import NavBar from "./components/NavBar";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import "./style/App.css";
import Product from "./components/Product";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import Modal from "./components/interface/Modal";

import StarIcon from "@mui/icons-material/Star";
import { red } from "@mui/material/colors";
import React, { useState, useEffect, createContext } from "react";
import logo from "./logo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { BrowserRouter, Route, Routes, Link, Form, Navigate } from "react-router-dom";
import { Box, ThemeProvider } from "@mui/material";
import { userSchema } from "./schema/userForm";
import { createTheme, useTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import PalleteButton from "./components/PalleteButton";

import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import SingleProduct from "./components/SingleProduct";


import { fetchProducts } from "./redux/reducers/productReducer";
import { authenticate, fetchAllUsers } from "./redux/reducers/users";
import Login from "./components/Login";
import { fetchCategories } from "./redux/reducers/categoryReducer";
import axios from "axios";

export const ThemeContext = createContext({ toggleMode: () => {} });
const App = () => {

  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token")
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  },[])
  useEffect(() => {
    dispatch(fetchAllUsers())
    
    if(token) { dispatch(authenticate(token))}
  }, []);
  const [mode, setMode] = useState<"dark" | "light">("light");
 
  
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#F0F0F1",
            },
            secondary: {
              main: "#1976D2",
            },
            text: {
              primary: "black",
              secondary: "#1976D2",
            },
            background: {
              default: "#F0F0F1",
            },
          }
        : {
            primary: { main: "#003B8E" },
            secondary: { main: "#1976D2" },
            text: {
              primary: "white",
              secondary: "#1976D2",
            },
            background: {
              default: "#000000",
            },
          }),
    },
  });
  const manageTheme = {
    toggleMode: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    },
  };
  return (
    
    <ThemeContext.Provider value={manageTheme}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{ backgroundColor: "background.default",  height:"100vh",  color: 'text.primary' }}
          className="App"
        >
         
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>}></Route>

              <Route path="/product" element={<Product/>}/> 
              <Route path="/product/:id" element={<SingleProduct />}></Route>
              <Route path="/profile" element={<Profile/>}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/users">
                <Route path="" element={<Users />}>
                  {" "}
                </Route>
                <Route path=":id" element={ <SingleUser />}></Route>
              </Route>
              <Route path='/redirect' element={<Navigate to="/cart" />}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
