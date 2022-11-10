import { Pagination, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addCartItem } from "../redux/reducers/cartReducer";
import { setModal } from "../redux/reducers/modalClose";
import { setOffsetReducer } from "../redux/reducers/productOffset";
import {
  deleteProducts,
  editProduct,
  fetchCategory,
  fetchPagination,
  fetchProducts,
  setProduct,
  setSearchDispatch,
} from "../redux/reducers/productReducer";
import { singleProduct } from "../redux/reducers/singleProductReducer";
import { ProductType } from "../types/product";


import Modal from "./interface/Modal";
import ModalEdit from "./interface/ModalEdit";
import Login from "./Login";
import NavBar from "./NavBar";
import NavbarOther from "./NavbarOther";
import PaginationCustom from "./pagination/PaginationCustom";
import PalleteButton from "./PalleteButton";
import SingleProduct from "./SingleProduct";

const Product = () => {
  const fetchPaginationValue = useAppSelector((state) => state.productReducer);

  // const products = useAppSelector((state) => state.productAllReducer);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [select, setSelect] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const user = useAppSelector(state => state.userReducer.currentUser)
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchPagination(offset));
  // },[offset])
  const [search,setSearch] = useState('');

  useEffect(() => {
    dispatch(setProduct(select));
    
  },[select])
  useEffect(() => {
    // dispatch(fetchProducts());
    
  },[search])
  
  const productsReducer = useAppSelector((state) => state.productReducer);
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
  const categoryCloth = () => {
    dispatch(fetchCategory(1));
  };
  const categoryElectronics = () => {
    dispatch(fetchCategory(2));
  };
  const categoryFurniture = () => {
    dispatch(fetchCategory(3));
  };
  const categoryShoes = () => {
    dispatch(fetchCategory(4));
  };
  const categoryOthers = () => {
    dispatch(fetchCategory(5));
  };

  const addToCart = (
    id: number,
    title: string,
    price: number,
    image: string
    
  ) => {
    dispatch(addCartItem({ id: id, title: title, price: price, image: image, quantity: 1}));
  };

  const inputHandler = (e:any) => {
    setSearch(e);
  }
  const handleChange = (e:any) => {
    setSelect(e.target.value); 
  }
  const location = useLocation()

  const modalState = useAppSelector((state) => state.modalReducer);

  const onDelete = (id:number) => {
    dispatch(deleteProducts(id))
  }
  
  const onEdit = useCallback((id:number)=>{
      // dispatch(editProduct(id,))
      navigate(`/product/${id}`);
      dispatch(singleProduct(id));
  }
    ,[]); 
  
   const onSearch = () => {
    dispatch(setSearchDispatch(search));
    setSearch('');
   }
  const [signIn, setSignIn] = useState(false);
  const registerSign = () => {
    setSignIn((current) => !current);

    if (modalState === false) {
      dispatch(setModal({ modal: !modalState }));
      setSignIn((current) => !current);
    }}
  return (
    <>
          <div className="header header_dif">
          <div onClick={() => navigate('/')} className="header__logo">
            <img src={require('../img/logo.png')} alt="logo" width={250} height={40} />
          </div>
          <NavbarOther />
          <span
            className="header__signIn"
            onClick={() => {
              registerSign();
            }}
           style={{color: 'black'}}
          >
            Sign In
          </span>
          <PalleteButton />
        </div>
        <div
        style={{ display: signIn && modalState ? "block" : "none" }}
        className="header__modal"
      >
        <Modal signIn={signIn} />
      </div>
      <div className="container">
        <div className="product-header">
          <div className="product-search">
            <input value={search} onChange={(e) => inputHandler(e.target.value)} className="product__input" type="text" />
              <button onClick={onSearch} className="button">Search</button>{" "}
          </div>

          <div className="product__select">
            <select name="properties" id="properties" onChange={handleChange}>
              {" "}
              <option value="naming">by naming</option>{" "}
              <option value="cheap">from cheap</option>{" "}
              <option value="expensive">from expensive</option>
            </select>
          </div>
        </div>

        <div className="product product-fetch">
          {products.map((item) => (
            <div key={item.id} style={{color: theme.palette.mode === "light" ? "black" : "black"}}  className="product-item">
              {" "}
              <div className="product__title">{item.title}</div>{" "}
              <div className="product__price">{`${item.price}$`} </div>{" "}
              <div className="product__image">
                {<img src={item.images[0]} alt="shoes" />}
              </div>
              <button
                onClick={() =>{
                  if(user?.role ==='admin'){onEdit(item.id)} else{addToCart(item.id, item.title, item.price, item.images[0])} }
                }
                className="product__button"
              >
                {user?.role ==='admin' ? 'Edit product': 'Add to cart'  } 
              </button>
              <div
        style={{ display: modalShow ? "block" : "none" }}
        className="header__modal"
      >
        
      </div>
              <button
                onClick={() => { if(user?.role ==='admin'){onDelete(item.id)} else{detailsShow(item.id)} }}
                className="product__button"
              >
                {user?.role ==='admin' ? 'Delete': 'Details'  }
              </button>
            </div>
          ))}
          {/* <ModalEdit  /> */}
        </div>
      </div>
      <div className="product-category">
        <ul
          className="product-ul"
          style={{ color: theme.palette.mode === "light" ? "black" : "black" }}
        >
          <li onClick={() => categoryAll()}>All products</li>
          <li onClick={() => categoryCloth()}>Clothes</li>
          <li onClick={() => categoryElectronics()}>Electronics</li>
          <li onClick={() => categoryFurniture()}>Furniture</li>
          <li onClick={() => categoryShoes()}>Shoes</li>
          <li onClick={() => categoryOthers()}>Others</li>
        </ul>
      </div>
      <div className="pagination">
        <PaginationCustom setProducts={setProducts} />
      </div>
      
    </>
  );
};

export default Product;
