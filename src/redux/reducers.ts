import { combineReducers } from 'redux'
import cartReducer from './reducers/cartReducer'
import categoryReducer from './reducers/categoryReducer'



import productReducer from './reducers/productReducer'
import singleProductReducer from './reducers/singleProductReducer'

import userReducer from './reducers/users'



const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  productReducer,
  singleProductReducer,
  cartReducer,
  userReducer,
  categoryReducer

 
  
})

export default rootReducer