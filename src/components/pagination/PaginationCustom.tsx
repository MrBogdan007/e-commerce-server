import { Box, Pagination } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {  ProductType } from "../../types/product";


const pageSize = 12;
const PaginationCustom = ({setProducts}:{setProducts: (value: ProductType[]) => void}) => {
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize
  });
  const products = useAppSelector((state) => state.productReducer.products);
  console.log(products);
  

  
  
  //Example for custom db or personal server data
  // const service = {
  //   getData: ({from,to}:{from:number, to: number}) => {
  //     const data = products.slice(from, to);
  //      return new Promise<{count: number, data: ProductType[]}>((resolve,reject) => {
  //        resolve({
  //            count: products.length,
  //            data: data
  //         })
  //      })
  //   }
  // }
  // useEffect(() => {
  //  service.getData({from: pagination.from, to: pagination.to}).then(response => {
    
  //     setPagination({...pagination, count: response.count})
  //     setProducts(response.data);
    
  //   })
  // },[pagination.from, pagination.to,products]);


    useEffect(() => {
   const from = pagination.from;
   const to = pagination.to

   const data = products.slice(from, to);
   const response = {
        count: products.length,
        data: data
      }
      setPagination({...pagination, count: response.count})
      setProducts(response.data);
    
    
  },[pagination.from, pagination.to,products]);

  const [page, setPage] = useState(1);
  const handlePageChange =(event:React.ChangeEvent<unknown>, page:number ) => {
   
    setPage(page)
    const from = (page - 1) * pageSize;
    const to = (page - 1 ) * pageSize + pageSize;
    setPagination({...pagination, from : from, to: to});
    
  }
   
  console.log(Math.ceil(pagination.count / pageSize));
   
  return (
    <div className="container">
    <Box
      justifyContent={"center"}
      alignItems="center"
      display={"flex"}
      sx={{ padding: "11px"}}
    > 
  <Pagination
      count={Math.ceil(pagination.count / pageSize)}
      onChange={handlePageChange} color="secondary"
      page={page}
      /> 
  
    </Box>
    </div>
  );
};

export default PaginationCustom;
