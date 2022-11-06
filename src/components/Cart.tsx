import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { removeCartItem } from "../redux/reducers/cartReducer";
import NavBar from "./NavBar";
import NavbarOther from "./NavbarOther";

const Cart = () => {
  const cart = useAppSelector((state) => state.cartReducer);
  
  
  
  
 const dispatch = useAppDispatch();

  const removeCart = (id:number) => {
    dispatch(removeCartItem(id));
  }
  return (
    <>
 <NavbarOther/>
  {
    cart.length<=0? <div>Cart is empty</div> 
    
    :
    <div className="container">
    <div className="product product-fetch">
      {cart.map((item) => (
        <div key={item.id} className="product-item">
          {" "}
          <div className="product__title">{item.title}</div>{" "}
          <div className="product__price">{`${item.price}$`} </div>{" "}
          <div className="product__image">
            {<img src={item.image} alt="shoes" />}
          </div>
          <button onClick={() => removeCart(item.id)} className="button button_cart"> Remove</button>
        </div>
        
      ))}
    </div>
   
    </div>

  }
      
    </>
  );
};

export default Cart;
