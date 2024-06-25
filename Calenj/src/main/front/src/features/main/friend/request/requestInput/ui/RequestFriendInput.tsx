import {
    AddFriendButton,
    AddFriendInput,
    AddFriendInput_Container,
    FriendEventBarItems_Container, Message_Container, WarningMessage_Div
} from "./RequestFriendInputStyled";
import {useEffect, useRef, useState} from "react";
import {requestFriendApi} from "../api/requestFreindApi";

export const RequestFriendInput: React.FC = () => {
    const [userId, setUserId] = useState<string>("");
    const [message,setMessage] = useState<string>('')
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.target.value);
    };

    const handleButtonClick = () => {
        if (userId.trim() === "") {
            setMessage('요청할 아이디를 입력해주세요.')
            return
        }
        requestFriendApi(userId).then((response:AddFriendProps)=>{
            if(!response.success){
                setMessage(response.message)
            }else{
                window.alert(response.message)
                if(inputRef.current){
                    inputRef.current.value ='';
                    setUserId('');
                }
            }
        })
    };

    useEffect(() => {
        if(message!==''){
            setTimeout(()=>{
                setMessage('')
            },5000)
        }
    }, [message]);

    return (
        <>
            <FriendEventBarItems_Container>
                <AddFriendInput_Container className={!(message==='') ? "shake" : ""}>
                    <AddFriendInput type={"text"}
                                    ref ={inputRef}
                                    placeholder={"ID로 친구 추가"}
                                    value={userId}
                                    onChange={handleInputChange}/>
                    <AddFriendButton onClick={handleButtonClick}>요청 보내기</AddFriendButton>
                </AddFriendInput_Container>
            </FriendEventBarItems_Container>
            {!(message==='') &&
            <WarningMessage_Div>
                <i className="bi bi-exclamation-triangle-fill"></i>
                <Message_Container>{message}</Message_Container>
            </WarningMessage_Div>
            }
        </>
    )
}