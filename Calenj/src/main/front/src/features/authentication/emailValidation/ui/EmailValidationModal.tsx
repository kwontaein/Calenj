import {Input, FormLable} from '../../../../style/FormStyle';
import {ChangeEvent, useState} from 'react';
import '../../../../style/Sign.scss'
import {ComponentProps} from "../model/types";
import {closeEmailValidModal} from '../model/closeEmailValidModal';
import {CodeValidTime} from "./CodeValidTime";
import {CheckEmailAuthButton} from './CheckEmailAuthButton'

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

            <CodeValidTime/>
            <Input maxLength={10}
                   type="text "
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}>
            </Input>
            <CheckEmailAuthButton email={email} code={code} onClose={onClose}/>
        </div>
    );
}