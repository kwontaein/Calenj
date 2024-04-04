import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CompatClient} from '@stomp/stompjs';

export interface StompCompat {
    stompClient: CompatClient| null;
  }
  
  //userInfo 초기상태
  const initialState: StompCompat ={
    stompClient :null,
  }
  
  
  const stompConfig = createSlice({
    name:'stompClient',
    initialState,
    reducers:{
      saveStomp: (state, action :PayloadAction<{stompClient:CompatClient}>)=>{
        state.stompClient = action.payload.stompClient;
      },
  
    },
  })
  
  
  export const {saveStomp} = stompConfig.actions;
  
  
  export default stompConfig.reducer;