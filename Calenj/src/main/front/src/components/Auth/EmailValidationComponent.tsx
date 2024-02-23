import {Input, Button, ErrorMessage,FormLable} from '../../style/FormStyle';
import {ChangeEvent, useEffect, useState} from 'react';
import axios, {Axios, AxiosResponse} from 'axios';
import { connect } from "react-redux";
import {EmailToken, updateTime, updateCodeValid} from '../../store/EmailValidationSlice';
import {RootState, AppDispatch} from'../../store/store'
import '../../style/Sign.scss'
import { Dispatch } from 'redux';



//상위 컴포넌트의 props
interface ComponentProps {
    email:string; 
}
 
// store에서 가져올 state의 타입(EmailToken)
interface EmailToeknProps {
    emailToken: EmailToken; 
}

//dispatch 함수타입을 interface로 정의
interface DispatchProps {
    updateTime: (payload: { tokenID: string; validateTime: Date }) => void;
    updateCodeValid: (payload: boolean) => void;
}





//(Component Props로 전달하기 위한 interface)

const mapStateToProps = (state: EmailToeknProps): EmailToeknProps => ({
    emailToken: state.emailToken, // store에서 가져올 상태를 매핑
});

//emailToken 정보를 수정하는 함수 정의 후 connect
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    updateTime: (payload: { tokenID: string; validateTime: Date }) => dispatch(updateTime(payload)),
    updateCodeValid: (payload: boolean) => dispatch(updateCodeValid(payload)),
});

type Props = ComponentProps & DispatchProps & EmailToeknProps;

const EmailValidationComponent : React.FC<Props> = ({email,emailToken,updateTime,updateCodeValid})=>{
    const [code, setCode] = useState<string>('');
    const [isValid,setIsValid] = useState<boolean>(false);

    


    const codeRequest = async (): Promise<void> => {
        try {
            const response = await axios.post('api/emailCodeValidation', null, {
                params: {
                    validationCode: code,
                    email : email
                },
            });
            

            console.log(response.data)
            if(response.data===100){
                window.alert("인증코드를 입력해주세요.")
            }
            else if(response.data===200){
                window.alert("인증에 성공하였습니다.")
            }else if(response.data===500){
                window.alert("인증코드가 일치하지 않습니다.")
            }else if(response.data ===300){
                window.alert("인증 시간이 만료되었습니다. 인증번호를 재발급해주세요.")
            }
        } catch (error) {
            console.error(error);
        }
    }


    //재랜더링 시 이메일 인증을 초기화
    useEffect(()=>{
        setIsValid(false);
    },[])
    



    //Redux는 클라이언트 측의 상태 관리 라이브러리이므로 백에서 토큰관리로 철저히 관리해야됨.
    //보안적인 토큰 사용: Redux 애플리케이션에서 중요한 상태를 변경할 때 사용자 인증을 확인

    return(
        <div>
            <FormLable>{!isValid && "이메일 인증을 해주세요"}</FormLable>
            <br></br>
            <FormLable>이메일로 전송된 인증코드를 입력해주세요.</FormLable>
            <br/>
            <div>{email} 로 인증요청</div>
            <Input type ="text "onChange={(e:ChangeEvent<HTMLInputElement>)=>setCode(e.target.value)}></Input>
            <ErrorMessage></ErrorMessage>
               
                 
                <div id="btn_emailCodeValidation" onClick={codeRequest} > 확인</div>
                <div>
                </div>

                
        </div>
    );
}


export default connect(mapStateToProps,mapDispatchToProps) (EmailValidationComponent)