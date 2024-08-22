// moudule/index.js
import { all } from "@redux-saga/core/effects"; // import all method
import {initializeStompChannel} from './StompMiddleware'

// 루트 사가 생성
export function* rootSaga() {
    // all 함수는 여러 사가를 합쳐주는 역할을 한다.
    yield all([initializeStompChannel]);
}

