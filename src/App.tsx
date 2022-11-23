import {MemoizedHome} from "./components/Home";
import "./style/App.css";
import  { MemoizedProduct } from "./components/Product";
import Profile from "./components/Profile";
import {MemoizedCart} from "./components/Cart";

import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Box, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useAppDispatch } from "./hooks/reduxHooks";
import SingleProduct from "./components/SingleProduct";
import { authenticate, fetchAllUsers } from "./redux/reducers/users";
import Login from "./components/Login";
import { fetchCategories } from "./redux/reducers/categoryReducer";

export const ThemeContext = createContext({ toggleMode: () => {} });
const App = () => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  useEffect(() => {
    dispatch(fetchAllUsers());
    if (token) {
      dispatch(authenticate(token));
    }
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
          sx={{
            backgroundColor: "background.default",
            height: "100vh",
            color: "text.primary",
          }}
          className="App"
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MemoizedHome />}></Route>
              <Route path="/product" element={<MemoizedProduct />} />
              <Route path="/product/:id" element={<SingleProduct />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/cart" element={<MemoizedCart />}></Route>
              <Route path="/redirect" element={<Navigate to="/cart" />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
