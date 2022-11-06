import { useAppSelector } from "../hooks/reduxHooks";
import NavBar from "./NavBar";
import NavbarOther from "./NavbarOther";

const Cart = () => {
  const cart = useAppSelector((state) => state.cartReducer);
  console.log(cart.map((item) => item.image));
  
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
          
        </div>
        
      ))}
    </div>
    </div>

  }
      
    </>
  );
};

export default Cart;
