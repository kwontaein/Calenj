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
    showMemberList:boolean,
}
interface Main_SubNavigationProps{
    clickState: string,
    friendParam : string,
}


export interface SubNavigateState{
    group_subNavState:Group_SubNavigationProps;
    main_subNavState: Main_SubNavigationProps;
}




// 초기상태
const initialState: SubNavigateState ={
   group_subNavState : {
       param:'',
       clickState:'',
       mode:'',
       screenHeightSize:185,
       screenWidthSize:ScrollMin_width,
       showMemberList:false,
   },
    main_subNavState :{
        clickState:'calendar',
        friendParam:'',
    }
}


const subNavigation = createSlice({
    name:'group_subNavigationState',
    initialState,
    reducers:{
        updateGroupSubParam: (state, action :PayloadAction<{ param:string }>)=>{
            state.group_subNavState.param = action.payload.param;
        },
        updateGroupSubClickState: (state, action :PayloadAction<{ clickState:string }>)=>{
            state.group_subNavState.clickState = action.payload.clickState;
        },
        updateGroupSubScreenMode: (state, action :PayloadAction<{ mode:string }>)=>{
            state.group_subNavState.mode = action.payload.mode
        },
        updateGroupSubScreenHeightSize: (state, action :PayloadAction<{ screenHeightSize:number }>)=>{
            state.group_subNavState.screenHeightSize = action.payload.screenHeightSize
        },
        updateGroupSubScreenWidthSize: (state, action :PayloadAction<{ screenWidthSize:number }>)=>{
            state.group_subNavState.screenWidthSize = action.payload.screenWidthSize
        },
        updateGroupShowMemberList: (state)=>{
            state.group_subNavState.showMemberList = !state.group_subNavState.showMemberList
        },
        updateMainSubNavigation: (state, action :PayloadAction<{ clickState: string; friendParam?: string; }>)=>{
            state.main_subNavState.clickState = action.payload.clickState;
            if(action.payload.friendParam!==undefined){
                state.main_subNavState.friendParam = action.payload.friendParam;
            }
        },
    },
})


export const {updateGroupSubParam,
            updateGroupSubClickState,
            updateGroupSubScreenMode,
            updateGroupSubScreenHeightSize,
            updateGroupSubScreenWidthSize,
            updateGroupShowMemberList,
            updateMainSubNavigation} = subNavigation.actions;


export default subNavigation.reducer;