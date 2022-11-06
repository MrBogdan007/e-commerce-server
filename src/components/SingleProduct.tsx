import { title } from 'process';
import React from 'react'
import { useAppSelector } from '../hooks/reduxHooks';

const SingleProduct = () => {
   const singleProductValue = useAppSelector((state) => state.singleProductReducer);
   console.log(singleProductValue);
   return(
   <div className="container">
   <div className="product product-single ">
     {singleProductValue.map(item => (
       <div key={item.id} className="product-item">
         {" "}
         <div className="product__title">{item.title}</div>{" "}
         <div className="product__price">{item.price} </div>{" "}
         <div className="product__image">
           {<img src={item.category.image} alt="shoes" />}
         </div>
         <button className="product__button">Add to cart</button>
        
       </div>
       
     ))}
   </div>
   </div>
   )
}
export default SingleProduct