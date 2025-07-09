import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './reducers/userSlice'
import chatReducers from './reducers/chatSlice'
export default configureStore({
  reducer: {
    user:userReducer,
    chat:chatReducers
  },
})