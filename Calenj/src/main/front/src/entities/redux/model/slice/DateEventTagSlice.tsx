import {NavigationProps} from "./NavigatgionSlice";
import {PointColor, PointColor2} from "../../../../shared/ui/SharedStyled";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";



export interface dynamicEventProps {
    [tagId: string]: {
        name: string,
        color: string,
        isClick: boolean,
        defaultTag: boolean,
    }
}

export interface DateEventTagProps {
    dynamicEventTag: dynamicEventProps,
}

// 초기상태
const initialState: DateEventTagProps = {
    dynamicEventTag: {}
}


const eventTag = createSlice({
    name: 'eventTag',
    initialState,
    reducers: {
        createDateEventTag: (state, action: PayloadAction<{
            tagId: string,
            name: string,
            color: string,
            defaultTag: boolean
        }>) => {
            state.dynamicEventTag = {
                ...state.dynamicEventTag,
                [action.payload.tagId]: {
                    name: action.payload.name,
                    color: action.payload.color,
                    isClick: true,
                    defaultTag: action.payload.defaultTag,
                }
            }
        },
        updateTagClickState: (state, action: PayloadAction<{ tagId: string, isClick: boolean }>) => {
            if (state.dynamicEventTag[action.payload.tagId]) {
                state.dynamicEventTag[action.payload.tagId].isClick = action.payload.isClick;
            }
        },
        updateTagColor: (state, action: PayloadAction<{ tagId: string; color: string; }>) => {
            if (state.dynamicEventTag[action.payload.tagId]) {
                state.dynamicEventTag[action.payload.tagId].color = action.payload.color;
            }
        }
    },
})

export const {createDateEventTag, updateTagClickState, updateTagColor} = eventTag.actions;
export default eventTag.reducer;