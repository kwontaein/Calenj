import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NavigationProps} from "./NavigatgionSlice";

interface Main_SubNavigationProps{
    clickState: string,
    friendParam : string,
}


// 초기상태
const initialState: Main_SubNavigationProps ={
    clickState:'calendar',
    friendParam:'',
}


const main_subNavigation = createSlice({
    name:'main_subNavigationState',
    initialState,
    reducers:{
        updateMainSubNavigation: (state, action :PayloadAction<{ clickState: string; friendParam?: string; }>)=>{
            state.clickState = action.payload.clickState;
            if(action.payload.friendParam!==undefined){
                state.friendParam = action.payload.friendParam;
            }
        },

    },
})


export const {updateMainSubNavigation} = main_subNavigation.actions;


export default main_subNavigation.reducer;