import {ErrorMessage} from "../../../../shared/ui/SharedStyled";
import {useValidCountDown} from "../model/useValidCountDown";
import {CodeValidTimeProps} from "../model/types";
import {useEffect} from "react";


export const CodeValidTime: React.FC<CodeValidTimeProps> = ({onClose})=>{
    const [minutes, seconds] = useValidCountDown(onClose)



    return(
        <ErrorMessage>{(minutes === 0 && seconds === 0) ?
            "인증시간이 만료되었습니다." :
            `남은 시간 : ${minutes}분${seconds.toString().padStart(2,'0')}초`}
        </ErrorMessage>
    )
}

