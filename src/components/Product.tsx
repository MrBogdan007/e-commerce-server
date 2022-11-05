import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {setOffsetReducer} from "../redux/reducers/productOffset"
import { fetchPagination,  } from "../redux/reducers/productReducer";
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

  console.log(products);
  
  const detailsShow = (id:number) => {
    console.log('clicked');
    
    dispatch(singleProduct(id))
  }

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
            <button onClick={()=> detailsShow(item.id)} className="product__button">Details</button>
          </div>
          
        ))}
      </div>
      </div>
      {singleProductValue?<SingleProduct/> : ''} 
      <AppPagination setPage={setOffset} page={offset}/>
    </>
  );
};

export default Product;
