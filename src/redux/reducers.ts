import { combineReducers } from 'redux'
import modalReducer from './reducers/modalClose'


import productReducer from './reducers/productReducer'



const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  productReducer,
  modalReducer
})

export default rootReducer