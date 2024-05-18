import {Input, ErrorMessage, FormLable} from '../../../../style/FormStyle';
import {ChangeEvent, useState} from 'react';
import { DispatchEmailProps,mapStateToEmailProps,mapDispatchToEmailProps} from '../../../../store/slice/EmailValidationSlice';
import '../../../../style/Sign.scss'
import {connect} from "react-redux";
import {ComponentProps, EmailToeknProps} from "../model/types"
import {useEmailValidateHandler} from "../model/useEmailValidateHandler"
import {checkEmailCodeApi} from "../api/checkEmailCodeApi"
import {useValidateCountDown} from "../model/useValidateCountDown";
//상위 컴포넌트의 props


type Props = ComponentProps & DispatchEmailProps & EmailToeknProps;

const EmailValidation: React.FC<Props> = ({email, emailToken,updateCodeValid,onClose}) => {
    const [code, setCode] = useState<string>('');
    const [minutes, seconds] = useValidateCountDown(emailToken)
    const closeValidation = useEmailValidateHandler(minutes,seconds,onClose)


    const validationCode = ()=>{
        checkEmailCodeApi(code,email,onClose).then((res)=>{
            if (res === 100) {
                window.alert("인증코드를 입력해주세요.")
            } else if (res === 200) {
                window.alert("인증이 완료되었습니다.")
                updateCodeValid(true);
                onClose();
            } else if (res === 500) {
                window.alert("인증코드가 일치하지 않습니다.")
            } else if (res === 300) {
                window.alert("인증 시간이 만료되었습니다. 인증번호를 재발급해주세요.")
            }
        })
    }


    return (
        <div id='emailValidation_Box'>
            <div>
                <FormLable style={{marginLeft:'8px'}}>이메일로 전송된 인증코드를 입력해주세요.</FormLable>
                <button id="btn_cancleValid" onClick={closeValidation}>x</button>
            </div>
            <br></br>
            <div style={{fontSize:"15px", marginTop:"3px", marginLeft:"10px"}}>{email}로 인증요청함</div>

            <ErrorMessage>{(minutes === 0 && seconds === 0) ?
                "인증시간이 만료되었습니다." :
                `남은 시간 : ${minutes}분${seconds.toString().padStart(2,'0')}초`}
            </ErrorMessage>

            <Input maxLength={10}
                   type="text "
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}>
            </Input>
            <div id="btn_emailCodeValidation"
                 onClick={validationCode}>
                확인
            </div>
        </div>
    );
}
export const EmailValidationModal = connect(mapStateToEmailProps, mapDispatchToEmailProps)(EmailValidation)