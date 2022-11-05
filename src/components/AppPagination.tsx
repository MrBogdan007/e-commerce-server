import React from 'react'
import Pagination from '@mui/material/Pagination';

const style:any = {
   root: {
     bottom: 0,
     zIndex: 200,
     backgroundColor: "yellow",
     padding: "10px 80px",
     color: "white",
     width: "100%",
     position: "fixed",
   },
   container: {
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
     color: "white",
   },
 }
 
const AppPagination = () => {
  
  return (
    <div style={style.container} className='container'>
      <div style={style.root} className='root'>
         <Pagination/>
      </div>
    </div>
  )
}

export default AppPagination