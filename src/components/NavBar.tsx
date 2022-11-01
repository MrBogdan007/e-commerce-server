import React from 'react'

import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import PalleteButton from './PalleteButton'
const NavBar = () => {
  return (
   <>
   <div className="header-nav">
   <nav >
    
   <Link to={''}>Home page</Link>
   <Link to={'product'}>Product page</Link>
   <Link to={'profile'}>Profile page</Link>
   <Link to={'cart'}>Cart page</Link>
   
   </nav>
   </div>
   </>
  )
  
}

export default NavBar