import {useEffect, useRef, useState} from 'react';
import {useFetchFriendList, useFetchUserChatList} from "../../../../entities/reactQuery";
import {
    FriendChatList_Container, FriendChatList_Item_Wrapper, FriendDeleteIcon_Wrapper,
    FriendTop_Container, FriendUserName_Wrapper,
    TopContent_Container,
    TopIcon_Container
} from "./FriendChatListStyled";
import {SubNavigationButton} from "../../../group/subNavItems";
import {useDispatch, useSelector} from "react-redux";
import {RootState, updateMainSubNavigation, updateNavigation} from "../../../../entities/redux";
import {useFriendChat} from "../model/useFriendChat";
import {
    OnlineLED_Container,
    OnlineLED_Wrapper,
    ProfileContainer,
    ThemeColor2, ThemeColor3
} from "../../../../shared/ui/SharedStyled";


export const FriendChatList: React.FC = () => {
    const [friendToggle, setFriendToggle] = useState<boolean>(true);
    const userId = localStorage.getItem('userId') || ''
    const userChatList = useFetchUserChatList(userId)
    const {userNameStorage} = useSelector((state:RootState)=> state.userNameStorage)
    const [hover,setHover] = useState<string|null>(null)
    const startChat =useFriendChat(userId, true)
    const {navigateParam} = useSelector((state: RootState) => state.navigateInfo);
    const deleteRef = useRef<(HTMLDivElement | null)[]>([]);
    const dispatch = useDispatch()
    const {userList} = useSelector((state: RootState) => state.onlineStorage.friend)[userId || ''];

    return (
        <div>
            <SubNavigationButton subItem={'친구'} subItemsHandler={(target:string)=> {
                dispatch(updateMainSubNavigation({friendParam:''}))
            }}/>
            <FriendTop_Container onClick={() => setFriendToggle(prev => !prev)}>
                <TopContent_Container>
                    다이렉트 메시지
                </TopContent_Container>
                <TopIcon_Container>
                    {friendToggle ?
                        <i className="fi fi-sr-angle-small-up"></i> :
                        <i className="fi fi-sr-angle-small-down"></i>
                    }
                </TopIcon_Container>
            </FriendTop_Container>
            {friendToggle &&
                userChatList.data &&
                <FriendChatList_Container>
                    {userChatList.data.map((user,idx)=>(
                        user.open &&
                        <FriendChatList_Item_Wrapper key={user.chatListId} $isClick={navigateParam===user.chatId}
                                                     onClick={(e)=>{
                                                         !deleteRef.current[idx]?.contains(e.target as Node) && startChat(user.friendId, true)
                                                     }}
                                                     onMouseEnter={()=>setHover(user.friendId)}
                                                     onMouseLeave={()=>setHover(null)}>

                            <ProfileContainer $userId={user.friendId} style={{width:'35px', height:'35px', boxSizing:'border-box'}}/>
                            <OnlineLED_Container $bgColor={ThemeColor3} $size={15}>
                                <OnlineLED_Wrapper $bgColor={ThemeColor3} $isOnline={userList.includes(user.friendId)} />
                            </OnlineLED_Container>

                            <FriendUserName_Wrapper>
                                {userNameStorage[user.friendId] && userNameStorage[user.friendId].userName}
                            </FriendUserName_Wrapper>
                            {hover && hover===user.friendId &&
                                <FriendDeleteIcon_Wrapper onClick={()=>startChat(user.friendId, false)} ref={(el)=> deleteRef.current[idx] =el}>
                                    <i className="bi bi-x-lg"></i>
                                </FriendDeleteIcon_Wrapper>
                            }
                        </FriendChatList_Item_Wrapper>
                    ))}
                </FriendChatList_Container>
            }
        </div>
    )
}
