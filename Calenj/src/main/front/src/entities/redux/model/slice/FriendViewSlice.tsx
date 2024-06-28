import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface FriendViewProps{
    viewState:string,
}

const initialState: FriendViewProps = {
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