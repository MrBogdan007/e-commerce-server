import React from 'react'
import Form from './Form'
const Modal = () => {
  return (
    <div className='overlay'>
    <div className="modal">
    <div className="modal-title">
      Sign In
   </div>
   <div className="modal-close">
   &#x2613;
   </div>
   <div className="modal-form">
    <Form/>
   </div>
    </div>

    </div>
  )
}

export default Modal