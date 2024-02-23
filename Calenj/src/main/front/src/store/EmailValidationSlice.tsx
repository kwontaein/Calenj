import {createSlice, PayloadAction} from "@reduxjs/toolkit";



export interface EmailToken {
  tokenID: string;
  validateTime: Date;
  codeValid: boolean;
}
//사전에 interface를 지정하여 emailToken을 정의한다.
//RootState를 통한 전체 State를 useSelecter를 통해 가져올 수 있지만 RootState의 의존하므로 State가 어디에 사용되는지 명확히 알 수 없다.
//State의 구조가 변경될 시 인터페이스도 같이 수정해야한다.

  
export enum ActionType {
  UPDATE_TOKEN = 'UPDATE_TOKEN',
  UPDATE_TIME = 'UPDATE_TIME',
  CODE_VALID = 'CODE_VALID',
}


const initialState: EmailToken ={
  tokenID :'',
  validateTime: new Date(),
  codeValid:false,
}


const emailValidation = createSlice({
  name:'emailToken',
  initialState,
  reducers:{
    updateTime: (state, action :PayloadAction<{tokenID:string; validateTime: Date}>)=>{
      state.tokenID = action.payload.tokenID;
      state.validateTime = action.payload.validateTime;
    },
    updateCodeValid :(state, action :PayloadAction<boolean>)=>{
      state.codeValid = action.payload;
    }
  }
})



export const {updateCodeValid, updateTime} = emailValidation.actions;


export default emailValidation.reducer;