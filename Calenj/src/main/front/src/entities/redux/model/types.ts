//Redux를 사용하기 위한 type들, 유틸리티 타입을 정의할 때 사용
import store from "../../../app/hoc/store";

export type RootState = ReturnType<typeof store.getState>; //스토어 전체의 상태를 가짐
export type AppDispatch = typeof store.dispatch;