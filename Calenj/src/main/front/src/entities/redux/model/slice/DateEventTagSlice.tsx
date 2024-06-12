import {NavigationProps} from "./NavigatgionSlice";
import {PointColor, PointColor2} from "../../../../shared/ui/SharedStyled";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface EventTagDTO {
    id:string,
    name:string,
    color:string,
    defaultTag: boolean, //기본 태그여부
}

export interface dynamicEventProps {
    [tagId:string]:{
        name:string,
        color:string,
        isClick:boolean,
        defaultTag: boolean,
    }
}
export interface DateEventTagProps {
    dynamicEventTag: dynamicEventProps,
}

export const defaultTagArr = ["그룹 일정","개인 일정"]


// 초기상태
const initialState: DateEventTagProps ={
    dynamicEventTag:{
        [defaultTagArr[0]]:{
            name: "그룹 일정",
            color: PointColor2,
            isClick:true,
            defaultTag: true,
        },
        [defaultTagArr[1]]:{
            name:"개인 일정",
            color:PointColor,
            isClick:true,
            defaultTag: true,
        }
    }
}





const eventTag = createSlice({
    name:'eventTag',
    initialState,
    reducers:{
        createDateEventTag: (state, action :PayloadAction<{ tagId:string , name: string, color: string, defaultTag :boolean }>)=>{
            state.dynamicEventTag = {
                ...state.dynamicEventTag,
                [action.payload.tagId]:{
                    name :action.payload.name,
                    color : action.payload.color,
                    isClick:true,
                    defaultTag: action.payload.defaultTag,
                }}
        },
        updateTagClickState: (state, action :PayloadAction<{ tagId:string, isClick:boolean }>)=>{
            if(state.dynamicEventTag[action.payload.tagId]) {
                state.dynamicEventTag[action.payload.tagId].isClick = action.payload.isClick;
            }
        },
        updateTagColor: (state, action :PayloadAction<{ tagId: string; color: string; }>)=>{
            if(state.dynamicEventTag[action.payload.tagId]){
                state.dynamicEventTag[action.payload.tagId].color = action.payload.color;
            }
        }
    },
})

export const {createDateEventTag,updateTagClickState,updateTagColor} = eventTag.actions;
export default eventTag.reducer;