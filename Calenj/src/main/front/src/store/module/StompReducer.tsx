
import { createAction ,handleActions} from 'redux-actions';
import {Dispatch} from 'redux';
import {RootState} from '../store'

// Action Types
export const UPDATE_TOPIC = 'UPDATE_TOPIC';
export const UPDATE_APP = 'UPDATE_APP';
export const RECEIVED_STOMP_MSG ='RECEIVED_STOMP_MSG';
export const SEND_STOMP_MSG ='SEND_STOMP_MSG';

interface Message{
    from:string;
    message:string;
}

interface StompData{
    stomp:StompState
}

export interface DispatchProps {
    updateTopic: (payload: { topicLogic: string, params: string|number, target:string })=>void;
    updateApp: (payload: { appLogic: string, params: string|number, target:string })=>void;
    sendStompMsg : (payload: {message: string}) =>void;
    receivedStompMsg : (payload: {message: Message}) =>void;
}
/*======================================= 외부 컴포넌트 Connect를 하기 위한 함수 =======================================*/
export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    updateTopic: (payload: { topicLogic: string, params: string|number, target:string })=>dispatch(updateTopic(payload)),
    updateApp: (payload: { appLogic: string, params: string|number, target:string })=>dispatch(updateApp(payload)),
    sendStompMsg : (payload: {message: string}) =>dispatch(sendStompMsg(payload)),
    receivedStompMsg : (payload: {message: Message}) =>dispatch(receivedStompMsg(payload)),
});

//(Component Props로 전달하기 위한 interface)
export const mapStateToProps = (state: RootState): StompData => ({
    stomp: state.stomp, // store에서 가져올 상태를 매핑
});

/**=======================================/*=======================================/*=======================================/*/


// action 함수 정의, 외부 컴포넌트에서 접근하여 payload를 전달하여 store를 수정, (state, action)
export const updateTopic = (payload:{topicLogic: string, params: string|number, target:string}) => ({
    type: UPDATE_TOPIC,
    payload: payload,
});

export const updateApp = (payload:{appLogic: string, params: string|number, target:string}) => ({
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



//초기상태 정의
export interface StompState{
    topicLogic:string
    appLogic:string
    params:string|number;
    message:string;
    target:string;
    
}


// Reducer-saga : 초기 State
const initialState:StompState = {
  topicLogic: '', // topic의 경로
  appLogic :'', // app의 경로
  params: '', // (sub/pub 시)식별하기 위한 값
  message: '', // 초기 message 상태
  target: '',//초기 publish 대상
};



//주소를 저장, app/topic을 구분해서 구독 및 메시지 전달을 가능하게 유동적으로 설정
//Reducer를 통해 action type에 따른 수정, type을 받아 접근
const StompReducer = handleActions(
    {
      [UPDATE_TOPIC]: (state, action) => ({
        ...state,
        topicLogic: action.payload.topicLogic,
        params: action.payload.params,
        target: action.payload.target,
      }),
      [UPDATE_APP]: (state, action) => ({
        ...state,
        appLogic: action.payload.appLogic,
        params: action.payload.params,
        target: action.payload.target,
      }),
      [SEND_STOMP_MSG]: (state, action) => ({
        ...state,
        message: action.payload.message
      }),
      [RECEIVED_STOMP_MSG]: (state, action) => ({
        ...state,
        message: action.payload.message
      }),
    },
    initialState
  );

export default StompReducer;