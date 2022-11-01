import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../schema/userForm";
import { useForm, SubmitHandler } from "react-hook-form";

import React from 'react'

const Form = () => {

  interface IFormInput {
    firstname: string;
  }
  const { register, handleSubmit } = useForm<IFormInput>({
    resolver: yupResolver(userSchema),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
 

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
   {/* <select name="status" id="status">
     <option value="none" selected disabled hidden>Status</option>
     <option value="done">Done</option>
     <option value="not started">Not started</option>
     <option value="in progress">In progress</option>
   </select> */}
 </div>
 <div className="form-item">
   <button type="submit" className="button button_sm">
     Add
   </button>
 </div>
 </form>
  )
}

export default Form