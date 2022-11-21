import { Link } from "react-router-dom";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTheme } from "@mui/material";

const NavBar = () => {
  const theme = useTheme();

  return (
    <>
      <div className="navbar-other__main">
        <nav>
          <Link
            style={{
              color: theme.palette.mode === "light" ? "black " : "black",
            }}
            to={"/"}
          >
            Home page
          </Link>
          <Link
            style={{
              color: theme.palette.mode === "light" ? "black " : "black",
            }}
            to={"../product"}
          >
            Product page
          </Link>
          <Link
            style={{
              color: theme.palette.mode === "light" ? "black " : "black",
            }}
            to={"../profile"}
          >
            Profile page
          </Link>
          <Link
            style={{
              color: theme.palette.mode === "light" ? "black " : "black",
            }}
            to={"../cart"}
          >
            <ShoppingCartIcon />
          </Link>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
