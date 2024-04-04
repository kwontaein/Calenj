// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Middleware } from '@reduxjs/toolkit';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
// import { saveStomp } from './StompSlice'; // STOMP 클라이언트를 저장하는 액션

// interface StompState {
//   stompClient: Stomp | null;
// }

// const initialState: StompState = {
//   stompClient: null,
// };

// const stompSlice = createSlice({
//   name: 'stomp',
//   initialState,
//   reducers: {
//     // STOMP 클라이언트를 저장하는 액션을 처리하는 리듀서
//     saveStompClient(state, action: PayloadAction<Stomp | null>) {
//       state.stompClient = action.payload;
//     },
//   },
// });

// export const { saveStompClient } = stompSlice.actions;

// // 미들웨어 생성
// export const stompMiddleware: Middleware = store => next => action => {
//   const result = next(action); // 다음 미들웨어에 액션 전달

//   // 액션 종류에 따라 처리
//   switch (action.type) {
//     case 'SOME_ACTION_TYPE': // STOMP 클라이언트 초기화 및 설정
//       const sock = new SockJS('http://localhost:8080/ws-stomp');
//       const stomp = Stomp.over(sock);

//       // WebSocket 에러 처리
//       stomp.onWebSocketError = (error: Error) => {
//         console.error('Error with websocket', error);
//       };

//       // Stomp 에러 처리
//       stomp.onStompError = (frame: any) => {
//         console.error('Broker reported error: ' + frame.headers['message']);
//         console.error('Additional details: ' + frame.body);
//       };

//       store.dispatch(saveStompClient(stomp)); // Redux 스토어에 STOMP 클라이언트 저장
//       break;
//     // 다른 액션에 대한 처리 추가...
//   }

//   return result;
// };

// export default stompSlice.reducer;
