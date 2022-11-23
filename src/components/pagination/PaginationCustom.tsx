import { Box, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useAppSelector } from "../../hooks/reduxHooks";

const pageSize = 12;
const PaginationCustom = ({ tempList, setProductsList }: any) => {
  const products = useAppSelector((state) => state.productReducer.products);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  useEffect(() => {
    const from = pagination.from;
    const to = pagination.to;

    const data = tempList.slice(from, to);
    const response = {
      count: tempList.length,
      data: data,
    };
    setPagination({ ...pagination, count: response.count });
    setProductsList(response.data);
  }, [pagination.from, pagination.to, tempList.length, products]);

  const [page, setPage] = useState(1);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  return (
    <div className="container">
      <Box
        justifyContent={"center"}
        alignItems="center"
        display={"flex"}
        sx={{color:"FFFFFF" ,padding: "11px" }}
      >
        <Pagination
          count={Math.ceil(pagination.count / pageSize)}
          onChange={handlePageChange}
          color="secondary"
          page={page}
        />
      </Box>
    </div>
  );
};

export default PaginationCustom;
