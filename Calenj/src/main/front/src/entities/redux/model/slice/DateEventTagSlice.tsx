import {NavigationProps} from "./NavigatgionSlice";
import {PointColor, PointColor2} from "../../../../shared/ui/SharedStyled";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface dynamicEventProps {
    [name:string]:{
        color:string,
        isClick:boolean,
    }
}
export interface DateEventTagProps {
    dynamicEventTag: dynamicEventProps,
}


// 초기상태
const initialState: DateEventTagProps ={
    dynamicEventTag:{
        "group":{
            color: PointColor2,
            isClick:true,
        },
        "user":{
            color:PointColor,
            isClick:true,
        }
    }
}





const eventTag = createSlice({
    name:'eventTag',
    initialState,
    reducers:{
        updateDateEventTag: (state, action :PayloadAction<{ name: string; color: string; }>)=>{
            state.dynamicEventTag = {
                ...state.dynamicEventTag,
                [action.payload.name]:{
                    color : action.payload.color,
                    isClick:true,
                }}
        },
        updateTagClickState: (state, action :PayloadAction<{ name: string; isClick:boolean }>)=>{
            state.dynamicEventTag[action.payload.name].isClick = action.payload.isClick;
        },

    },
})

export const {updateDateEventTag,updateTagClickState} = eventTag.actions;
export default eventTag.reducer;