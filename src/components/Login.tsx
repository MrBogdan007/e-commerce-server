import axios from 'axios'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { authenticate } from '../redux/reducers/users'


const Login = () => {
   const dispatch = useAppDispatch()
   const user = useAppSelector(state => state.userReducer.currentUser)
   const onSubmit = async(e:any) => {
      e.preventDefault()
      try{
                  const responce = await axios.post("https://api.escuelajs.co/api/v1/auth/login",{email,password})
                  const token = responce.data
                  localStorage.setItem("token", token.access_token)
                  dispatch(authenticate(token.access_token))
               }
              catch (e) {
               console.log(e);
               
              }
   
   }
   const [email,setEmail] = useState<string>('')
   const [password,setPassword] = useState<string>('')
  return (
    <div><form onSubmit={onSubmit} action="">
      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button type='submit'>Submit</button>
      </form>
      {user && (
         <p>
            {user.name}
         </p>
      )}
      </div>
  )
}

export default Login