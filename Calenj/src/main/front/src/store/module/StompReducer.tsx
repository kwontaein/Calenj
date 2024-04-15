import {createAction, handleActions} from 'redux-actions';
import {Dispatch} from 'redux';
import {RootState} from '../store'

// Action Types
export const UPDATE_DESTINATION = 'UPDATE_DESTINATION';
export const UPDATE_APP = 'UPDATE_APP';
export const RECEIVED_STOMP_MSG = 'RECEIVED_STOMP_MSG';
export const SEND_STOMP_MSG = 'SEND_STOMP_MSG';
export const UPDATE_ONLINE = 'UPDATE_ONLINE'
export const RELOAD_MSG = 'RELOAD_MSG'

interface Message {
    param:string,
    message: string|string[],
    nickname:string,
    userEmail:string,
    Date:string,
}

//초기상태 정의
export interface StompState {
    destination: Destination,
    target: string,
    param: string | number,
    sendMessage:string,
    reciveMessage: Message,
    isOnline: boolean,
    lastLine:string,
    nowLine:number,
}


export interface StompData {
    stomp: StompState
}

export interface DispatchStompProps {
    updateDestination: (payload: { destination: Destination }) => void;
    sendStompMsg: (payload: { target: string, param: string | number, sendMessage: string }) => void;
    reLoadMsg: (payload: { target: string, param: string | number, lastLine:string, nowLine:number }) => void;
    receivedStompMsg: (payload: {param:string, message:string, nickname:string, userEmail:string, Date:string}) => void;
    updateOnline: (payload: { isOnline: boolean }) => void;
}

/*======================================= 외부 컴포넌트 Connect를 하기 위한 함수 =======================================*/
export const mapDispatchToStompProps = (dispatch: Dispatch): DispatchStompProps => ({
    updateDestination: (payload: { destination: Destination }) => dispatch(updateDestination(payload)),
    reLoadMsg: (payload: { target: string, param: string | number, lastLine:string, nowLine:number }) =>  dispatch(reLoadMsg(payload)),
    sendStompMsg: (payload: {target: string, param: string | number, sendMessage: string}) => dispatch(sendStompMsg(payload)),
    receivedStompMsg: (payload: {param:string, message:string, nickname:string, userEmail:string, Date:string}) => dispatch(receivedStompMsg(payload)),
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
export const sendStompMsg = (payload: { target: string, param: string | number, sendMessage: string}) => ({
    type: SEND_STOMP_MSG,
    payload: payload,
});

export const reLoadMsg = (payload:{ target: string, param: string | number, lastLine: string, nowLine:number}) => ({
    type: RELOAD_MSG,
    payload: payload,
})

//메시지 받기
//채널에서 take로 받아온 message를 받아 action에 대한 payload전달 (dispatch)
export const receivedStompMsg = (payload: {param:string, message:string, nickname:string, userEmail:string, Date:string} ) => ({
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
    param: '', // (sub/pub 시)식별하기 위한 값
    sendMessage:'',
    lastLine:'',
    nowLine:0,
    reciveMessage: {
        param:'',
        message: '',
        nickname:'',
        userEmail:'',
        Date:'',
    }, // 초기 message 상태
    isOnline: false,
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
            param: action.payload.param,
            sendMessage:action.payload.sendMessage,
        }),
        [RELOAD_MSG]: (state, action)=> ({
            ...state,
            target: action.payload.target,
            param: action.payload.param,
            lastLine:action.payload.lastLine,
            nowLine:action.payload.nowLine,
        }),
        [RECEIVED_STOMP_MSG]: (state, action) => ({
            ...state,
            reciveMessage:{
                ...state.reciveMessage,
                param:action.payload.reciveMessage.param,
                message:action.payload.reciveMessage.message,
                nickname:action.payload.reciveMessage.nickname,
                userEmail:action.payload.reciveMessage.userEmail,
                Date:action.payload.reciveMessage.Date,
            }
        }),
        [UPDATE_ONLINE]: (state, action) => ({
            ...state,
            isOnline: action.payload.isOnline
        })
    },
    initialState
);

export default StompReducer;