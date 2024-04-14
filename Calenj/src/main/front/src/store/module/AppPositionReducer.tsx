import {createAction, handleActions} from 'redux-actions';
import {Dispatch} from 'redux';
import {RootState} from '../store'


export const UPDATE_APP_POSITION = 'UPDATE_APP_POSITION'

type stateType = "ENDPOINT" | "READ" 

export interface AppState{
    target:string;
    messageParams:string;
    state:stateType;
}

export interface AppData{
    app:AppState
}
export interface DispatchAppProps {
    updateAppDirect: (payload:{target: string, messageParams:string, state:stateType}) => void;
}

/*======================================= 외부 컴포넌트 Connect를 하기 위한 함수 =======================================*/
export const mapDispatchToAppProps = (dispatch: Dispatch): DispatchAppProps => ({
    updateAppDirect: (payload:{target: string, messageParams:string, state:stateType}) => dispatch(updateAppDirect(payload)),
});

//(Component Props로 전달하기 위한 interface)
export const mapStateToAppProps = (state: RootState): AppData => ({
    app: state.app, // store에서 가져올 상태를 매핑
});

/**=======================================/*=======================================/*=======================================/*/



// action 함수 정의, 외부 컴포넌트에서 접근하여 payload를 전달하여 store를 수정, (state, action)
export const updateAppDirect = (payload: { target: string, messageParams:string, state:stateType }) => ({
    type: UPDATE_APP_POSITION,
    payload: payload,
});


//state 0:생성, 1:

// Reducer-saga : 초기 State
const initialState :AppState= {
    target:'',
    messageParams:'',
    state:"READ",
};

const MessageReducer = handleActions(
    {
        [UPDATE_APP_POSITION]:(state, action)=>({
            ...state,
            target: action.payload.target,
            messageParams:action.payload.messageParams,
            state:action.payload.state
        }),
    },initialState
)

export default MessageReducer;