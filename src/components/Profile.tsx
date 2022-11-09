import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { logOut } from "../redux/reducers/users";
import NavBar from "./NavBar";
import NavbarOther from "./NavbarOther";
import PalleteButton from "./PalleteButton";

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.userReducer.currentUser)
  console.log(user);
  
  if (!user) {
    navigate("/login")
  }

  const logOutProfile = () => {
    dispatch(logOut())
  }
  return (
    <>
        <div className="header header_dif">
          <div className="header__logo">
            <img src={require('../img/logo.png')} alt="logo" width={250} height={40} />
          </div>
          <NavbarOther />

          <PalleteButton />
        </div>
    
      
      <div className="profile">
        <div className="profile-title">
        Profile
        </div>
        
       
      {user && (
         <div className="profile-block" >
          <div className="profile-item">
          <div className="profile-block__avatar"><img src={user.avatar} alt="avatar" /> </div>
          </div>
         <div className="profile-item">
         <div className="profile-block__name"><span>Your name:</span> {user.name}</div>
         <div className="profile-block__email"><span>Your email: </span> {user.email}</div>
          
          <div className="profile-block__password"><span>Password:</span>  {user.password}</div>
          <button onClick={() =>  logOutProfile()} className="button profile-block__button">Logout</button>
         </div>
          
         </div>
         
      )}
      
      </div>
    </>
  );
};

export default Profile;
