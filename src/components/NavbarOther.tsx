import React from 'react'

import {BrowserRouter, Route, Routes, Link, useLocation} from 'react-router-dom'
import PalleteButton from './PalleteButton'


const NavBar = () => {
  const location = useLocation()


  return (
   <>
   
   <div className= {location.pathname === '/'? "header-nav": "header-dif" } >
 
   <nav  >
    
   <Link to={'/'}>Home page</Link>
   <Link to={'../category'}>Category page</Link>
   <Link to={'../product'}>Product page</Link>
   <Link to={'../Profile'}>Profile page</Link>
   <Link to={'../Cart'}>Cart page</Link>
   
 
   </nav>
  
   </div>

   </>
  )
  
}

export default NavBar