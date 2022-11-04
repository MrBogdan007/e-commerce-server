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
import { BrowserRouter, Route, Routes, Link, Form } from "react-router-dom";
import { Box, ThemeProvider } from "@mui/material";
import { userSchema } from "./schema/userForm";
import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import PalleteButton from "./components/PalleteButton";
import { fetchProducts, setForm } from "./redux/reducers/productReducer";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";

export const ThemeContext = createContext({ toggleMode: () => {} });
const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
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

  return (
    <ThemeContext.Provider value={manageTheme}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{ backgroundColor: "background.default", color: "text.primary" }}
          className="App"
        >
          <BrowserRouter>
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
