import {useEffect, useRef, useState} from "react";
import {requestFriendApi} from "../api/requestFreindApi";

interface ReturnCheckUser{
    showModal:boolean,
    message:string,
    userKey: string | undefined,
    handleButtonClick :(userId:string) =>void
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
export const useUserName = ():ReturnCheckUser =>{
    const [message, setMessage] = useState<string>('')
    const [showModal,setShowModal] = useState<boolean>(false)
    const [userKey,setUserKey] = useState<string>()


    useEffect(() => {
        if (message !== '') {
            setTimeout(() => {
                setMessage('')
            }, 5000)
        }
    }, [message]);


    const handleButtonClick = (userId:string) => {
        if (userId.trim() === "") {
            setMessage('요청할 아이디를 입력해주세요.')
            return
        }
        requestFriendApi(userId).then(async(response: CheckUserName) => {
            if (response.success) {
                window.alert(response.message)
                setUserKey(response.userId);
                setShowModal(true)
            } else {
                setMessage(response.message)
            }
        })
    };



    return {showModal, message,  userKey, handleButtonClick, setShowModal}
}