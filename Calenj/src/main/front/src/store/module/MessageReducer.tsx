import {createAction, handleActions} from 'redux-actions';
import {Dispatch} from 'redux';
import {RootState} from '../store'


const UPDATE_APP_DIRECT = 'UPDATE_APP_DIRECT'

export interface AppState{
    appPosition:string;
    messageParams:string;
}

interface AppData{
    app:AppState
}
export interface DispatchAppProps {
    updateAppDirect: (payload:{appPosition: string, messageParams:string }) => void;
}

/*======================================= 외부 컴포넌트 Connect를 하기 위한 함수 =======================================*/
export const mapDispatchToAppProps = (dispatch: Dispatch): DispatchAppProps => ({
    updateAppDirect: (payload:{appPosition: string, messageParams:string }) => dispatch(updateAppDirect(payload)),
});

//(Component Props로 전달하기 위한 interface)
export const mapStateToAppProps = (state: RootState): AppData => ({
    app: state.app, // store에서 가져올 상태를 매핑
});

/**=======================================/*=======================================/*=======================================/*/



// action 함수 정의, 외부 컴포넌트에서 접근하여 payload를 전달하여 store를 수정, (state, action)
export const updateAppDirect = (payload: { appPosition: string, messageParams:string }) => ({
    type: UPDATE_APP_DIRECT,
    payload: payload,
});


// Reducer-saga : 초기 State
const initialState :AppState= {
    appPosition:'',
    messageParams:'',
};

const MessageReducer = handleActions(
    {
        [UPDATE_APP_DIRECT]:(state, action)=>({
            ...state,
            appPosition: action.payload.appPosition,
            messageParams:action.payload.messageParams
        }),
    },initialState
)

export default MessageReducer;





