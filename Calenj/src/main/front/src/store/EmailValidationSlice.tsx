import {createSlice} from "@reduxjs/toolkit";



const initialState ={token :'', validateTime:''}


const emailValidation = createSlice({
  name:'ValidationReducer',
  initialState,
  reducers:{
    checkToken : (state, action)=>{
      state.token = action.payload;
    },
    updateTime: (state, action)=>{
      state.validateTime = action.payload;
    }
  }
})



export const {checkToken, updateTime} = emailValidation.actions;


export default emailValidation.reducer;