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
  const prod = useAppSelector(state => state.productReducer)
  
  const [cat1,setCat1] = useState(false);
  const [cat2,setCat2] = useState(false);
  const [cat3,setCat3] = useState(false);
  const [cat4,setCat4] = useState(false);
  const [cat5,setCat5] = useState(false);
  
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
    setCat1(false)
    setCat2(false)
    setCat3(false)
    setCat4(false)
    setCat5(false)
  };
  const categoryCloth = () => {
    dispatch(fetchCategory(1));
    setCat1(true)
    setCat2(false)
    setCat3(false)
    setCat4(false)
    setCat5(false)
  };
  const categoryElectronics = () => {
    
    dispatch(fetchCategory(2));
    setCat2(true)
    setCat1(false)
    setCat3(false)
    setCat4(false)
    setCat5(false)
  };
  const categoryFurniture = () => {
    dispatch(fetchCategory(3));
    setCat3(true)
    setCat1(false)
    setCat2(false)
    setCat4(false)
    setCat5(false)
  };
  const categoryShoes = () => {
    dispatch(fetchCategory(4));
    setCat4(true)
    setCat1(false)
    setCat2(false)
    setCat3(false)
    setCat5(false)
  };
  const categoryOthers = () => {
    dispatch(fetchCategory(5));
    setCat5(true)
    setCat1(false)
    setCat2(false)
    setCat4(false)
    setCat3(false)
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
  
  
   const  onSearch = (e:any) => {
    // track e.target.value and if it less than search value to dispatch all products and filter them  
    dispatch(fetchProducts());
    setTimeout(() => dispatch(setSearchDispatch(search)), 500)
    
    if(cat1 === true) {
      dispatch(fetchCategory(1));
      console.log(cat1,cat2,cat3,cat4,cat5);
    }
    if(cat2 === true) {
      dispatch(fetchCategory(2));
      console.log(cat1,cat2,cat3,cat4,cat5);
    }
    if(cat3 === true) {
      dispatch(fetchCategory(3));

    }
    if(cat4 === true) {
      dispatch(fetchCategory(4));

    }
    if(cat5 === true) {
      dispatch(fetchCategory(5));
    } 
    
   }
  const [signIn, setSignIn] = useState(false);
  const registerSign = () => {
    setSignIn((current) => !current);
  
  }
console.log(loading);


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
             <input value={search}  onChange={(e) =>{  setSearch(e.target.value);    }}  className="product__input" type="text" /> 
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
        
            {
              loading ? <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center', fontSize:'30px', height: '100vh'}}>loading...</div>
              : 
              <div className="product product-fetch">
              {/* <div className="counter">{counter}</div > */}
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
            }
     

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
      {loading? '':   <div className="pagination">
        <PaginationCustom  setProducts={setProducts} />
      </div>}
    
      

      
    </>
  );
};

export default Product;
