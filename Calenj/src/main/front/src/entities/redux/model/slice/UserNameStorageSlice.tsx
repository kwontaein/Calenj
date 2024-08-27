import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface MappingNameProps {
    [userId:string]:{
        userName:string,
    }
}
interface MappingFriendId {
    [chatRoomId:string]:{
        friendUserId:string,
    }
}

export interface UserNameMapState {
    userNameStorage: MappingNameProps,
    friendIdStorage :MappingFriendId,
}

// 초기상태
const initialState: UserNameMapState = {
    userNameStorage: {},
    friendIdStorage:{}
}




const userData = createSlice({
    name: 'mappingUserName',
    initialState,
    reducers: {
        saveUserName: (state, action: PayloadAction<{ userId: string, userName: string }>) => {
            state.userNameStorage = {
                ...state.userNameStorage,
                [action.payload.userId]: {
                    userName: action.payload.userName,
                }
            }
        },
        saveFriendIdByChatRoomId: (state, action: PayloadAction<{ chatRoomId: string, friendUserId: string }>) => {
            state.friendIdStorage = {
                ...state.friendIdStorage,
                [action.payload.chatRoomId]: {
                    friendUserId: action.payload.friendUserId,
                }
            }
        },
    }
})


export const {saveUserName, saveFriendIdByChatRoomId} = userData.actions;
export default userData.reducer;