import { useAppSelector } from "../hooks/reduxHooks";
import NavBar from "./NavBar";

const Product = () => {
  const products = useAppSelector((state) => state.productReducer);
  return (
    <>
      {" "}
      <NavBar />
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
            <button className="product__button">Details</button>
          </div>
          
        ))}
      </div>
    </>
  );
};

export default Product;
