import { combineReducers } from 'redux'


import productReducer from './reducers/productReducer'



const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  productReducer
})

export default rootReducer