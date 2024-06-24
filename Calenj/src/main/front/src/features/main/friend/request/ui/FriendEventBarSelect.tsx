import {
    FriendEventBarSelect_Container, FriendSelectButton,
    FriendSelectButton_Container,
    FriendSelectTitle_Container
} from "./FriendEventBarSelectStyled";

export const FriendEventBarSelect: React.FC = () => {
    return (
        <FriendEventBarSelect_Container>
            <FriendSelectTitle_Container>친구</FriendSelectTitle_Container>
            <hr/>
            <FriendSelectButton_Container>
                <FriendSelectButton>모두</FriendSelectButton>
                <FriendSelectButton>온라인</FriendSelectButton>
                <FriendSelectButton>요청</FriendSelectButton>
                <FriendSelectButton>대기</FriendSelectButton>
            </FriendSelectButton_Container>
        </FriendEventBarSelect_Container>
    )
}