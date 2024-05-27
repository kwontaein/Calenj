import {ErrorMessage} from "../../../../../style/FormStyle";
import {useValidCountDown} from "../model/useValidCountDown";
import { EmailToeknProps, mapStateToEmailProps} from '../../../../../store/slice/EmailValidationSlice';
import {connect} from "react-redux";

export const CodeValidTime: React.FC<EmailToeknProps> = ({emailToken})=>{
    const [minutes, seconds] = useValidCountDown(emailToken)

    return(
        <ErrorMessage>{(minutes === 0 && seconds === 0) ?
            "인증시간이 만료되었습니다." :
            `남은 시간 : ${minutes}분${seconds.toString().padStart(2,'0')}초`}
        </ErrorMessage>
    )
}

export const CodeValidTimer = connect(mapStateToEmailProps,null) (CodeValidTime)