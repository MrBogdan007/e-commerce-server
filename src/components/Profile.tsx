import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import NavBar from "./NavBar";
import NavbarOther from "./NavbarOther";

const Profile = () => {
  const navigate = useNavigate()
  const user = useAppSelector(state => state.userReducer.currentUser)
  if (!user) {
    navigate("/login")
  }
  return (
    <>
      <NavbarOther/>
      <div>Profile</div>
    </>
  );
};

export default Profile;
