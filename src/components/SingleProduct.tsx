import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addCartItem } from "../redux/reducers/cartReducer";
import { editProduct } from "../redux/reducers/productReducer";

const SingleProduct = () => {
  const user = useAppSelector((state) => state.userReducer.currentUser);
  const singleProductValue = useAppSelector(
    (state) => state.singleProductReducer
  );
  console.log(singleProductValue.id);

  const dispatch = useAppDispatch();
  const [titleValue, setTitle] = useState("");
  const [priceValue, setPrice] = useState(0);
  console.log(titleValue);
  console.log(priceValue);

  const navigate = useNavigate();
  const addToCart = (
    id: number,
    title: string,
    price: number,
    image: string
  ) => {
    dispatch(
      addCartItem({
        id: id,
        title: title,
        price: Number(price),
        image: image,
        quantity: 1,
      })
    );
  };
  const onEdit = (id: number, images: string) => {
    dispatch(
      editProduct({
        id: id,
        data: {
          id: id,
          title: titleValue,
          price: Number(priceValue),
          description:
            "The Football Is Good For Training And Recreational Purposes",
          category: {
            id: 4,
            name: "Shoes",
            image: "https://api.lorem.space/image/shoes?w=640&h=480&r=4133",
          },
          images: [
            images,
            "https://api.lorem.space/image/shoes?w=640&h=480&r=401",
            "https://api.lorem.space/image/shoes?w=640&h=480&r=8527",
          ],
        },
      })
    );
    navigate("/product");
  };

  return (
    <div className="container">
      <div className="single">
        <div key={singleProductValue.id} className="single-block">
          {" "}
          <div className="single-item">
            <div className="product__image single__image">
              <img src={singleProductValue.category.image} alt="shoes" />
            </div>
          </div>
          <div className="single-item">
            <div className="product__title single__title">
              {singleProductValue.title}
            </div>{" "}
            <div
              style={{ display: user?.role === "admin" ? "block" : "none" }}
              className="product__admin"
            >
              <label style={{ display: "block" }} htmlFor="text">
                Change title:{" "}
              </label>
              <input type="text" onChange={(e) => setTitle(e.target.value)} />
              <label style={{ display: "block" }} htmlFor="text">
                Change price:{" "}
              </label>
              <input
                type="number"
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="product__price single__price">
              {`${singleProductValue.price}$`}{" "}
            </div>{" "}
            <div className="product__price single__descr">
              {singleProductValue.description}{" "}
            </div>{" "}
            <div className="single__buttons">
              <button
                style={{ display: "block" }}
                onClick={() => {
                  if (user?.role === "admin") {
                    onEdit(singleProductValue.id, singleProductValue.images[0]);
                  } else {
                    addToCart(
                      singleProductValue.id,
                      singleProductValue.title,
                      Number(singleProductValue.price),
                      singleProductValue.images[0]
                    );
                  }
                }}
                className="button product__button"
              >
                {user?.role === "admin" ? "Edit" : "Add to cart"}{" "}
              </button>
              <button
                className="button product__button"
                onClick={() => navigate("/product")}
              >
                {" "}
                Back to shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleProduct;
