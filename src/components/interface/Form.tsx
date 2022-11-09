import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../schema/userForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import React, { useState } from "react";
import { ModalInt } from "../../types/form";
import formReducer, { setForm } from "../../redux/reducers/productReducer";
import axios from "axios";
import { authenticate } from "../../redux/reducers/users";

const Form = ({signIn}: ModalInt) => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const [modalReg,setModalReg] = useState(true)
  interface IFormInput {
    firstname: string;
  }
 
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm<IFormInput>({
    resolver: yupResolver(userSchema),
  });
  // const onSubmit: SubmitHandler<IFormInput> = async data => {
  
  
  // };

  const registrationModal = () => {
    setModalReg((current) => !current)
  }
  
  const onSubmit = async(e:any) => {
    e.preventDefault()
    try{
      const responce = await axios.post("https://api.escuelajs.co/api/v1/auth/login",{email,password})
      const token = responce.data
      console.log(token);
      
      localStorage.setItem("token", token.access_token)
      dispatch(authenticate(token.access_token))
   }
  catch (e) {
   console.log(e);
   
  }
 
 }
  
  return (
    <>
      {modalReg ? 
        <form action="" onSubmit={onSubmit}>
          <div className="form-item">
          <div className="modal-title">
            Sign in
          </div>
            <label htmlFor="email">Enter your email</label>
            <input type="password" onChange={(e) => setEmail(e.target.value)} name="email" id="email" />
          </div>
          <div className="form-item">
            <label htmlFor="password">Enter your password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" />
          </div>

          <div className="form-item">
            <button type="submit"  className="button button_sm button_registrate">
              Sign In
            </button>
          </div>
          <div className="form-item">
            <span>You don't have an account?</span>
            <button type="button" onClick={() => registrationModal() } className="button button_sm button_registrate">
              Create your account
            </button>
          </div>
        </form>
       : 
        <form style={{display: 'block'}} onSubmit={handleSubmit(onSubmit)}>
                    <div className="modal-title">
            Registration
          </div>
          <div className="form-item">
            <label htmlFor="firstname">Enter your first name</label>
            <input
              type="text"
              {...register("firstname")}
              placeholder="Title"
              id="title"
            />
          </div>
          <div className="form-item">
            <label htmlFor="lastname">Enter your last name</label>
            <input type="text" name="lastname" id="lastname" />
          </div>
          <div className="form-item">
            <label htmlFor="email">Enter your email</label>
            <input type="password" name="email" id="email" />
          </div>
          <div className="form-item">
            <label htmlFor="password">Enter your password</label>
            <input type="password" name="password" id="password" />
          </div>
          <div className="form-item">
            <label htmlFor="passwordConfirm">Confirm your password</label>
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
            />
          </div>
          <div className="form-item">
            <select name="status" id="status">
              <option value="none" selected disabled hidden>
                Select your sex
              </option>
              <option value="done">Man</option>
              <option value="not started">Women</option>
              <option value="in progress">Other</option>
            </select>
          </div>
          <div className="form-item">
            <button type="submit" className="button button_sm  button_registrate">
              Registrate
            </button>
          </div>
          <div className="form-item">
            <span>You already have an account?</span>
            <button type="button" onClick={() => registrationModal() } className="button button_sm button_registrate">
              Sign in
            </button>
          </div>
        </form>
      }
    </>
  );
};

export default Form;
