import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { createProduct } from "../redux/reducers/productReducer";
import { logOut } from "../redux/reducers/users";
import NavbarOther from "./NavbarOther";
import PalleteButton from "./PalleteButton";

const Profile = () => {
  const [counter, setCounter] = useState(0);
  const user = useAppSelector((state) => state.userReducer.currentUser);
  const userList = useAppSelector((state) => state.userReducer.users);
  const navigate = useNavigate();
  const [titleValue, setTitle] = useState("");
  const [priceValue, setPrice] = useState(0);
  const [descriptionValue, setDescription] = useState('');
  const cart = useAppSelector((state) => state.cartReducer);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });
  useEffect(() => {
    const counterLocalget = JSON.parse(localStorage.getItem("counter") || "0");
    if (counterLocalget) {
      setCounter(cart.length);
    }
  }, []);
  const dispatch = useAppDispatch();
  const logOutProfile = () => {
    dispatch(logOut());
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createProduct({title:titleValue,price:priceValue,description:descriptionValue,categoryId:1,images: [
      "https://api.lorem.space/image?w=640&h=480&r=6903",
      "https://api.lorem.space/image?w=640&h=480&r=5577",
      "https://api.lorem.space/image?w=640&h=480&r=9765"
      ]}))
  }
  return (
    <>
      <div className="header header_dif">
        <div className="header__logo">
          <img
            src={require("../img/logo.png")}
            alt="logo"
            width={250}
            height={40}
          />
        </div>
        <NavbarOther counter={counter} />

        <PalleteButton />
      </div>

      <div className="container">
        <div className="profile">
          <div className="profile-title">Profile</div>

          {user && (
            <div className="profile-block">
              <div className="profile-item">
                <div className="profile-block__avatar">
                  <img src={user.avatar} alt="avatar" />{" "}
                </div>
              </div>
              <div className="profile-item">
                <div className="profile-block__name">
                  <span>Your name:</span> {user.name}
                </div>
                <div className="profile-block__email">
                  <span>Your email: </span> {user.email}
                </div>

                <div className="profile-block__password">
                  <span>Password:</span> {user.password}
                </div>
                <button
                  onClick={() => logOutProfile()}
                  className="button profile-block__button"
                >
                  Logout
                </button>
              </div>
       
            </div>
          )}
          {user?.role === "admin" && (
            
            <div>
              <form className="profile_form" onSubmit={(e) => onSubmit(e)}>
              <div className="profile-item">
                <div className="profile-block__title"><label htmlFor="text" style={{display: 'block'}}>Enter title: </label><input type="text" onChange={(e)=> setTitle(e.target.value)} /></div>
                <div className="profile-block__price"><label htmlFor="text" style={{display: 'block'}}>Enter price: </label><input type="number" onChange={(e)=> setPrice(Number(e.target.value))}/></div>
                <div className="profile-block__description"><label htmlFor="text" style={{display: 'block'}}>Enter description: </label><input type="text" style={{marginBottom:10}} onChange={(e)=> setDescription(e.target.value)}/></div>
                <button type="submit" className="button product__button">Create a new product</button>
              </div>
              </form>
              <h3 className="profile-admin__h3">Site users list: </h3>
              {userList.map((item) => (
                <div key={item.id} className="profile-block">
                  <div className="profile-item">
                    <div className="profile-block__avatar">
                      <img src={item.avatar} alt="avatar" />{" "}
                    </div>
                  </div>
                  <div className="profile-item">
                    <div className="profile-block__name">
                      <span>Users name:</span> {item.name}
                    </div>
                    <div className="profile-block__email">
                      <span>Users email: </span> {item.email}
                    </div>

                    <div className="profile-block__password">
                      <span>Users password:</span> {item.password}
                    </div>
                    <div className="profile-block__role">
                      <span>Users role:</span> {item.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
