import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { logOut } from "../redux/reducers/users";
import NavbarOther from "./NavbarOther";
import PalleteButton from "./PalleteButton";

const Profile = () => {
  const user = useAppSelector((state) => state.userReducer.currentUser);
  const userList = useAppSelector((state) => state.userReducer.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  const dispatch = useAppDispatch();
  const logOutProfile = () => {
    dispatch(logOut());
  };
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
        <NavbarOther />

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
              <h3 className="profile-admin__h3">Site users list: </h3>
              {userList.map((item) => (
                <div className="profile-block">
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
