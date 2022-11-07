import { title } from 'process';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { addCartItem } from '../redux/reducers/cartReducer';

const SingleProduct = () => {
   const singleProductValue = useAppSelector((state) => state.singleProductReducer);
   const dispatch = useAppDispatch();
   const addToCart = (id:number,title:string,price:number,image:string) => {
    dispatch(addCartItem({id:id,title:title,price:price,image:image}))
  }
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
         <button onClick={() => addToCart(item.id,item.title,item.price,item.images[0])}  className="product__button">Add to cart</button>
        
       </div>
       
     ))}
   </div>
   </div>
   )
}
export default SingleProduct