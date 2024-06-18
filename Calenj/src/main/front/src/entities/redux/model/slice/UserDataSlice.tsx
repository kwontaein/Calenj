import {dynamicEventProps} from "./DateEventTagSlice";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserDataProps {
    [userId:string]:{
        userName:string,
    }
}



export interface UserDataState {
    userData: UserDataProps,
}

// 초기상태
const initialState: UserDataState = {
    userData: {}
}




const userData = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        userDataPush: (state, action: PayloadAction<{userId: string,userName: string }>) => {
            state.userData = {
                ...state.userData,
                [action.payload.userId]: {
                    userName: action.payload.userName,
                }
            }
        },
    },
})


export const {userDataPush} = userData.actions;
export default userData.reducer;