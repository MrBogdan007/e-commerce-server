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
 

  return (
   <>
   
   <div  className= "navbar-other__main">
   <nav  >
   <Link style={{ color: theme.palette.mode === "light" ? "black "  : "black"}} to={'/'}>Home page</Link>
   <Link style={{ color: theme.palette.mode === "light" ? "black "  : "black"}} to={'../product'}>Product page</Link>
   <Link style={{ color: theme.palette.mode === "light" ? "black "  : "black"}} to={'../profile'}>Profile page</Link>
   <Link  style={{ color: theme.palette.mode === "light" ? "black "  : "black"}} to={'../cart'}><ShoppingCartIcon/></Link>
 
 
   </nav> 
 
  
   </div>

   </>
  )
  
}

export default NavBar