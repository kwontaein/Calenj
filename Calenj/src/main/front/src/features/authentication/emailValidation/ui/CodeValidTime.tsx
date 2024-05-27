import {ErrorMessage} from "../../../../style/FormStyle";
import {useValidCountDown} from "../model/useValidCountDown";


export const CodeValidTime: React.FC = ()=>{
    const [minutes, seconds] = useValidCountDown()

    return(
        <ErrorMessage>{(minutes === 0 && seconds === 0) ?
            "인증시간이 만료되었습니다." :
            `남은 시간 : ${minutes}분${seconds.toString().padStart(2,'0')}초`}
        </ErrorMessage>
    )
}

