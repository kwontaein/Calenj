import {configureStore} from "@reduxjs/toolkit";
import emailValidationSlice from './EmailValidationSlice';



const store = configureStore({
  reducer: {
    emailValidation: emailValidationSlice,
  }
});

export default store;