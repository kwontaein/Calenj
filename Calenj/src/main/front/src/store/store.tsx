import {configureStore,createSelector} from "@reduxjs/toolkit";
import {applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'//비동기 논리를 모두 사용하는 데 가장 일반적으로 사용되는 미들웨어



import emailValidationSlice from './EmailValidationSlice';
import StompSlice from "./StompSlice";
import UserInfoSlice from "./UserInfoSlice";




const store = configureStore({
  reducer: {
    emailValidation: emailValidationSlice,
    stomp : StompSlice,
    // userInfo :UserInfoSlice,
    applyMiddleware
  },

});

export default store;

//Redux를 사용하기 위한 type들, 유틸리티 타입을 정의할 때 사용
export type RootState = ReturnType<typeof store.getState>; //스토어 전체의 상태를 가짐
export type AppDispatch = typeof store.dispatch;