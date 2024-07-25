import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface GroupScheduleState{
    scheduleId:string,
    scheduleTitle:string,
    mapModal:boolean,
}

const initialState:GroupScheduleState={
    scheduleId:'',
    scheduleTitle:'',
    mapModal:true,
}

const groupScheduleState = createSlice({
    name:'groupSchedule',
    initialState,
    reducers :{
        updateScheduleState: (state, action :PayloadAction<{ scheduleId:string , scheduleTitle:string, mapModal?:boolean}>)=>{
            state.scheduleId = action.payload.scheduleId;
            state.scheduleTitle = action.payload.scheduleTitle;
            if(action.payload.mapModal){
                state.mapModal = action.payload.mapModal;
            }
        },
        updateMapModal :(state)=>{
            state.mapModal = !state.mapModal
        }


    }
})

export const {updateScheduleState,updateMapModal} = groupScheduleState.actions

export default groupScheduleState.reducer