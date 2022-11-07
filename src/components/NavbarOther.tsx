import React from 'react'

import {BrowserRouter, Route, Routes, Link, useLocation} from 'react-router-dom'
import PalleteButton from './PalleteButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, useTheme } from "@mui/material";
const NavBar = () => {
  const location = useLocation()
  const theme = useTheme()

  return (
   <>
   
   <div  className= "header-nav">
 
   <nav  className='navbar-other'  >
    
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