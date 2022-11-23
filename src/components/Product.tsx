import { useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { addCartItem } from "../redux/reducers/cartReducer";
import CategoryIcon from "@mui/icons-material/Category";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import BedIcon from "@mui/icons-material/Bed";
import IceSkatingIcon from "@mui/icons-material/IceSkating";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  deleteProducts,
  fetchCategory,
  fetchProducts,
} from "../redux/reducers/productReducer";
import { singleProduct } from "../redux/reducers/singleProductReducer";
import { ProductType } from "../types/product";
import Modal from "./interface/Modal";
import NavbarOther from "./NavbarOther";
import PaginationCustom from "./pagination/PaginationCustom";
import PalleteButton from "./PalleteButton";

const Product = () => {
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const [search, setSearch] = useState("");
  const [counter, setCounter] = useState(0);
  const [signIn, setSignIn] = useState(false);
  const [productsList, setProductsList] = useState<ProductType[]>([]);
  const [select, setSelect] = useState("");
  const products = useAppSelector((state) => state.productReducer.products);
  const categories = useAppSelector((state) => state.categoryReducer);
  const cart = useAppSelector((state) => state.cartReducer);

  const tempListFilter = (item: any) => {
    return item.title.includes(search);
  };

  useEffect(() => {
    const counterLocalget = JSON.parse(localStorage.getItem("counter") || "0");
    if (counterLocalget) {
      setCounter(cart.length);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("counter", JSON.stringify(counter));
  });
  const tempList = products.filter(tempListFilter);
  const user = useAppSelector((state) => state.userReducer.currentUser);
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.productReducer.isLoading);
  const theme = useTheme();
  const navigate = useNavigate();

  const detailsShow = (id: number) => {
    navigate(`/product/${id}`);
    dispatch(singleProduct(id));
  };

  const categoryAll = () => {
    dispatch(fetchProducts());
    navigate(`/product`);
  };
  const categoryCloth = (clothes: string) => {
    categories.map((categoryObj) => {
      if (clothes === categoryObj.name) {
        dispatch(fetchCategory(categoryObj.id));
      }
    });
  };
  const categoryElectronics = (electronics: string) => {
    categories.map((categoryObj) => {
      if (electronics === categoryObj.name) {
        dispatch(fetchCategory(categoryObj.id));
      }
    });
  };
  const categoryFurniture = (furniture: string) => {
    categories.map((categoryObj) => {
      if (furniture === categoryObj.name) {
        dispatch(fetchCategory(categoryObj.id));
      }
    });
  };
  const categoryShoes = (shoes: string) => {
    categories.map((categoryObj) => {
      if (shoes === categoryObj.name) {
        dispatch(fetchCategory(categoryObj.id));
      }
    });
  };
  const categoryOthers = (others: string) => {
    categories.map((categoryObj) => {
      if (others === categoryObj.name) {
        dispatch(fetchCategory(categoryObj.id));
      }
    });
  };

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
        price: price,
        image: image,
        quantity: 1,
      })
    );
  };

  const onDelete = (id: number) => {
    dispatch(deleteProducts(id));
  };

  const onEdit = useCallback((id: number) => {
    navigate(`/product/${id}`);
    dispatch(singleProduct(id));
  }, []);

  const registerSign = () => {
    setSignIn((current) => !current);
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const selectOptions = () => {
    if (select === "cheap") {
      productsList.sort((a, b) => a.price - b.price);
    }
    if (select === "naming") {
      productsList.sort((a, b) => (a.title > b.title ? 1 : -1));
    }

    if (select === "expensive") {
      productsList.sort((a, b) => b.price - a.price);
    }
  };
  useEffect(() => {
    setCounter(cart.length);
  }, [cart]);
  selectOptions();
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
        <NavbarOther counter={counter} />
        <span
          className="header__signIn"
          onClick={() => {
            registerSign();
          }}
          style={{ color: "black" }}
        >
          Sign In
        </span>
        <PalleteButton />
      </div>
      <div
        style={{ display: signIn ? "block" : "none" }}
        className="header__modal"
      >
        <Modal signIn={signIn} setSignIn={setSignIn} />
      </div>
      <div className="container">
        <div className="product-search">
          <input
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              inputChange(e)
            }
            className="product__input"
            type="text"
          />
          <button className="button">Search</button>{" "}
        </div>

        <div className="product__select">
          <select
            name="properties"
            id="properties"
            onChange={(e) => setSelect(e.target.value)}
          >
            {" "}
            <option value="naming">by naming</option>{" "}
            <option value="cheap">from cheap</option>{" "}
            <option value="expensive">from expensive</option>
          </select>
        </div>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "30px",
              height: "100vh",
            }}
          >
            loading...
          </div>
        ) : (
          <div className="product product-fetch">
            {productsList.map((item) => (
              <div
                key={item.id}
                style={{
                  color: theme.palette.mode === "light" ? "black" : "black",
                }}
                className="product-item"
              >
                {" "}
                <div className="product__title">{item.title}</div>{" "}
                <div className="product__price">{`${item.price}$`} </div>{" "}
                <div className="product__image">
                  {<img src={item.images[0]} alt="shoes" />}
                </div>
                <button
                  onClick={() => {
                    if (user?.role === "admin") {
                      onEdit(item.id);
                    } else {
                      addToCart(
                        item.id,
                        item.title,
                        item.price,
                        item.images[0]
                      );
                    }
                  }}
                  className="button product__button"
                >
                  {user?.role === "admin" ? "Edit product" : "Add to cart"}
                </button>
                <div
                  style={{ display: signIn ? "block" : "none" }}
                  className="header__modal"
                ></div>
                <button
                  onClick={() => {
                    if (user?.role === "admin") {
                      onDelete(item.id);
                    } else {
                      detailsShow(item.id);
                    }
                  }}
                  className="button product__button"
                >
                  {user?.role === "admin" ? "Delete" : "Details"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="product-category">
        <ul
          className="product-ul"
          style={{ color: theme.palette.mode === "light" ? "black" : "black" }}
        >
          <li onClick={() => categoryAll()}>
            <CategoryIcon /> All products
          </li>
          <li
            onClick={() => {
              const clothes = "Clothes";
              categoryCloth(clothes);
            }}
          >
            <CheckroomIcon /> Clothes
          </li>
          <li
            onClick={() => {
              const electronics = "Electronics";
              categoryElectronics(electronics);
            }}
          >
            {" "}
            <ElectricBoltIcon /> Electronics
          </li>
          <li
            onClick={() => {
              const furniture = "Furniture";
              categoryFurniture(furniture);
            }}
          >
            <BedIcon /> Furniture
          </li>
          <li
            onClick={() => {
              const shoes = "Shoes";
              categoryShoes(shoes);
            }}
          >
            <IceSkatingIcon /> Shoes
          </li>
          <li
            onClick={() => {
              const others = "Others";
              categoryOthers(others);
            }}
          >
            <AltRouteIcon /> Others
          </li>
        </ul>
      </div>
      {loading ? (
        ""
      ) : (
        <div className="pagination">
          <PaginationCustom
            setProductsList={setProductsList}
            tempList={tempList}
          />
        </div>
      )}
    </>
  );
};

export default Product;
