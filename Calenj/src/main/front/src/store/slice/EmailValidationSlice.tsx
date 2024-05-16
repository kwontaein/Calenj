import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from '../../store/store'
import {Dispatch} from 'redux';

export interface EmailTokenState {
  tokenId: string;
  validateTime: number;
  codeValid: boolean;
}


// store에서 가져올 state의 타입(EmailToken)
export interface EmailToeknProps {
  emailToken: EmailTokenState;
}

//사전에 interface를 지정하여 emailToken을 정의한다.
//RootState를 통한 전체 State를 useSelecter를 통해 가져올 수 있지만 RootState의 의존하므로 State가 어디에 사용되는지 명확히 알 수 없다.
//State의 구조가 변경될 시 인터페이스도 같이 수정해야한다.


//dispatch 함수타입을 interface로 정의
export interface DispatchEmailProps {
  updateToken: (payload: { tokenId: string; validateTime: number }) => void;
  updateCodeValid: (payload: boolean) => void;
}

//(Component Props로 전달하기 위한 interface)
export const mapStateToEmailProps = (state: RootState): EmailToeknProps => ({
  emailToken: state.emailValidation, // store에서 가져올 상태를 매핑
});

//emailToken 정보를 수정하는 함수 정의 후 connect
export const mapDispatchToEmailProps = (dispatch: Dispatch): DispatchEmailProps => ({
  updateToken: (payload: { tokenId: string; validateTime: number }) => dispatch(updateToken(payload)),
  updateCodeValid: (payload: boolean) => dispatch(updateCodeValid(payload)),
});



//EmailTokenState 초기상태
const initialState: EmailTokenState ={
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