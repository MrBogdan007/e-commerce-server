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

import StarIcon from '@mui/icons-material/Star';
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

              <div className="header">
                <NavBar />
                <span className="header__signIn" onClick={registerSign}>
                  Sign In
                </span>
                <PalleteButton />
              </div>
        
            <div
              style={{ display: signIn ? "block" : "none" }}
              className="header__modal" 
            >
              <Modal signIn={signIn} />
            </div>
           

         
            <main className="main">

            
            </main>
            <div className="container">

            
            <section className="guarantee">
              <h2 className="section-header">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Cumque asperiores ab fuga animi.
              </h2>
              <div className="guarantee-block">
                <div className="guarantee-element">
                  <div className="guarantee-element__numbers">01</div>
                  <div className="guarantee-element__reassurance">24/7 Customer Care</div>
                  <span className="guarantee-element__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, dolorem.</span>
                </div>
                <div className="guarantee-element">
                  <div className="guarantee-element__numbers">02</div>
                  <div className="guarantee-element__reassurance">Safe payment</div>
                  <span className="guarantee-element__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, dolorem.</span>
                </div>
                <div className="guarantee-element">
                  <div className="guarantee-element__numbers">03</div>
                  <div className="guarantee-element__reassurance">Money Back guarantee</div>
                  <span className="guarantee-element__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, dolorem.</span>
                </div>
              </div>
            </section>
            </div>
           <section className="images"> 
              <div className="images-block">
                <img src={require('./img/img1.jpg')} alt="chair" /><img src={require('./img/img2.jpg')} alt="chair" /><img src={require('./img/img3.jpg')} alt="chair" />
              </div>
           </section>
           <div className="container">
            <section className="newProducts">
              <div className="section-header">
                Newest Products
              </div>
              <div className="newProducts-block">
                <div className="newProducts-element">
                  <div className="newProducts-element__img"><img src={require('./img/new/new1.jpg')}  alt="watch" /></div>
                  <div className="newProducts-element__description">Product title goes here</div>
                  <div className="newProducts-element__stars"><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>
                  <div className="newProducts-element__text"><span>$235.45</span><span ><s>$300</s> </span></div>
                </div>
                <div className="newProducts-element">
                  <div className="newProducts-element__img"><img src={require('./img/new/new2.jpg')} alt="watch" /></div>
                  <div className="newProducts-element__description">Product title goes here</div>
                  <div className="newProducts-element__stars"><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>
                  <div className="newProducts-element__text"><span>$420</span><span><s>$500</s></span></div>
                </div>
                <div className="newProducts-element">
                  <div className="newProducts-element__img"><img src={require('./img/new/new3.jpg')} alt="watch" /></div>
                  <div className="newProducts-element__description">Product title goes here</div>
                  <div className="newProducts-element__stars"><StarIcon/><StarIcon/><StarIcon/><StarIcon/><StarIcon/></div>
                  <div className="newProducts-element__text"><span>$300</span><span><s>$432</s></span></div>
                </div>
              </div>
              <div className="newProducts-button">
                <button>Explore more</button>
              </div>
            </section>
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
