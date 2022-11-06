import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {setOffsetReducer} from "../redux/reducers/productOffset"
import { fetchCategory, fetchPagination,  } from "../redux/reducers/productReducer";
import {  singleProduct } from "../redux/reducers/singleProductReducer";

import AppPagination from "./AppPagination";
import Modal from "./interface/Modal";
import NavBar from "./NavBar";
import SingleProduct from "./SingleProduct";

const Product = () => {
  const products = useAppSelector((state) => state.productReducer);
  
  const singleProductValue = useAppSelector((state) => state.singleProductReducer);
  const [offset,setOffset] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPagination(offset));
  },[offset])


  const navigate = useNavigate()
  const detailsShow = (id:number) => {
    console.log('clicked');
    navigate(`/product/${id}`)
    dispatch(singleProduct(id))
  }

const categoryAll = () => {
  dispatch(fetchPagination(offset));
  navigate(`/product`)
}
const categoryCloth = () => {
  dispatch(fetchCategory(1));
}
const categoryElectronics = () => {
  dispatch(fetchCategory(2));
}
const categoryFurniture = () => {
  dispatch(fetchCategory(3));
}
const categoryShoes = () => {
  dispatch(fetchCategory(4));
}
const categoryOthers = () => {
  dispatch(fetchCategory(5));
}
  return (
    <>
      {" "}
      <NavBar />
      <div className="container">
      <div className="product product-fetch">
        {products.map((item) => (
          <div key={item.id} className="product-item">
            {" "}
            <div className="product__title">{item.title}</div>{" "}
            <div className="product__price">{item.price} </div>{" "}
            <div className="product__image">
              {<img src={item.images[0]} alt="shoes" />}
            </div>
            <button className="product__button">Add to cart</button>
            <button onClick={()=> detailsShow(item.id)} className="product__button">Details</button>
          </div>
          
        ))}
      </div>
      </div>
      <div className="product-category">
        <ul className="product-ul">
          <li onClick={() => categoryAll()}>All products</li>
          <li onClick={() => categoryCloth()} >Clothes</li>
          <li onClick={() => categoryElectronics()}>Electronics</li>
          <li onClick={() => categoryFurniture()}>Furniture</li>
          <li onClick={() => categoryShoes()}>Shoes</li>
          <li onClick={() => categoryOthers()}>Others</li>
        </ul>
      </div>
      
      <AppPagination setPage={setOffset} page={offset}/>
    </>
  );
};

export default Product;
