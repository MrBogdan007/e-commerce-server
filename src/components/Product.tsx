import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addCartItem } from "../redux/reducers/cartReducer";
import { fetchProducts } from "../redux/reducers/productAll";
import {setOffsetReducer} from "../redux/reducers/productOffset"
import { fetchCategory, fetchPagination,  } from "../redux/reducers/productReducer";
import {  singleProduct } from "../redux/reducers/singleProductReducer";

import AppPagination from "./AppPagination";
import Modal from "./interface/Modal";
import NavBar from "./NavBar";
import NavbarOther from "./NavbarOther";
import SingleProduct from "./SingleProduct";

const Product = () => {
  const products = useAppSelector((state) => state.productAllReducer);
  const dispatch = useAppDispatch();
const categoryAll = () => {
  dispatch(fetchProducts());
}
const addToCart = (title:string,price:number,image:string) => {
  dispatch(addCartItem({title:title,price:price,image:image}))
}
  return (
    <>

      <NavbarOther/>
      <div className="container">
      <div className="product product-fetch">
        {products.map((item) => (
          <div key={item.id} className="product-item">
            {" "}
            <div className="product__title">{item.title}</div>{" "}
            <div className="product__price">{`${item.price}$`} </div>{" "}
            <div className="product__image">
              {<img src={item.images[0]} alt="shoes" />}
            </div>
            <button className="product__button" onClick={() => addToCart(item.title,item.price,item.images[0])}>Add to cart</button>
            
          </div>
          
        ))}
      </div>
      </div>

    </>
  );
};

export default Product;
