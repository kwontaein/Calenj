import {
    Friend_DatePlace, Friend_Hr,
    Friend_ImagePlace, Friend_NamePlace,
    Friend_ProfilePlace, Friend_TextPlace,
    FriendList_Container, FriendListCount_Container, FriendListIcon_Container,
    FriendListUL,
    FriendListView
} from "../../../../shared/ui/FriendListStyled";
import {FriendEventDetail} from "../../detail";
import {FriendEvent, FriendList, useFetchFriendList} from "../../../../entities/reactQuery";
import {ChangeEvent, useEffect, useState} from "react";
import {
    Option_Container,
    Option_Item,
    OptionIcon_Wrapper,
    ProfileContainer,
    RowFlexBox
} from "../../../../shared/ui/SharedStyled";
import {InfoBox} from "../../../../shared/ui/InfoBox";
import {useClickOutSideCheck} from "../../../../shared/model/useClickOutSideCheck";
import {friendDeleteOrBanApi} from "../api/friendDeleteOrBanApi";
import {useConfirm} from "../../../../shared/model";
import {useFetchUserBanList} from "../../../../entities/reactQuery/model/queryModel";
import {useDeleteFriend} from "../model/useDeleteFriend";
import {SearchInput} from "../../../../shared/ui/SearchInput";

export const AllFriendView: React.FC = () => {
    const userId = localStorage.getItem('userId') || ''
    const friendListState = useFetchFriendList(userId);
    const [hoverText, setHoverText] = useState<string|null>(null)
    const [dotsInfo, setDotsInfo] = useState<string|null>(null)
    const dotsRef = useClickOutSideCheck(dotsInfo!==null,()=>setDotsInfo(null))
    const [searchText,setSearchText] = useState<string>('')
    const deleteFriend =useDeleteFriend(userId)


    return (
        <FriendList_Container>
            {friendListState.isLoading && <div>Loading...</div>}
            {friendListState.data && (
                <div>
                    {friendListState.data.length>0 &&
                        <span>
                            <SearchInput searchText={searchText} placeholder={'검색하기'} setSearchText={setSearchText}/>
                            <FriendListCount_Container>모든친구 - {friendListState.data.length}명</FriendListCount_Container>
                        </span>
                    }
                    <FriendListUL>
                        {friendListState.data.filter(({nickName})=> nickName.includes(searchText)).map((friend: FriendList) => (
                            <div key={friend.chattingRoomId}>
                                <FriendListView $isClick={dotsInfo!==null && dotsInfo===friend.friendUserId}>
                                    <Friend_ProfilePlace>
                                        <ProfileContainer $userId={friend.friendUserId} style={{width:'30px', height:'30px', minWidth : "unset", marginRight:'10px'}}/>
                                        <Friend_TextPlace>
                                            <Friend_NamePlace><b>{friend.nickName}</b></Friend_NamePlace>
                                        </Friend_TextPlace>
                                    </Friend_ProfilePlace>
                                    <RowFlexBox>
                                        <FriendListIcon_Container
                                            onMouseEnter={()=>setHoverText('message')}
                                            onMouseLeave={()=>setHoverText(null)}>
                                            {hoverText==='message' && <InfoBox text={'메시지 보내기'} marginLeft={0} marginTop={-75} tailCenter={true}/>}
                                            <i className="bi bi-chat-dots-fill"></i>
                                        </FriendListIcon_Container>
                                        <FriendListIcon_Container
                                            onMouseEnter={()=>setHoverText('dots')}
                                            onMouseLeave={()=>setHoverText(null)}
                                            onClick={()=>setDotsInfo(friend.friendUserId)}>
                                            {hoverText==='dots' && <InfoBox text={'기타 옵션'} marginLeft={0} marginTop={-75} tailCenter={true}/>}
                                            <i className="bi bi-three-dots-vertical"></i>
                                            {(dotsInfo && dotsInfo === friend.friendUserId) &&
                                                <Option_Container style={{marginTop:'140px', marginRight:'-50px'}} ref={dotsRef}>
                                                    <Option_Item onClick={()=>deleteFriend(friend.friendUserId, friend.nickName, true)}>
                                                        <OptionIcon_Wrapper>
                                                            <i className="bi bi-ban"></i>
                                                        </OptionIcon_Wrapper>
                                                        차단하기
                                                    </Option_Item>
                                                    <Option_Item onClick={()=>deleteFriend(friend.friendUserId, friend.nickName, false)}>
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
                </div>
            )}
        </FriendList_Container>
    )
}