import {FriendChatEventBar_Container, UserNickName_Container} from "./FriendChatEventBarStyled";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {useFetchUserChatList} from "../../../../entities/reactQuery";
import {
    OnlineLED_Container,
    OnlineLED_Wrapper,
    ProfileContainer, ThemeColor2,
} from "../../../../shared/ui/SharedStyled";

export const FriendChatEventBar:React.FC = () =>{
    const {friendParam} = useSelector((state:RootState)=> state.subNavigation.main_subNavState)
    const {userNameStorage} = useSelector((state:RootState)=> state.userNameStorage)
    const userId = localStorage.getItem('userId') ||''
    const {userList} = useSelector((state: RootState) => state.onlineStorage.friend)[userId || ''];

    return(
        <FriendChatEventBar_Container>
            <ProfileContainer $userId={friendParam} style={{width:'32px', height:'32px', boxSizing:'border-box'}}/>
            <OnlineLED_Container $bgColor={ThemeColor2} $size={15} style={{marginLeft:'20px'}}>
                <OnlineLED_Wrapper $bgColor={ThemeColor2} $isOnline={userList.includes(friendParam)} />
            </OnlineLED_Container>
            <UserNickName_Container>
                {userNameStorage[friendParam]?.userName}
            </UserNickName_Container>
        </FriendChatEventBar_Container>
    )
}