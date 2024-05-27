import {
    updateCodeValid
} from '../../../../store/slice/EmailValidationSlice';
import {useCodeValid} from '../model/useCodeValide'
import { useDispatch} from "react-redux";
import {CheckCodeValid_Button} from "./CheckAuthButtonStyled";
import {codeValidProps} from "../model/types";



export const CheckEmailAuthButton :React.FC <codeValidProps> = ({email, code, onClose}) =>{
    const dispatch = useDispatch()
    const updateValidState = () =>{
        dispatch(updateCodeValid(true));
        onClose();
    }

    return (
        <CheckCodeValid_Button onClick={()=>{useCodeValid(code,email,updateValidState)}}>
            확인
        </CheckCodeValid_Button>
    )
}
