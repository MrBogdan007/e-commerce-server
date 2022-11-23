import { Link } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Count } from "../types/counter";

const NavBar = ({ counter }: Count) => {
  return (
    <>
      <div className="header-dif">
        <nav>
          <Link to={"/"}>Home page</Link>
          <Link to={"product"}>Product page</Link>
          <Link to={"profile"}>Profile page</Link>
          <Link className="homeLink" to={"cart"}>
            <div className="counter">{counter > 0 ? counter : ""}</div>
            <ShoppingCartIcon />
          </Link>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
