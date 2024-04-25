import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from '../store'
import {Dispatch} from 'redux';

export interface NavigationProps {
    navigate:string;
    navigateParam:string;
}


export interface NavigateState{
    navigateInfo:NavigationProps;
}


//dispatch 함수타입을 interface로 정의
export interface DispatchNavigationProps {
    updateNavigation: (payload: { navigate: string; navigateParam?: string }) => void;
}

export const mapDispatchToNavigationProps = (dispatch: Dispatch): DispatchNavigationProps => ({
    updateNavigation: (payload: { navigate: string; navigateParam?: string }) => dispatch(updateNavigation(payload)),
});

//(Component Props로 전달하기 위한 interface)
export const mapStateToNavigationProps = (state: RootState): NavigateState => ({
    navigateInfo: state.navigateInfo, // store에서 가져올 상태를 매핑
});





// 초기상태
const initialState: NavigationProps ={
    navigate:'group',
    navigateParam:'',
}


const navigation = createSlice({
    name:'navigationInfo',
    initialState,
    reducers:{
        updateNavigation: (state, action :PayloadAction<{ navigate: string; navigateParam?: string; }>)=>{
            state.navigate = action.payload.navigate;
            if(action.payload.navigateParam){
                state.navigateParam = action.payload.navigateParam;
            }
        },

    },
})


export const {updateNavigation} = navigation.actions;


export default navigation.reducer;