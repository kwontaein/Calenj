
import { createAction ,handleActions} from 'redux-actions';
import {Dispatch} from 'redux';
import {RootState} from '../store'

// Action Types
export const UPDATE_DESTINATION = 'UPDATE_DESTINATION';
export const UPDATE_APP = 'UPDATE_APP';
export const RECEIVED_STOMP_MSG ='RECEIVED_STOMP_MSG';
export const SEND_STOMP_MSG ='SEND_STOMP_MSG';
export const UPDATE_ONLINE ='UPDATE_ONLINE'
interface Message{
    from:string;
    message:string;
}

export interface StompData{
    stomp:StompState
}

export interface DispatchStompProps {
    updateDestination: (payload: { destination:Destination})=>void;
    updateApp: (payload: { target: string, params: string|number})=>void;
    sendStompMsg : (payload: {message: string}) =>void;
    receivedStompMsg : (payload: {message: Message}) =>void;
    updateOnline : (payload:{isOnline:boolean})=>void;
}
/*======================================= 외부 컴포넌트 Connect를 하기 위한 함수 =======================================*/
export const mapDispatchToStompProps = (dispatch: Dispatch): DispatchStompProps => ({
    updateDestination: (payload: { destination: Destination })=>dispatch(updateDestination(payload)),
    updateApp: (payload: { target: string, params: string|number})=>dispatch(updateApp(payload)),
    sendStompMsg : (payload: {message: string}) =>dispatch(sendStompMsg(payload)),
    receivedStompMsg : (payload: {message: Message}) =>dispatch(receivedStompMsg(payload)),
    updateOnline : (payload: {isOnline: boolean}) =>dispatch(updateOnline(payload)),
});

//(Component Props로 전달하기 위한 interface) 
export const mapStateToStompProps = (state: RootState): StompData => ({
    stomp: state.stomp, // store에서 가져올 상태를 매핑
});

/**=======================================/*=======================================/*=======================================/*/


// action 함수 정의, 외부 컴포넌트에서 접근하여 payload를 전달하여 store를 수정, (state, action)
export const updateDestination = (payload:{destination:Destination}) => ({
    type: UPDATE_DESTINATION,
    payload: payload,
});


export const updateApp = (payload:{target: string, params: string|number}) => ({
    type: UPDATE_APP,
    payload: payload,
});
  
//메시지 전송
export const sendStompMsg = (payload:{message: string}) => ({
  type: SEND_STOMP_MSG,
  payload: payload,
});


//메시지 받기
//채널에서 take로 받아온 message를 받아 action에 대한 payload전달 (dispatch)
export const receivedStompMsg = (payload:{message: Message}) => ({
    type: RECEIVED_STOMP_MSG,
    payload: payload,
});

export const updateOnline =(payload:{isOnline:boolean})=>({
    type: UPDATE_ONLINE,
    payload:payload,
});

export interface Destination{
    map: any;
    [index:number] :(string|number)[];
}



//초기상태 정의
export interface StompState{
    destination:Destination;
    target:string;
    params:string|number;
    message:string;
    isOnline:boolean;
}


// Reducer-saga : 초기 State
const initialState:StompState = {
  destination:[], // topic/app의 경로
  target: '',//초기 publish 대상
  params: '', // (sub/pub 시)식별하기 위한 값
  message: '', // 초기 message 상태
  isOnline:false,
};



//주소를 저장, app/topic을 구분해서 구독 및 메시지 전달을 가능하게 유동적으로 설정
//Reducer를 통해 action type에 따른 수정, type을 받아 접근
const StompReducer = handleActions(
    {
      [UPDATE_DESTINATION]: (state, action) => ({
        ...state,
        destination: action.payload.destination, //[[userid],[userid],list<groupId>, list<friendId>]
      }),
      [UPDATE_APP]: (state, action) => ({
        ...state,
        target: action.payload.target,
        params: action.payload.params,
      }),
      [SEND_STOMP_MSG]: (state, action) => ({
        ...state,
        message: action.payload.message
      }),
      [RECEIVED_STOMP_MSG]: (state, action) => ({
        ...state,
        message: action.payload.message
      }),
      [UPDATE_ONLINE]:(state,action) =>({
        ...state,
        isOnline: action.payload.isOnline
      })
    },
    initialState
  );

