import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../types";
import {Dispatch} from 'redux';
import {ScrollMin_width} from "../../../../features/messsage/messageScrollBox/ui/MessageScrollBoxStyled";

export interface Group_SubNavigationProps {
    param:string,
    clickState:string,
    mode:string,
    screenHeightSize:number,
    screenWidthSize:number,
}



export interface Group_SubNavigateState{
    group_subNavState:Group_SubNavigationProps;
}


//dispatch 함수타입을 interface로 정의
export interface DispatchSubNavigationProps {
    updateSubParam : (payload :{param:string}) => void;
    updateSubClickState: (payload: { clickState:string}) => void;
    updateSubScreenMode:(payload: { mode:string}) => void;
    updateSubScreenHeightSize:(payload: { screenHeightSize:number}) => void;
    updateSubScreenWidthSize:(payload: { screenWidthSize:number}) => void;
}

export const mapDispatchToSubNavigationProps = (dispatch: Dispatch): DispatchSubNavigationProps => ({
    updateSubParam : (payload :{param:string}) => dispatch(updateSubParam(payload)),
    updateSubClickState : (payload: { clickState:string}) => dispatch(updateSubClickState(payload)),
    updateSubScreenMode : (payload: { mode:string}) => dispatch(updateSubScreenMode(payload)),
    updateSubScreenHeightSize : (payload: { screenHeightSize:number}) => dispatch(updateSubScreenHeightSize(payload)),
    updateSubScreenWidthSize : (payload: { screenWidthSize:number}) => dispatch(updateSubScreenWidthSize(payload)),

});

//(Component Props로 전달하기 위한 interface)
export const mapStateToSubNavigationProps = (state: RootState): Group_SubNavigateState => ({
    group_subNavState: state.group_subNavState, // store에서 가져올 상태를 매핑
});


// 초기상태
const initialState: Group_SubNavigationProps ={
    param:'',
    clickState:'',
    mode:'',
    screenHeightSize:185,
    screenWidthSize:ScrollMin_width,
}


const group_subNavigation = createSlice({
    name:'group_subNavigationState',
    initialState,
    reducers:{
        updateSubParam: (state, action :PayloadAction<{ param:string }>)=>{
            state.param = action.payload.param;
        },
        updateSubClickState: (state, action :PayloadAction<{ clickState:string }>)=>{
            state.clickState = action.payload.clickState;
        },
        updateSubScreenMode: (state, action :PayloadAction<{ mode:string }>)=>{
            state.mode = action.payload.mode
        },
        updateSubScreenHeightSize: (state, action :PayloadAction<{ screenHeightSize:number }>)=>{
            state.screenHeightSize = action.payload.screenHeightSize
        },
        updateSubScreenWidthSize: (state, action :PayloadAction<{ screenWidthSize:number }>)=>{
            state.screenWidthSize = action.payload.screenWidthSize
        },

    },
})


export const {updateSubClickState,updateSubScreenMode,updateSubScreenHeightSize,updateSubScreenWidthSize,updateSubParam} = group_subNavigation.actions;


export default group_subNavigation.reducer;