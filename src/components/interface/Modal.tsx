import React, { useState } from 'react'
import { ModalInt } from '../../types/form'
import Form from './Form'
import CloseIcon from '@mui/icons-material/Close';
const Modal = ({signIn}:ModalInt) => {
  const [modalCloseValue,modalCloseValueSet] = useState(true)


  return (
    <div className='overlay'>
    <div className="modal">
    <div onClick={() => modalCloseValueSet(prev => !prev)} className="modal-close">
  <CloseIcon/>
   </div> 


   <div className="modal-form">
    <Form signIn={signIn}/>
   </div>
    </div>
    </div>
  )
}

export default Modal