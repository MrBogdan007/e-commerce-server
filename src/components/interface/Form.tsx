import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../schema/userForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import React, { useState } from "react";
import { ModalInt } from "../../types/form";

import axios from "axios";
import { authenticate } from "../../redux/reducers/users";
import { useLocation, useNavigate } from "react-router-dom";

const Form = ({ signIn,setSignIn }: ModalInt) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName] = useState('')
  const navigate = useNavigate();
  const [modalReg, setModalReg] = useState(true);
  interface IFormInput {
    firstname: string;
  }
  const location = useLocation()
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<IFormInput>({
    resolver: yupResolver(userSchema),
  });
  // const onSubmit: SubmitHandler<IFormInput> = async data => {

  // };

  const registrationModal = () => {
    setModalReg((current) => !current);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const responce = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        { email, password }
      );
      const token = responce.data;
      console.log(token);

      localStorage.setItem("token", token.access_token);
      dispatch(authenticate(token.access_token));
    } catch (e) {
      console.log(e);
    }
    if (email != "" && password != "") {
      if(setSignIn)
      setSignIn(false)
      if(location.pathname === '/product'){
        navigate('/product')
      }else{
        navigate("/");
      }
      
    }
  };
  const onSubmit2 = async (e: any) => {
    e.preventDefault();
    try {
      const avatar = "https://api.lorem.space/image/face?w=640&h=480"
      const responce = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        { email, password,name,avatar }
      );
      const result = responce.data;
      console.log(result);
      if(setSignIn)
      setSignIn(false)
      navigate("/");
      return result

    } catch (e) {
      console.log(e);
    }
 
  };
 
  
  const backHome = () => {
    navigate('/')
  };


  return (
    <>
      {modalReg ? (
        <form className={signIn === undefined ?"form": '' }  action="" onSubmit={onSubmit}>
          <div className="form-item">
            <div className="modal-title">
              {signIn === undefined
                ? "Please, sign in to full access"
                : "Sign in"}
            </div>
            <label htmlFor="email">Enter your email</label>
            <input
              type="password"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">Enter your password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
            />
          </div>

          <div className="form-item">
            <button
              type="submit"
              className="button button_sm button_registrate"
            >
              Sign In
            </button>
            { signIn === undefined &&
              <button
              className="button button_registrate"
              onClick={backHome}
              >
              Go back
              </button>
            }
           
          </div>
          <div className="form-item">
            <span>You don't have an account?</span>
            <button
              type="button"
              onClick={() => registrationModal()}
              className="button button_sm button_registrate"
            >
              Create your account
            </button>
          </div>
        </form>
      ) : (
        <form style={{ display: "block" }} onSubmit={onSubmit2}>
          <div className="modal-title">Registration</div>
          <div className="form-item">
            <label htmlFor="firstname">Enter your first name</label>
            <input
              type="text"
              {...register("firstname")}
              placeholder="Title"
              id="title"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-item">
            <label htmlFor="email">Enter your email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="password" name="email" id="email" />
          </div>
          <div className="form-item">
            <label htmlFor="password">Enter your password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
          </div>


          <div className="form-item">
            <button
              type="submit"
              
              className="button button_sm  button_registrate"
            >
              Registrate
            </button>
          </div>
          <div className="form-item">
            <span>You already have an account?</span>
            <button
              type="button"
              onClick={() => registrationModal()}
              className="button button_sm button_registrate"
            >
              Sign in
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Form;
