import {Input, Button, ErrorMessage,FormLable} from '../../style/FormStyle';
import {ChangeEvent, useEffect, useState} from 'react';
import axios, {Axios, AxiosResponse} from 'axios';
import { connect } from "react-redux";
import { updateTime, checkToken} from '../../store/EmailValidationSlice';
import '../../style/sign.scss'
interface EmailValidationComponentProps {
    email: string;
}

const EmailValidationComponent : React.FC<EmailValidationComponentProps> = (props)=>{
    const [code, setCode] = useState<string>('');


    const codeRequest = async (): Promise<void> => {
        try {
            const response = await axios.post('api/emailCodeValidation', null, {
                params: {
                    validationCode: code,
                    email : props.email
                },
            });


            console.log(response.data); // 업데이트된 값을 출력
        } catch (error) {
            console.error(error);
        }
    }
    



    //Redux는 클라이언트 측의 상태 관리 라이브러리이므로 백에서 토큰관리로 철저히 관리해야됨.
    //보안적인 토큰 사용: Redux 애플리케이션에서 중요한 상태를 변경할 때 사용자 인증을 확인

    return(
        <div>
            
            <FormLable>이메일로 전송된 인증코드를 입력해주세요.</FormLable>
            <br/>
            <div>{props.email} 로 인증요청</div>
            <Input type ="text "onChange={(e:ChangeEvent<HTMLInputElement>)=>setCode(e.target.value)}></Input>
            <ErrorMessage></ErrorMessage>
               
                 
                <div id="btn_emailCodeValidation" onClick={codeRequest} > 확인</div>
                <div>
                </div>

                
        </div>
    );
}
export default EmailValidationComponent;
// function mapStateToProps(state){
//     return{validateInfo:state}
// }
// function mapDispatchTProps(dispatch){
//     return{
//         updateToken:(text)=> dispatch(updateTime(text))
        
//     }
// }

// export default connect(mapStateToProps,mapDispatchTProps) (EmailValidationComponent)