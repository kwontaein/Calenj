import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface MappingNameProps {
    [userId:string]:{
        userName:string,
    }
}

export interface RegisterUserNameState {
    userNameRegister: MappingNameProps,
}

// 초기상태
const initialState: RegisterUserNameState = {
    userNameRegister: {}
}




const userData = createSlice({
    name: 'mappingUserName',
    initialState,
    reducers: {
        registerUserName: (state, action: PayloadAction<{userId: string,userName: string }>) => {
            state.userNameRegister = {
                ...state.userNameRegister,
                [action.payload.userId]: {
                    userName: action.payload.userName,
                }
            }
        },
    },
})


export const {registerUserName} = userData.actions;
export default userData.reducer;