import { combineReducers } from 'redux'


import formReducer from './reducers/formReducer'



const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  formReducer
})

export default rootReducer