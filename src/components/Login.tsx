import axios from 'axios'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { authenticate } from '../redux/reducers/users'
import Form from './interface/Form'


const Login = () => {
   const dispatch = useAppDispatch()

 
 
  return (
    <div className='login'>
    
      <Form/>
    
      </div>
  )
}

export default Login