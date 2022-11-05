import React from "react";
import Pagination from "@mui/material/Pagination";
import { PaginationTypes } from "../types/pagination";
import { useAppSelector } from "../hooks/reduxHooks";

const style: any = {
  root: {
    bottom: 0,
    zIndex: 200,
    backgroundColor: "#f1f1f1",
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
};


const AppPagination = ({ setPage, page }:PaginationTypes) => {
  const productsAll = useAppSelector((state) => state.productAllReducer);
   const handleChange = (page:number) => {
    if(page === 1 ){
      setPage(0)
    }else{
      setPage(page*12)
    }
      
   }
  return (
    <div style={style.container} className="container">
      <div style={style.root} className="root">
        <Pagination
        onChange={(e:any) => handleChange(e.target.textContent)}
          style={{ display: "flex", justifyContent: "center" }}
          variant="outlined"
          count={Math.floor(productsAll.length / 12) }
        />
      </div>
    </div>
  );
};

export default AppPagination;
