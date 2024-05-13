import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from '../store'
import {Dispatch} from 'redux';
import {bool} from "yup";


export interface BoardOptionProps{
    search_keyWord:string,
    filter_setting : {
        filterA:Boardfilter,
        filterB:Boardfilter,
    },
    clickState:string,
}

interface Boardfilter {
    isCheck:boolean,
    toggleState:boolean
}
export interface BoardOptionState{
    boardOption:BoardOptionProps,
}

export interface DispatchBoardOptionProps {
    updateBoardSearch : (payload:{search_keyWord:string}) => void,
    updateBoardFilter : (payload:{filterA:Boardfilter, filterB:Boardfilter}) => void,
    updateClickState : (payload:{clickState:string}) => void,
}

export const mapDispatchToBoardOptionProps = (dispatch: Dispatch): DispatchBoardOptionProps => ({
    updateBoardSearch : (payload:{search_keyWord:string}) => dispatch(updateBoardSearch(payload)),
    updateBoardFilter : (payload:{filterA:Boardfilter, filterB:Boardfilter}) => dispatch(updateBoardFilter(payload)),
    updateClickState : (payload:{clickState:string})  => dispatch(updateClickState(payload)),
});

export const mapStateToBoardOptionProps = (state: RootState): BoardOptionState => ({
    boardOption: state.boardOption, // store에서 가져올 상태를 매핑
});



// 초기상태
const initialState: BoardOptionProps ={
    search_keyWord:'',
    filter_setting:{
        filterA:{
            isCheck:false,
            toggleState:false,
        },
        filterB:{
            isCheck:false,
            toggleState:false,
        }
    },
    clickState:'',
}


const boardOption = createSlice({
    name:'boardOption',
    initialState,
    reducers:{
        updateBoardSearch: (state, action :PayloadAction<{ search_keyWord:string }>)=>{
            state.search_keyWord = action.payload.search_keyWord;
        },
        updateBoardFilter: (state, action :PayloadAction<{ filterA:Boardfilter, filterB:Boardfilter }>)=>{
            state.filter_setting.filterA = action.payload.filterA;
            state.filter_setting.filterB = action.payload.filterB;
        },
        updateClickState: (state, action :PayloadAction<{ clickState :string}>)=>{
            state.clickState = action.payload.clickState;

        },
    },
})

export const {updateBoardSearch,  updateBoardFilter, updateClickState} = boardOption.actions;

export default boardOption.reducer;