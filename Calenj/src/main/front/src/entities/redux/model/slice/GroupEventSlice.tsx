import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CreateEventProps{
    title:string,
    stateDate:string,
    endDate:string,
    createDate:string,
}

type eventState = 'create'|'mutation'|'';
interface GroupEventState{
    optionState:eventState,
    createState:CreateEventProps,
}

const initialState : GroupEventState ={
    optionState: '',
    createState:{
        title:'',
        stateDate:'',
        endDate:'',
        createDate:'',
    }
}


const groupEventState = createSlice({
    name:'groupEventSlice',
    initialState,
    reducers:{
        updateOptionState: (state, action:PayloadAction<eventState>) => {
            state.optionState = action.payload;
        },

    }
})