export default StompReducer;



//원본

// import { createAction ,handleActions} from 'redux-actions';
// import {Dispatch} from 'redux';
// import {RootState} from '../store'

// // Action Types
// export const UPDATE_TOPIC = 'UPDATE_TOPIC';
// export const UPDATE_APP = 'UPDATE_APP';
// export const RECEIVED_STOMP_MSG ='RECEIVED_STOMP_MSG';
// export const SEND_STOMP_MSG ='SEND_STOMP_MSG';

// interface Message{
//     from:string;
//     message:string;
// }

// interface StompData{
//     stomp:StompState
// }

// export interface DispatchProps {
//     updateDestination: (payload: { topicLogic: string, params: string|number, target:string })=>void;
//     updateTarget: (payload: { target: string, params: string|number, target:string })=>void;
//     sendStompMsg : (payload: {message: string}) =>void;
//     receivedStompMsg : (payload: {message: Message}) =>void;
// }
// /*======================================= 외부 컴포넌트 Connect를 하기 위한 함수 =======================================*/
// export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
//     updateDestination: (payload: { topicLogic: string, params: string|number, target:string })=>dispatch(updateDestination(payload)),
//     updateTarget: (payload: { target: string, params: string|number, target:string })=>dispatch(updateTarget(payload)),
//     sendStompMsg : (payload: {message: string}) =>dispatch(sendStompMsg(payload)),
//     receivedStompMsg : (payload: {message: Message}) =>dispatch(receivedStompMsg(payload)),
// });

// //(Component Props로 전달하기 위한 interface)
// export const mapStateToProps = (state: RootState): StompData => ({
//     stomp: state.stomp, // store에서 가져올 상태를 매핑
// });

// /**=======================================/*=======================================/*=======================================/*/


// // action 함수 정의, 외부 컴포넌트에서 접근하여 payload를 전달하여 store를 수정, (state, action)
// export const updateDestination = (payload:{topicLogic: string, params: string|number, target:string}) => ({
//     type: UPDATE_TOPIC,
//     payload: payload,
// });


// export const updateTarget = (payload:{target: string, params: string|number, target:string}) => ({
//     type: UPDATE_APP,
//     payload: payload,
// });
  
// //메시지 전송
// export const sendStompMsg = (payload:{message: string}) => ({
//   type: SEND_STOMP_MSG,
//   payload: payload,
// });


// //메시지 받기
// //채널에서 take로 받아온 message를 받아 action에 대한 payload전달 (dispatch)
// export const receivedStompMsg = (payload:{message: Message}) => ({
//     type: RECEIVED_STOMP_MSG,
//     payload: payload,
// });



// //초기상태 정의
// export interface StompState{
//     topicLogic:string
//     target:string
//     params:string|number;
//     message:string;
//     target:string;
    
// }


// // Reducer-saga : 초기 State
// const initialState:StompState = {
//   topicLogic: '', // topic의 경로
//   target :'', // app의 경로
//   params: '', // (sub/pub 시)식별하기 위한 값
//   message: '', // 초기 message 상태
//   target: '',//초기 publish 대상
// };



// //주소를 저장, app/topic을 구분해서 구독 및 메시지 전달을 가능하게 유동적으로 설정
// //Reducer를 통해 action type에 따른 수정, type을 받아 접근
// const StompReducer = handleActions(
//     {
//       [UPDATE_TOPIC]: (state, action) => ({
//         ...state,
//         topicLogic: action.payload.topicLogic,
//         params: action.payload.params,
//         target: action.payload.target,
//       }),
//       [UPDATE_APP]: (state, action) => ({
//         ...state,
//         target: action.payload.target,
//         params: action.payload.params,
//         target: action.payload.target,
//       }),
//       [SEND_STOMP_MSG]: (state, action) => ({
//         ...state,
//         message: action.payload.message
//       }),
//       [RECEIVED_STOMP_MSG]: (state, action) => ({
//         ...state,
//         message: action.payload.message
//       }),
//     },
//     initialState
//   );

// export default StompReducer;