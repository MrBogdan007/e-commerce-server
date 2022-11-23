import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";

import PalleteButton from "./PalleteButton";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  decreaseQuantity,
  // filterQuantity,
  increaseQuantity,
  removeCartItem,
} from "../redux/reducers/cartReducer";
import NavbarOther from "./NavbarOther";

const Cart = () => {
  const cart = useAppSelector((state) => state.cartReducer);
  const user = useAppSelector((state) => state.userReducer.currentUser);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const array = cart.map((item) => item.price * item.quantity);
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
      console.log(sum);
      setTotalPrice(sum);
    }
  }, [cart]);

  console.log(cart);
  
  const theme = useTheme();

  const navigate = useNavigate();

  const [signIn, setSignIn] = useState(false);
  const registerSign = () => {
    setSignIn((current) => !current);
  };
  const dispatch = useAppDispatch();

  const removeCart = (id: number) => {
    dispatch(removeCartItem(id));
  };
  const setPriceAdd = (id: number) => {
    dispatch(increaseQuantity({ id: id }));
  };
  const setPriceRemove = (id: number) => {
    dispatch(decreaseQuantity({ id: id }));
    // dispatch(filterQuantity({ id: id }));
  };

  return (
    <>
      <div className="header header_dif">
        <div onClick={() => navigate("/")} className="header__logo">
          <img
            src={require("../img/logo.png")}
            alt="logo"
            width={250}
            height={40}
          />
        </div>
        <NavbarOther />

        <PalleteButton />
      </div>

      {cart.length <= 0 ? (
        <div>Cart is empty</div>
      ) : (
        <div className="container">
          <h2>Cart</h2>

          <div className="cart__back">
            <button
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (user) {
                  alert("Thanks for choosing our products");
                } else {
                  navigate("/login");
                }
              }}
              className="button cart__button"
            >
              {" "}
              Make an order
            </button>
            <div className="totalPrice">{`Total price: ${totalPrice}$`}</div>
          </div>
          <div
            style={{
              color: theme.palette.mode === "light" ? "black " : "black",
            }}
            className="cart "
          >
            {cart.map((item) => (
              <div key={item.id} className="cart-block">
                <h3>
                  <div className="product__title">{`${item.title}:`}</div>{" "}
                </h3>
                <div className="cart-item">
                  <div className="cart__image">
                    {<img src={item.image} alt="shoes" />}
                  </div>
                  <div className="cart__price">{`${
                    item.price * item.quantity
                  }$`}</div>{" "}
                  <div className="cart-item__bottom">
                    <button
                      onClick={() => removeCart(item.id)}
                      className="button button_cart"
                    >
                      {" "}
                      Remove
                    </button>
                    <div
                      className="cart-block__remove"
                      onClick={() => {
                        setPriceRemove(item.id);
                      }}
                    >
                      {" "}
                      <RemoveIcon />{" "}
                    </div>
                    <div className="cart-block__counter">{item.quantity}</div>
                    <div
                      className="cart-block__add"
                      onClick={() => {
                        setPriceAdd(item.id);
                      }}
                    >
                      <AddIcon />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
