import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface InputSizeState{
    inputSize :number,
    inputMaxSize:number
}

const initialState : InputSizeState = {
    inputSize : 60,
    inputMaxSize: 500,
}

export const MessageInputSize = createSlice({
    name :'MessageInputSize',
    initialState,
    reducers:{
        updateInputSize: (state, action: PayloadAction<{ inputSize: number }>) => {
            state.inputSize = action.payload.inputSize;
        },
        updateInputMaxSize: (state, action: PayloadAction<{ inputMaxSize: number }>) => {
            state.inputMaxSize = action.payload.inputMaxSize;
        },

    }
})

export const {updateInputSize, updateInputMaxSize} = MessageInputSize.actions
export default MessageInputSize.reducer;