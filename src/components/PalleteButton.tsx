import { IconButton, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import { ThemeContext } from "../App";
import { useLocation } from "react-router-dom";

const PalleteButton = () => {
  const colorMode = useContext(ThemeContext);
  const theme = useTheme();
  const location = useLocation()

  return (
    <div className="header-nav__button">
      <IconButton
        style={{ color: location.pathname ==='/'? "#ffffff" : "#000000" }}
        onClick={() => colorMode.toggleMode()}
      >
        {theme.palette.mode === "light" ? (
          <Brightness4Icon />
        ) : (
          <Brightness7Icon />
        )}
      </IconButton>
    </div>
  );
};

export default PalleteButton;
