import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addCartItem } from "../redux/reducers/cartReducer";
import {setOffsetReducer} from "../redux/reducers/productOffset"
import { fetchCategory, fetchPagination, fetchProducts,  } from "../redux/reducers/productReducer";
import {  singleProduct } from "../redux/reducers/singleProductReducer";
import { Product } from "../types/product";


import Modal from "./interface/Modal";
import NavBar from "./NavBar";
import NavbarOther from "./NavbarOther";
import PaginationCustom from "./pagination/PaginationCustom";
import SingleProduct from "./SingleProduct";

const Category = () => {
  const fetchPaginationValue = useAppSelector((state) => state.productReducer);
  
  // const products = useAppSelector((state) => state.productAllReducer);
  const [products, setProducts] = useState<Product[]>([])
  const [offset,setOffset] = useState(0);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchPagination(offset));
  // },[offset])


  const navigate = useNavigate()
  const detailsShow = (id:number) => {
    console.log('clicked');
    navigate(`/category/${id}`)
    dispatch(singleProduct(id))
  }

const categoryAll = () => {
  dispatch(fetchProducts());
  navigate(`/category`)
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

const addToCart = (id:number,title:string,price:number,image:string) => {
  dispatch(addCartItem({id:id,title:title,price:price,image:image}))
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
            <button  onClick={() => addToCart(item.id,item.title,item.price,item.images[0])} className="product__button">Add to cart</button>
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
      <PaginationCustom setProducts={setProducts}/>
    
    </>
  );
};

export default Category;
