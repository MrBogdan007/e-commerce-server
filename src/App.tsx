import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { useForm, SubmitHandler } from "react-hook-form";
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';


import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import NavBar from './components/NavBar';
import Users from './components/Users';
import SingleUser from './components/SingleUser';

import './App.css';
import { userSchema } from './schema/userForm';

interface IFormInput {
  firstname: string
}
function App() {
  const { register, handleSubmit } = useForm<IFormInput>(  {resolver: yupResolver(userSchema)});
 const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
 

  return (
    <div className='App'>

     <BrowserRouter>
    <NavBar/>
     <Routes>
     <Route path='/' element={<Home/>}></Route>
     <Route path='/about' element={<About/>}></Route>
     <Route path='/contact' element={<Contact/>}></Route>
     <Route path='/users' >
      <Route path='' element={<Users/>}> </Route>
      <Route path=':id' element={<SingleUser/>} ></Route>
     </Route>

     </Routes>
     Footer
     </BrowserRouter>

     <form  onSubmit={handleSubmit(onSubmit)}>
     
          <div className="form-item">
          <label htmlFor="firstname">Enter your first name</label>
            <input type="text" {...register("firstname")} placeholder="Title" id="title"  />
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
            <input type="password" name="passwordConfirm" id="passwordConfirm" />
          </div>
          <div className="form-item">
            <select name="status" id="status">
              <option value="none" selected disabled hidden>Status</option>
              <option value="done">Done</option>
              <option value="not started">Not started</option>
              <option value="in progress">In progress</option>
            </select>
          </div>
          <div className="form-item">
          <button type='submit' className="button button_sm">Add</button>
      
        </div>
      
        </form>
    </div>
    
  );
  }

export default App;

