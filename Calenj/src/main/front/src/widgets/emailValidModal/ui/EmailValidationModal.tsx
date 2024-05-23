import {Input, FormLable} from '../../../style/FormStyle';
import {ChangeEvent, useState} from 'react';
import '../../../style/Sign.scss'
import {ComponentProps} from "../../../features/authentication/emailValidation/codeValidTime/model/types";
import {closeEmailValidModal} from "../../../features/authentication/emailValidation/requestEmailCode";
import {CodeValidTimer} from "../../../features/authentication/emailValidation/codeValidTime";
import {CheckEamilAuthCode} from "../../../features/authentication/emailValidation/checkAuthCode";
//상위 컴포넌트의 props




export const EmailValidationModal: React.FC<ComponentProps> = ({email,onClose}) => {
    const [code, setCode] = useState<string>('');
    const closeModal = closeEmailValidModal(onClose);

    return (
        <div id='emailValidation_Box'>
            <div>
                <FormLable style={{marginLeft:'8px'}}>이메일로 전송된 인증코드를 입력해주세요.</FormLable>
                <button id="btn_cancleValid" onClick={closeModal}>x</button>
            </div>
            <br></br>
            <div style={{fontSize:"15px", marginTop:"3px", marginLeft:"10px"}}>{email}로 인증요청함</div>

            <CodeValidTimer/>
            <Input maxLength={10}
                   type="text "
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}>
            </Input>
            <CheckEamilAuthCode email={email} code={code} onClose={onClose}/>
        </div>
    );
}