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
                                        onMouseEnter={() => setHoverText('dots')}
                                        onMouseLeave={() => setHoverText(null)}>
                                        {hoverText === 'dots' &&
                                            <InfoBox text={'차단 해제하기'} marginLeft={0} marginTop={-75} tailCenter={true}/>}
                                        <i className="bi bi-eraser-fill"></i>
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