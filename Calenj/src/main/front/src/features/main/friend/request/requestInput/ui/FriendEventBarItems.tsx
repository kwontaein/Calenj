import {
    AddFriendButton,
    AddFriendInput,
    AddFriendInput_Container,
    FriendEventBarItems_Container, WarningMessage_Div
} from "./FriendEventBarItemsStyled";
import {useState} from "react";

export const FriendEventBarItems: React.FC = () => {
    const [ok, isOk] = useState<boolean>(true);

    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        isOk(true); // 입력 값이 변경될 때 ok를 true로 설정
    };

    const handleButtonClick = () => {
        if (inputValue.trim() === "") {
            isOk(false); // 입력 값이 비어있을 때 ok를 false로 설정
        }
    };
    return (
        <FriendEventBarItems_Container>
            <AddFriendInput_Container className={!ok ? "shake" : ""}>
                <AddFriendInput type={"text"} placeholder={"ID로 친구 추가"} value={inputValue}
                                onChange={handleInputChange}/>
                <AddFriendButton onClick={() => isOk(false)}>요청 보내기</AddFriendButton>
            </AddFriendInput_Container>
            {!ok && <WarningMessage_Div>잘못된 정보입니다</WarningMessage_Div>}
        </FriendEventBarItems_Container>
    )
}