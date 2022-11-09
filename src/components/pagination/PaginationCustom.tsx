import { Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Product } from "../../types/product";


const pageSize = 12;
const PaginationCustom = ({setProducts}:{setProducts: (value: Product[]) => void}) => {
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize
  });
  const products = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch()
  
  const service = {
   
    getData: ({from,to}:{from:number, to: number}) => {
      const data = products.slice(from, to);
       return new Promise<{count: number, data: Product[]}>((resolve,reject) => {
         resolve({
             count: products.length,
             data: data
          })
       })
    }
  }
  useEffect(() => {
   service.getData({from: pagination.from, to: pagination.to}).then(response => {
    
      setPagination({...pagination, count: response.count})
      setProducts(response.data);
    
    })
  },[pagination.from, pagination.to,products]);

  const handlePageChange = (event:React.ChangeEvent<unknown>, page:number) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1 ) * pageSize + pageSize;

    setPagination({...pagination, from : from, to: to});
  }
   
  return (
    <Box
      justifyContent={"center"}
      alignItems="center"
      display={"flex"}
      sx={{ margin: "20px 0px" }}
    >
      <Pagination
      count={Math.ceil(pagination.count / pageSize)}
      onChange={handlePageChange}
      />

   

    </Box>
  );
};

export default PaginationCustom;
