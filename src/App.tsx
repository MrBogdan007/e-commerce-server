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

import { red } from "@mui/material/colors";
import React, { useState, useEffect, createContext } from "react";
import logo from "./logo.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { BrowserRouter, Route, Routes, Link, Form } from "react-router-dom";


import { Box, ThemeProvider } from "@mui/material";
import { userSchema } from "./schema/userForm";
import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import PalleteButton from "./components/PalleteButton";
import { setForm } from "./redux/reducers/formReducer";
import { useAppSelector } from "./hooks/reduxHooks";

export const ThemeContext = createContext({ toggleMode: () => {} });
const App = () => {
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
              main: "#BCCEF8",
            },
            text: {
              primary: "black",
              secondary: "blue",
            },
            background: {
              default: "#F0F0F1",
            },
          }
        : {
            primary: { main: "#003B8E" },
            secondary: { main: "#1564BF" },
            text: {
              primary: "white",
              secondary: "blue",
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

  
  //modal
  const [signIn, setSignIn] = useState(false);
  const registerSign = () => {
    setSignIn((current) => !current);

  };


  return (
    <ThemeContext.Provider value={manageTheme}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{ backgroundColor: "background.default", color: "text.primary" }}
          className="App"
        >
         
          <BrowserRouter>
            <div className="container">
              <div className="header">
                <NavBar />
                <span className="header__signIn" onClick={registerSign}>
                  Sign In
                </span>
                <PalleteButton />
              </div>
            </div>
            <div
              style={{ display: signIn ? "block" : "none" }}
              className="header__modal" 
            >
              <Modal signIn={signIn} />
            </div>
           <div className="container">

         
            <main className="main">
    
            </main>
            </div>
            
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/product" element={<Product />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/users">
                <Route path="" element={<Users />}>
                  {" "}
                </Route>
                <Route path=":id" element={<SingleUser />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
