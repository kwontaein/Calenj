import {
    Input,
    FormLable,
    ThemeColor2,
    Modal_Condition_Button,
    RowFlexBox,
    ThemeColor3
} from '../../../../shared/ui/SharedStyled';
import {ChangeEvent, useEffect, useState} from 'react';
import './Sign.scss'
import {ComponentProps} from "../model/types";
import {closeEmailValidModal} from '../model/closeEmailValidModal';
import {CodeValidTime} from "./CodeValidTime";
import {CheckEmailAuthButton} from './CheckEmailAuthButton'
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";

export const EmailValidationModal: React.FC<ComponentProps> = ({email, onClose}) => {
    const [code, setCode] = useState<string>('');
    const closeModal = closeEmailValidModal(onClose);
    const {codeValid} = useSelector((state: RootState) => state.emailValidation); // emailToken 상태 선택

    useEffect(() => {
        if (codeValid) {
            onClose()
        }
    }, [codeValid]);

    return (
        <div id='emailValidation_Box' style={{backgroundColor: `${ThemeColor2}`}}>
            <RowFlexBox style={{justifyContent:'space-between'}}>
                <FormLable style={{marginLeft: '8px'}}>이메일로 전송된 인증코드를 입력해주세요.</FormLable>
                <Modal_Condition_Button style={{width:'15px', height:'15px', backgroundColor:ThemeColor3}} id="btn_cancleValid" onClick={closeModal}>
                    x
                </Modal_Condition_Button>
            </RowFlexBox>
            <br></br>
            <div style={{fontSize: "15px", marginTop: "3px", marginLeft: "10px"}}>{email}로 인증요청함</div>

            <CodeValidTime onClose={onClose}/>
            <Input maxLength={10}
                   type="text "
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}>
            </Input>
            <CheckEmailAuthButton email={email} code={code} onClose={onClose}/>
        </div>
    );
}