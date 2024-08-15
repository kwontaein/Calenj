import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface MappingNameProps {
    [userId:string]:{
        userName:string,
    }
}

export interface UserNameMapState {
    userNameStorage: MappingNameProps,
}

// 초기상태
const initialState: UserNameMapState = {
    userNameStorage: {}
}




const userData = createSlice({
    name: 'mappingUserName',
    initialState,
    reducers: {
        saveUserName: (state, action: PayloadAction<{userId: string,userName: string }>) => {
            state.userNameStorage = {
                ...state.userNameStorage,
                [action.payload.userId]: {
                    userName: action.payload.userName,
                }
            }
        },
    },
})


export const {saveUserName} = userData.actions;
export default userData.reducer;