import {configureStore,createSelector} from "@reduxjs/toolkit";
import emailValidationSlice from './EmailValidationSlice';





const store = configureStore({
  reducer: {
    emailValidation: emailValidationSlice,
  }
});

export default store;

//Redux를 사용하기 위한 type들, 유틸리티 타입을 정의할 때 사용
export type RootState = ReturnType<typeof store.getState>; //스토어 전체의 상태를 가짐
export type AppDispatch = typeof store.dispatch;