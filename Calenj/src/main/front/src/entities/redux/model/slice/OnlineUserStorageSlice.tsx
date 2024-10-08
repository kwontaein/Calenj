import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface OnlineUserList {
    [key:string]:{
        userList: string[]
    }
}

interface OnlineListStorage {
    group:OnlineUserList,
    friend:OnlineUserList,
}


// 초기상태
const initialState: OnlineListStorage = {
    group: {},
    friend:{},
}

const OnlineList = createSlice({
    name:'onlineList',
    initialState,
    reducers:{
        createFriendOnline: (state, action: PayloadAction<{ personalKey: string}>) => {
            state.friend={
                ...state.friend,
                [action.payload.personalKey]:{
                    userList : [],
                }
            }
        },
        updateGroupOnlineUserList: (state, action: PayloadAction<{ groupKey: string, onlineList: string[] }>) => {
            state.group={
                ...state.group,
                [action.payload.groupKey]:{
                    userList : action.payload.onlineList,
                }
            }
        },
        updateFriendOnline: (state, action: PayloadAction<{ personalKey: string, userParam: string }>) => {
            if(!state.friend[action.payload.personalKey].userList.includes(action.payload.userParam)){
                state.friend={
                    ...state.friend,
                    [action.payload.personalKey]:{
                        userList :[...state.friend[action.payload.personalKey].userList, action.payload.userParam],
                    }
                }
            }
        },
        updateFriendOffline:(state, action : PayloadAction<{ personalKey: string, offlineUser: string }>) =>{
            state.friend={
                ...state.friend,
                [action.payload.personalKey]:{
                    userList : state.friend[action.payload.personalKey].userList.filter((userParam)=> userParam!== action.payload.offlineUser)
                }
            }
        },
    }
})


export const { createFriendOnline, updateGroupOnlineUserList, updateFriendOnline, updateFriendOffline } =OnlineList.actions;

export default OnlineList.reducer;