import { Link } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavBar = () => {
  return (
    <>
      <div className="header-dif">
        <nav>
          <Link to={"/"}>Home page</Link>
          <Link to={"product"}>Product page</Link>
          <Link to={"profile"}>Profile page</Link>
          <Link to={"cart"}>
            <ShoppingCartIcon />
          </Link>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
