import {createAction, handleActions} from 'redux-actions';
import {Dispatch} from 'redux';
import {RootState} from '../store'

// Action Types
export const UPDATE_DESTINATION = 'UPDATE_DESTINATION';
export const UPDATE_APP = 'UPDATE_APP';
export const RECEIVED_STOMP_MSG = 'RECEIVED_STOMP_MSG';
export const SEND_STOMP_MSG = 'SEND_STOMP_MSG';
export const UPDATE_ONLINE = 'UPDATE_ONLINE'

interface Message {
    message: string;
}

//초기상태 정의
export interface StompState {
    destination: Destination;
    target: string;
    params: string | number;
    message: string;
    isOnline: boolean;
    state : number;
}


export interface StompData {
    stomp: StompState
}

export interface DispatchStompProps {
    updateDestination: (payload: { destination: Destination }) => void;
    sendStompMsg: (payload: { target: string, params: string | number, message: string, state: number }) => void;
    receivedStompMsg: (payload: { message: Message }) => void;
    updateOnline: (payload: { isOnline: boolean }) => void;
}

/*======================================= 외부 컴포넌트 Connect를 하기 위한 함수 =======================================*/
export const mapDispatchToStompProps = (dispatch: Dispatch): DispatchStompProps => ({
    updateDestination: (payload: { destination: Destination }) => dispatch(updateDestination(payload)),
    sendStompMsg: (payload: {
        target: string,
        params: string | number,
        message: string,
        state:number
    }) => dispatch(sendStompMsg(payload)),
    receivedStompMsg: (payload: { message: Message }) => dispatch(receivedStompMsg(payload)),
    updateOnline: (payload: { isOnline: boolean }) => dispatch(updateOnline(payload)),
});

//(Component Props로 전달하기 위한 interface)
export const mapStateToStompProps = (state: RootState): StompData => ({
    stomp: state.stomp, // store에서 가져올 상태를 매핑
});

/**=======================================/*=======================================/*=======================================/*/


// action 함수 정의, 외부 컴포넌트에서 접근하여 payload를 전달하여 store를 수정, (state, action)
export const updateDestination = (payload: { destination: Destination }) => ({
    type: UPDATE_DESTINATION,
    payload: payload,
});


//메시지 전송 (주소, 식별자, 메시지 넣기)
export const sendStompMsg = (payload: { target: string, params: string | number, message: string ,state:number}) => ({
    type: SEND_STOMP_MSG,
    payload: payload,
});


//메시지 받기
//채널에서 take로 받아온 message를 받아 action에 대한 payload전달 (dispatch)
export const receivedStompMsg = (payload: { message: Message }) => ({
    type: RECEIVED_STOMP_MSG,
    payload: payload,
});

export const updateOnline = (payload: { isOnline: boolean }) => ({
    type: UPDATE_ONLINE,
    payload: payload,
});

export interface Destination {
    map: any;
    [index: number]: (string | number)[];
}


// Reducer-saga : 초기 State
const initialState: StompState = {
    destination: [], // topic/app의 경로
    target: '',//초기 publish 대상
    params: '', // (sub/pub 시)식별하기 위한 값
    message: '', // 초기 message 상태
    isOnline: false,
    state: 0,
};


//주소를 저장, app/topic을 구분해서 구독 및 메시지 전달을 가능하게 유동적으로 설정
//Reducer를 통해 action type에 따른 수정, type을 받아 접근
const StompReducer = handleActions(
    {
        [UPDATE_DESTINATION]: (state, action) => ({
            ...state,
            destination: action.payload.destination, //[[userid],[userid],list<groupId>, list<friendId>]
        }),
        [SEND_STOMP_MSG]: (state, action) => ({
            ...state,
            target: action.payload.target,
            params: action.payload.params,
            message: action.payload.message,
            state: action.payload.state
        }),
        [RECEIVED_STOMP_MSG]: (state, action) => ({
            ...state,
            message: action.payload.message
        }),
        [UPDATE_ONLINE]: (state, action) => ({
            ...state,
            isOnline: action.payload.isOnline
        })
    },
    initialState
);

export default StompReducer;