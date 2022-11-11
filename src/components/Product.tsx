import {  useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { addCartItem } from "../redux/reducers/cartReducer";
import CategoryIcon from '@mui/icons-material/Category';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import BedIcon from '@mui/icons-material/Bed';
import IceSkatingIcon from '@mui/icons-material/IceSkating';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import { useNavigate } from "react-router-dom";


import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  deleteProducts,
  fetchCategory,
  fetchProducts,
  setProduct,
  setSearchDispatch,
} from "../redux/reducers/productReducer";
import { singleProduct } from "../redux/reducers/singleProductReducer";
import { ProductType } from "../types/product";
import Modal from "./interface/Modal";
import NavbarOther from "./NavbarOther";
import PaginationCustom from "./pagination/PaginationCustom";
import PalleteButton from "./PalleteButton";


const Product = () => {
 
  const [counter, setCounter] = useState(0)
 
  // const products = useAppSelector((state) => state.productAllReducer);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [select, setSelect] = useState('');

  const user = useAppSelector(state => state.userReducer.currentUser)
  const dispatch = useAppDispatch();

  
  const [search,setSearch] = useState('');
 
  
  // const tempList = products.filter(item=> item.title.includes(search))
  useEffect(() => {
    dispatch(setProduct(select));
    
  },[select])

  // useEffect(() => {
    
  //   const counterLocalget = JSON.parse(localStorage.getItem("counter")||0); 
  //   if(counterLocalget) {
  //   setCounter(counterLocalget);
  //   }
  // },[])
  // useEffect(() => {
  //   localStorage.setItem("counter", JSON.stringify(counter))

  // })

  
  
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
    setCounter(prev=> prev + 1)

    dispatch(addCartItem({ id: id, title: title, price: price, image: image, quantity: 1}));
  };


  const handleChange = (e:any) => {
    setSelect(e.target.value); 
  }
 



  const onDelete = (id:number) => {
    dispatch(deleteProducts(id))
  }
  
  const onEdit = useCallback((id:number)=>{
      // dispatch(editProduct(id,))
      navigate(`/product/${id}`);
      dispatch(singleProduct(id));
  }
    ,[]); 
  
  
   const onSearch = (e:any) => {
    dispatch(setSearchDispatch(search));
    setSearch('');
   }
  const [signIn, setSignIn] = useState(false);
  const registerSign = () => {
    setSignIn((current) => !current);
  
  }

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
        style={{ display: signIn  ? "block" : "none" }}
        className="header__modal"
      >
        <Modal signIn={signIn} setSignIn={setSignIn} />
      </div>
      <div className="container">
       
          <div className="product-search">
            <input value={search} onChange={(e) => { setSearch(e.target.value); }}  className="product__input" type="text" />
              <button  className="button" onClick={onSearch}>Search</button>{" "}
          </div>

          <div className="product__select">
            <select name="properties" id="properties" onChange={handleChange}>
              {" "}
              <option value="naming">by naming</option>{" "}
              <option value="cheap">from cheap</option>{" "}
              <option value="expensive">from expensive</option>
            </select>
          </div>
        

        <div className="product product-fetch">
          {/* <div className="counter">{counter}</div> */}
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
                className="button product__button"
              >
                {user?.role ==='admin' ? 'Edit product': 'Add to cart'  } 
              </button>
              <div
        style={{ display: signIn ? "block" : "none" }}
        className="header__modal"
      >
        
      </div>
              <button
                onClick={() => { if(user?.role ==='admin'){onDelete(item.id)} else{detailsShow(item.id)} }}
                className="button product__button"
              >
                {user?.role ==='admin' ? 'Delete': 'Details'  }
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="product-category">
        <ul
          className="product-ul"
          style={{ color: theme.palette.mode === "light" ? "black" : "black" }}
        >
          <li onClick={() => categoryAll()}><CategoryIcon/> All products</li>
          <li onClick={() => categoryCloth()}><CheckroomIcon/> Clothes</li>
          <li onClick={() => categoryElectronics()}><ElectricBoltIcon/> Electronics</li>
          <li onClick={() => categoryFurniture()}><BedIcon/> Furniture</li>
          <li onClick={() => categoryShoes()}><IceSkatingIcon/> Shoes</li>
          <li onClick={() => categoryOthers()}><AltRouteIcon/> Others</li>
        </ul>
      </div>
      <div className="pagination">
        <PaginationCustom setProducts={setProducts} />
      </div>
      
    </>
  );
};

export default Product;
