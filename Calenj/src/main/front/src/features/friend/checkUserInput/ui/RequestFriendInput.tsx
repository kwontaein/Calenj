import {
    AddFriendButton,
    AddFriendInput,
    AddFriendInput_Container,
    FriendEventBarItems_Container, Message_Container, WarningMessage_Div
} from "./RequestFriendInputStyled";
import {useEffect, useRef, useState} from "react";
import {useUserName} from "../model/useUserName";
import {FriendEventDetail} from "../../detail";



export const RequestFriendInput: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [userId, setUserId] = useState<string>("");
    const  {showModal, message,  userKey, handleButtonClick, setShowModal} = useUserName();

    const closeModal = () =>{
        setShowModal(false)
        if (inputRef.current) {
            inputRef.current.value = '';
            setUserId('');
        }
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.target.value);
    };

    return (
        <>
            {(showModal && userKey) && <FriendEventDetail myRequest={true} onClose={closeModal} userKey={userKey} waitingView={false}/>}
            <FriendEventBarItems_Container>
                <AddFriendInput_Container className={!(message === '') ? "shake" : ""}>
                    <AddFriendInput type={"text"}
                                    ref={inputRef}
                                    placeholder={"ID로 친구 추가"}
                                    value={userId}
                                    onChange={handleInputChange}/>
                    <AddFriendButton onClick={()=>handleButtonClick(userId)}>요청 보내기</AddFriendButton>
                </AddFriendInput_Container>
            </FriendEventBarItems_Container>
            {!(message === '') &&
                <WarningMessage_Div>
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <Message_Container>{message}</Message_Container>
                </WarningMessage_Div>
            }
        </>
    )
}