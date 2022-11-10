import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { priceRemove, priceUpdate, removeCartItem } from "../redux/reducers/cartReducer";
import NavBar from "./NavBar";
import NavbarOther from "./NavbarOther";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";
import { counterSet } from "../redux/reducers/counter";
import PalleteButton from "./PalleteButton";
import Modal from "./interface/Modal";
import { setModal } from "../redux/reducers/modalClose";
const Cart = () => {
  const cart = useAppSelector((state) => state.cartReducer);
 const [counter,setCounter] = useState(0);
 const [initial,setInitial] = useState(0);
 
 const modalState = useAppSelector((state) => state.modalReducer);

 

 const [signIn, setSignIn] = useState(false);
 const registerSign = () => {
   setSignIn((current) => !current);

   if (modalState === false) {
     dispatch(setModal({ modal: !modalState }));
     setSignIn((current) => !current);
   }
 };
 const dispatch = useAppDispatch();
 
  const removeCart = (id:number) => {
    dispatch(removeCartItem(id));
  }
 const setPriceAdd = (price:number,id:number) => {
 
   dispatch(priceUpdate({price:price,id:id}))
  
  
   setCounter(prev => prev + 1)
   
 }
 const setPriceRemove = (price:number,id:number) => {
  dispatch(priceRemove({price:price,id:id}))
 }
  return (
    <>
              <div className="header header_dif">
          <div className="header__logo">
            <img src={require('../img/logo.png')} alt="logo" width={250} height={40} />
          </div>
          <NavbarOther />

          <PalleteButton />
        </div>

 
  {
    cart.length<=0? <div>Cart is empty</div> 
    :
    <div className="container">
    <div className="cart ">
      {cart.map((item) => (
        
        <div key={item.id} className="cart-block">
          {" "}
          <div className="cart-item">
          <div className="cart__image">
            {<img src={item.image} alt="shoes" />}
          </div>
          <div className="product__title">{item.title}</div>{" "}
          <div className="product__price">{`${item.price}$`}</div>{" "}

          <div className="cart-item__bottom"> 
          <button onClick={() => removeCart(item.id)} className="button button_cart"> Remove</button>
          <div className="cart-block__remove" onClick={() => { setPriceRemove(item.price,item.id)}}> <RemoveIcon/> </div>
            <div className="cart-block__counter">{counter}</div>
            <div className="cart-block__add" onClick={() => { setPriceAdd(item.price,item.id); }} ><AddIcon/></div>
          </div>

          </div>
          </div>
              
      ))}
    </div>
   
    </div>

  }
      
    </>
  );
};

export default Cart;
