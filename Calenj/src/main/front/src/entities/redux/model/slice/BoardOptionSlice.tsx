import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from 'redux';
import {bool} from "yup";
import {RootState} from "../types";


export interface BoardOptionProps{
    search_keyWord:string,
    filter_setting : {
        filterA:BoardFilter,
        filterB:BoardFilter,
    },
    clickState:string,
    noticeParam:string,
    voteParam:string,
}

interface BoardFilter {
    isChecked:boolean,
    toggleState:boolean
}
export interface BoardOptionState{
    boardOption:BoardOptionProps,
}

// 초기상태
const initialState: BoardOptionProps ={
    search_keyWord:'',
    filter_setting:{
        filterA:{
            isChecked:false,
            toggleState:false,
        },
        filterB:{
            isChecked:false,
            toggleState:false,
        }
    },
    clickState:'',
    noticeParam:'',
    voteParam:'',
}


const boardOption = createSlice({
    name:'boardOption',
    initialState,
    reducers:{
        updateBoardSearch: (state, action :PayloadAction<{ search_keyWord:string }>)=>{
            state.search_keyWord = action.payload.search_keyWord;
        },
        updateBoardFilter: (state, action :PayloadAction<{ filterA:BoardFilter, filterB:BoardFilter }>)=>{
            state.filter_setting.filterA = action.payload.filterA;
            state.filter_setting.filterB = action.payload.filterB;
        },
        updateClickState: (state, action :PayloadAction<{ clickState :string}>)=>{
            state.clickState = action.payload.clickState;
        },
        updateBoardParam: (state, action :PayloadAction<{ noticeParam? :string, voteParam?:string}>)=>{
            if(action.payload.noticeParam!==undefined){
                state.noticeParam = action.payload.noticeParam;
            }
            if(action.payload.voteParam!==undefined){
                state.voteParam = action.payload.voteParam;
            }

        },
    },
})

export const {updateBoardSearch,  updateBoardFilter, updateClickState, updateBoardParam} = boardOption.actions;

export default boardOption.reducer;