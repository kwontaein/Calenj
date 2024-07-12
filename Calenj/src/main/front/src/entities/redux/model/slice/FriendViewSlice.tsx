import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FriendViewState{
    viewState:string,
}

const initialState: FriendViewState = {
    viewState :'online'
}

const friendViewState = createSlice({
    name : 'friendViewState',
    initialState,
    reducers :{
        updateViewState: (state, action :PayloadAction<{ viewState:string }>)=>{
            state.viewState = action.payload.viewState;
        },
    }
})



export const {updateViewState} = friendViewState.actions


export default friendViewState.reducer;