import {configureStore,createSelector} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunkMiddleware from 'redux-thunk'//비동기 논리를 모두 사용하는 데 가장 일반적으로 사용되는 미들웨어
import createSagaMiddleware from 'redux-saga';
import { all } from "@redux-saga/core/effects"; // import all method
import {initializeStompChannel} from './module/StompMiddleware'
import emailValidationReducer from './slice/EmailValidationSlice';
import StompReducer from './module/StompReducer';
import NavigateReducer from './slice/NavigateByComponent'


// 액션 타입
export const RESTART_SAGA = 'RESTART_SAGA';

// 액션 생성자 (t)
export const restartSaga = () => ({
  type: RESTART_SAGA,
});

// 루트 사가 생성
function* rootSaga() {
    // all 함수는 여러 사가를 합쳐주는 역할을 한다.
    yield all([initializeStompChannel()]);
}

//여려 reducer를 묶는용 (dispatch함수 X)
const rootReducer = combineReducers({stomp: StompReducer, emailValidation: emailValidationReducer, navigateInfo:NavigateReducer});


// 사가 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

//Client 실행 시 자동으로 바로 시작
export const sagaTask =sagaMiddleware.run(rootSaga);

export function sagaMutation(login:boolean){
  if(!login) return;

  if(!sagaTask.isRunning()){
    sagaMiddleware.run(rootSaga)
  }else{
    sagaTask.cancel();
    sagaMiddleware.run(rootSaga)
  }
  console.log("Saga재시작")

}

export default store;

//Redux를 사용하기 위한 type들, 유틸리티 타입을 정의할 때 사용
export type RootState = ReturnType<typeof store.getState>; //스토어 전체의 상태를 가짐
export type AppDispatch = typeof store.dispatch;