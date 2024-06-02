import {useState} from "react";


//이메일 인증이 가능한지 체크
export const useEmailValidAbleCheck = ():[showAlert:boolean,validation:boolean,updateValidState:()=>void, closeModal:()=>void] =>{
    //인증번호 발급여부 (한 번 발급하면 재발급 UI로 변경)
    const [validation, setValidation] = useState<boolean>(false);
    //이메일 인증 컴포넌트를 마운트하기 위한 State
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const closeModal = () => {
        setShowAlert(false);
    };

    //이메일 인증코드가 발급되면 ture로 전환
    const updateValidState = () =>{
        setValidation(true);
        setShowAlert(true);
    }

    return[showAlert, validation, updateValidState, closeModal]
}