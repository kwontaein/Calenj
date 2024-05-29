import {useState} from "react";
import {EmailTokenState} from "../../../../entities/redux/slice/EmailValidationSlice";

//input을 수정할 수 있는지 없는지 관리
export const useInputManagement = (emailToken:EmailTokenState):[isAble:boolean, updateInputAble:()=>void]=>{
    //이메일 발급 이후 input을 잠그기 위한 State(이메일 인증번호 발급만하고 이메일 수정하는 거 막음)
    const [isAble, setIsAble] = useState<boolean>(false);

    const updateInputAble = ()=>{
        const currentTime = Date.now();
        //남은 시간 계산 (밀리초 단위)
        const enableInputEmailTime = emailToken.validateTime - currentTime;

        //만약 토큰이 아직 유효하면 이메일 input 수정불가
        if (enableInputEmailTime > 0) {
            setIsAble(true);
        } else {
            setIsAble(false);
        }
    }
    return [isAble,updateInputAble]
}