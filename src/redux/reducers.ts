import { combineReducers } from 'redux'
import cartReducer from './reducers/cartReducer'
import counterReducer from './reducers/counter'
import modalReducer from './reducers/modalClose'

import offSetReducer from './reducers/productOffset'


import productReducer from './reducers/productReducer'
import singleProductReducer from './reducers/singleProductReducer'

import userReducer from './reducers/users'



const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  productReducer,
  modalReducer,
  offSetReducer,
  singleProductReducer,
  cartReducer,
  userReducer,
  counterReducer,
 
  
})

export default rootReducer