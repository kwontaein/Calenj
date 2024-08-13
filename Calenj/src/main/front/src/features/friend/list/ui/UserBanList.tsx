import {useFetchUserBanList} from "../../../../entities/reactQuery/model/queryModel";
import {
    Friend_Hr,
    Friend_NamePlace,
    Friend_ProfilePlace, Friend_TextPlace,
    FriendList_Container, FriendListIcon_Container,
    FriendListUL,
    FriendListView
} from "../../../../shared/ui/FriendListStyled";
import {FriendList} from "../../../../entities/reactQuery";
import {
    Option_Container,
    Option_Item,
    OptionIcon_Wrapper,
    ProfileContainer,
    RowFlexBox
} from "../../../../shared/ui/SharedStyled";
import {InfoBox} from "../../../../shared/ui/InfoBox";
import {useState} from "react";
import {useClickOutSideCheck} from "../../../../shared/model/useClickOutSideCheck";
import {friendDeleteOrBanApi} from "../api/friendDeleteOrBanApi";

export const UserBanList :React.FC =()=>{
    const userId = localStorage.getItem('userId')||''
    const {data, isLoading} = useFetchUserBanList(userId)
    const [hoverText, setHoverText] = useState<string|null>(null)
    const [dotsInfo, setDotsInfo] = useState<string|null>(null)
    const dotsRef = useClickOutSideCheck(dotsInfo!==null,()=>setDotsInfo(null))


    return(
        <FriendList_Container>
            {isLoading && <div>Loading...</div>}
            {data && (
                <FriendListUL>
                    {data.map((user: FriendList) => (
                        <div key={user.chattingRoomId}>
                            <FriendListView>
                                <Friend_ProfilePlace>
                                    <ProfileContainer $userId={user.friendUserId} style={{width:'30px', height:'30px', minWidth : "unset", marginRight:'10px'}}/>
                                    <Friend_TextPlace>
                                        <Friend_NamePlace><b>{user.nickName}</b></Friend_NamePlace>
                                    </Friend_TextPlace>
                                </Friend_ProfilePlace>
                                <RowFlexBox>
                                    <FriendListIcon_Container
                                        onMouseEnter={()=>setHoverText('message')}
                                        onMouseLeave={()=>setHoverText(null)}
                                        onClick={()=>setDotsInfo(user.friendUserId)}>
                                        {hoverText==='message' && <InfoBox text={'메시지 보내기'} marginLeft={0} marginTop={-75} tailCenter={true}/>}
                                        <i className="bi bi-chat-dots-fill"></i>
                                    </FriendListIcon_Container>
                                    <FriendListIcon_Container
                                        onMouseEnter={()=>setHoverText('dots')}
                                        onMouseLeave={()=>setHoverText(null)}
                                        onClick={()=>setDotsInfo(user.friendUserId)}>
                                        {hoverText==='dots' && <InfoBox text={'기타 옵션'} marginLeft={0} marginTop={-75} tailCenter={true}/>}
                                        <i className="bi bi-three-dots-vertical"></i>
                                        {(dotsInfo && dotsInfo === user.friendUserId) &&
                                            <Option_Container style={{marginTop:'140px', marginRight:'-50px'}} ref={dotsRef}>
                                                <Option_Item>
                                                    <OptionIcon_Wrapper>
                                                        <i className="bi bi-ban"></i>
                                                    </OptionIcon_Wrapper>
                                                    차단하기
                                                </Option_Item>
                                                <Option_Item>
                                                    <OptionIcon_Wrapper>
                                                        <i className="bi bi-person-x-fill"></i>
                                                    </OptionIcon_Wrapper>
                                                    삭제하기
                                                </Option_Item>
                                            </Option_Container>
                                        }
                                    </FriendListIcon_Container>
                                </RowFlexBox>
                            </FriendListView>
                            <Friend_Hr/>
                        </div>
                    ))}
                </FriendListUL>
            )}
        </FriendList_Container>
    )
}