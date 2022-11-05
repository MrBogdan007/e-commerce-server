import { combineReducers } from 'redux'
import modalReducer from './reducers/modalClose'
import productAllReducer from './reducers/productAll'
import offSetReducer from './reducers/productOffset'


import productReducer from './reducers/productReducer'
import singleProductReducer from './reducers/singleProductReducer'



const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  productReducer,
  modalReducer,
  offSetReducer,
  singleProductReducer,
  productAllReducer
  
})

export default rootReducer