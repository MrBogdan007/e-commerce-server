import { combineReducers } from 'redux'
import modalReducer from './reducers/modalClose'
import offSetReducer from './reducers/productOffset'


import productReducer from './reducers/productReducer'



const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  productReducer,
  modalReducer,
  offSetReducer
})

export default rootReducer