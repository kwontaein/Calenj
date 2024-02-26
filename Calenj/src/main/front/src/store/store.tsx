import {configureStore,createSelector} from "@reduxjs/toolkit";
import emailValidationSlice from './EmailValidationSlice';


// RootState에서 emailValidation slice를 선택하는 selector 정의
const selectEmailValidation = (state :RootState) =>state.emailValidation;

// emailValidation slice의 상태를 선택하는 selector 정의
export const selectEmailCodeValid = createSelector(
  [selectEmailValidation],
  (emailValidation) => emailValidation.codeValid,
)



const store = configureStore({
  reducer: {
    emailValidation: emailValidationSlice,
  }
});

export default store;

//Redux를 사용하기 위한 type들, 유틸리티 타입을 정의할 때 사용
export type RootState = ReturnType<typeof store.getState>; //스토어 전체의 상태를 가짐
export type AppDispatch = typeof store.dispatch;