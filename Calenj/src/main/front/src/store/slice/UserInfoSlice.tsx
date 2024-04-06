import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserInfo {
    userId: string;
    isOnline:boolean;
  }
  
  //userInfo 초기상태
  const initialState: UserInfo ={
    userId :'',
    isOnline:false,
  }
  
  
  const userInfo = createSlice({
    name:'userInfo',
    initialState,
    reducers:{
      saveInfo: (state, action :PayloadAction<{userId:string}>)=>{
        state.userId = action.payload.userId;
        state.isOnline = true;
      },
      deleteUserInfo :(state)=>{
        state.userId='';
        state.isOnline = false;
      },
  
    },
  })
  
  
  export const {saveInfo, deleteUserInfo} = userInfo.actions;
  
  
  export default userInfo.reducer;