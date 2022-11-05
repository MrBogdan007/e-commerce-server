import React from "react";
import Pagination from "@mui/material/Pagination";
import { PaginationTypes } from "../types/pagination";

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
   const handleChange = (page:number) => {
      setPage(page)
      window.scroll(0,0)
   }
  return (
    <div style={style.container} className="container">
      <div style={style.root} className="root">
        <Pagination
        onChange={(e:any) => handleChange(e.target.textContent)}
          style={{ display: "flex", justifyContent: "center" }}
          variant="outlined"
          count={200}
        />
      </div>
    </div>
  );
};

export default AppPagination;
