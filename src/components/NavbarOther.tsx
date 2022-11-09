import React, { useState } from 'react'

import {BrowserRouter, Route, Routes, Link, useLocation} from 'react-router-dom'
import PalleteButton from './PalleteButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { setModal } from '../redux/reducers/modalClose';
import Modal from './interface/Modal';
const NavBar = () => {

  
  const location = useLocation()
  const theme = useTheme()
  const modalState = useAppSelector((state) => state.modalReducer);
  const dispatch = useAppDispatch();
  console.log(modalState);
  

  const [signIn, setSignIn] = useState(false);
  const registerSign = () => {
    setSignIn((current) => !current);

    if (modalState === false) {
      dispatch(setModal({ modal: !modalState }));
      setSignIn((current) => !current);
    }
  };

  return (
   <>
   
   <div  className= "navbar-other__main">

   <nav    >
    
   <Link style={{ color: theme.palette.mode === "light" ? "black "  : "white"}} to={'/'}>Home page</Link>
   <Link style={{ color: theme.palette.mode === "light" ? "black "  : "white"}} to={'../category'}>Category page</Link>
   <Link style={{ color: theme.palette.mode === "light" ? "black "  : "white"}} to={'../product'}>Product page</Link>
   <Link style={{ color: theme.palette.mode === "light" ? "black "  : "white"}} to={'../Profile'}>Profile page</Link>
   <Link  style={{ color: theme.palette.mode === "light" ? "black "  : "white"}} to={'../Cart'}><ShoppingCartIcon/></Link>
 
 
   </nav> 
 
  
   </div>

   </>
  )
  
}

export default NavBar