import {
    AddFriendButton,
    AddFriendInput,
    AddFriendInput_Container,
    FriendEventBarItems_Container, Message_Container, WarningMessage_Div
} from "./RequestFriendInputStyled";
import {useEffect, useState} from "react";
import {requestFriendApi} from "../api/requestFreindApi";

export const RequestFriendInput: React.FC = () => {
    const [userId, setUserId] = useState<string>("");
    const [message,setMessage] = useState<string>('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.target.value);
    };

    const handleButtonClick = () => {
        if (userId.trim() === "") {
            setMessage('요청할 아이디를 입력해주세요.')
            return
        }
        requestFriendApi(userId).then((message:string)=>{
            if(message !== '친구요청에 성공했습니다.'){
                setMessage(message)
            }else{
                window.alert(message)
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
        <FriendEventBarItems_Container>
            <AddFriendInput_Container className={!(message==='') ? "shake" : ""}>
                <AddFriendInput type={"text"} placeholder={"ID로 친구 추가"} value={userId}
                                onChange={handleInputChange}/>
                <AddFriendButton onClick={handleButtonClick}>요청 보내기</AddFriendButton>
            </AddFriendInput_Container>
            {!(message==='') && <WarningMessage_Div><i className="bi bi-exclamation-triangle-fill"></i> <Message_Container>{message}</Message_Container> </WarningMessage_Div>}
        </FriendEventBarItems_Container>
    )
}