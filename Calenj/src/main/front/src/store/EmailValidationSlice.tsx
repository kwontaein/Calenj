import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface EmailToken {
  tokenId: string;
  validateTime: number;
  codeValid: boolean;
}
//사전에 interface를 지정하여 emailToken을 정의한다.
//RootState를 통한 전체 State를 useSelecter를 통해 가져올 수 있지만 RootState의 의존하므로 State가 어디에 사용되는지 명확히 알 수 없다.
//State의 구조가 변경될 시 인터페이스도 같이 수정해야한다.

  
 




//EmailTokenState 초기상태
const initialState: EmailToken ={
  tokenId :'',
  validateTime:0,
  codeValid:false,
}


const emailValidation = createSlice({
  name:'emailToken',
  initialState,
  reducers:{
    updateToken: (state, action :PayloadAction<{tokenId:string; validateTime: number}>)=>{
      state.tokenId = action.payload.tokenId;
      state.validateTime = action.payload.validateTime;
    },
    updateCodeValid :(state, action :PayloadAction<boolean>)=>{
      state.codeValid = action.payload;
    },

  },
})








export const {updateCodeValid, updateToken} = emailValidation.actions;


export default emailValidation.reducer;