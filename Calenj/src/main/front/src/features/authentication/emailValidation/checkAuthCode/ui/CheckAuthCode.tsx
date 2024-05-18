import { DispatchEmailProps,mapDispatchToEmailProps} from '../../../../../store/slice/EmailValidationSlice';
import {useCodeValid} from '../model/useCodeValide'
import {connect} from "react-redux";
import {CheckCodeValid_Button} from "./CheckAuthCodeStyled";

interface codeValidProps{
    email:string,
    code: string,
    onClose:()=>void,
}

const CheckAuthCode :React.FC<DispatchEmailProps & codeValidProps> = ({email, code, onClose, updateCodeValid, }) =>{
    const updateValidState = () =>{
        updateCodeValid(true);
        onClose();
    }

    return (
        <CheckCodeValid_Button onClick={()=>{useCodeValid(code,email,updateValidState)}}>
            확인
        </CheckCodeValid_Button>
    )
}
export const CheckEamilAuthCode = connect(null,mapDispatchToEmailProps)(CheckAuthCode)