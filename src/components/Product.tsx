import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {setOffsetReducer} from "../redux/reducers/productOffset"
import { fetchPagination } from "../redux/reducers/productReducer";

import AppPagination from "./AppPagination";
import NavBar from "./NavBar";

const Product = () => {
  const products = useAppSelector((state) => state.productReducer);
  const [offset,setOffset] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPagination(offset));
  },[offset])
  return (
    <>
      {" "}
      <NavBar />
      <div className="container">
      <div className="product">
        {products.map((item) => (
          <div key={item.id} className="product-item">
            {" "}
            <div className="product__title">{item.title}</div>{" "}
            <div className="product__price">{item.price} </div>{" "}
            <div className="product__image">
              {<img src={item.category.image} alt="shoes" />}
            </div>
            <button className="product__button">Add to cart</button>
            <button className="product__button">Details</button>
          </div>
          
        ))}
      </div>
      </div>
      <AppPagination setPage={setOffset} page={offset}/>
    </>
  );
};

export default Product;
