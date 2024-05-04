import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from '../store'
import {Dispatch} from 'redux';

export interface SubNavigationProps {
    clickState:string;
    mode:string;
    screenHeightSize:number;
    screenWidthSize:number;
}


export interface SubNavigateState{
    subNavigateInfo:SubNavigationProps;
}


//dispatch 함수타입을 interface로 정의
export interface DispatchSubNavigationProps {
    updateSubClickState: (payload: { clickState:string }) => void;
    updateSubScreenMode:(payload: { mode:string}) => void;
    updateSubScreenHeightSize:(payload: { screenHeightSize:number}) => void;
    updateSubScreenWidthtSize:(payload: { screenWidthSize:number}) => void;
}

export const mapDispatchToSubNavigationProps = (dispatch: Dispatch): DispatchSubNavigationProps => ({
    updateSubClickState: (payload: { clickState:string }) => dispatch(updateSubClickState(payload)),
    updateSubScreenMode:(payload: { mode:string}) => dispatch(updateSubScreenMode(payload)),
    updateSubScreenHeightSize:(payload: { screenHeightSize:number}) => dispatch(updateSubScreenHeightSize(payload)),
    updateSubScreenWidthtSize:(payload: { screenWidthSize:number}) => dispatch(updateSubScreenWidthtSize(payload)),
});

//(Component Props로 전달하기 위한 interface)
export const mapStateToSubNavigationProps = (state: RootState): SubNavigateState => ({
    subNavigateInfo: state.subNavigateInfo, // store에서 가져올 상태를 매핑
});





// 초기상태
const initialState: SubNavigationProps ={
    clickState:'',
    mode:'',
    screenHeightSize:250,
    screenWidthSize:800,

}


const subNavigation = createSlice({
    name:'subNavigateInfo',
    initialState,
    reducers:{
        updateSubClickState: (state, action :PayloadAction<{ clickState:string }>)=>{
            state.clickState = action.payload.clickState;
        },
        updateSubScreenMode: (state, action :PayloadAction<{ mode:string}>)=>{
            state.mode = action.payload.mode
        },
        updateSubScreenHeightSize: (state, action :PayloadAction<{ screenHeightSize:number}>)=>{
            state.screenHeightSize = action.payload.screenHeightSize
        },
        updateSubScreenWidthtSize: (state, action :PayloadAction<{ screenWidthSize:number}>)=>{
            state.screenWidthSize = action.payload.screenWidthSize
        },

    },
})


export const {updateSubClickState,updateSubScreenMode,updateSubScreenHeightSize,updateSubScreenWidthtSize} = subNavigation.actions;


export default subNavigation.reducer;