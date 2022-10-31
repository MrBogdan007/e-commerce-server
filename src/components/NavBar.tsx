import React from 'react'

import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
const NavBar = () => {
  return (
   <>
   <nav>
   <Link to={''}>Home page</Link>
   <Link to={'about'}>About page</Link>
   <Link to={'contact'}>Contact page</Link>
   <Link to={'users'}>Users page</Link>
   
   </nav>
   </>
  )
  
}

export default NavBar