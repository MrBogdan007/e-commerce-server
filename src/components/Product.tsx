import { useAppSelector } from "../hooks/reduxHooks";
import NavBar from "./NavBar";

const Product = () => {
  const products = useAppSelector((state) => state.productReducer);
  return (
    <>
      {" "}
      <NavBar />
      <div>
        {products.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </div>
    </>
  );
};

export default Product;
