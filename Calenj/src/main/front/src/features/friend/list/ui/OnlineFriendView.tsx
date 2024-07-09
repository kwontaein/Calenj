import {FriendList, useFetchFriendList} from "../../../../entities/reactQuery";
import {
    Friend_Hr,
    Friend_ImagePlace, Friend_NamePlace,
    Friend_ProfilePlace, Friend_TextPlace,
    FriendList_Container,
    FriendListUL,
    FriendListView
} from "../../../../shared/ui/FriendListStyled";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {useEffect} from "react";

export const OnlineFriendView: React.FC =() =>{

    const friendListState = useFetchFriendList();
    const userId = localStorage.getItem('userId');
    const {userList} = useSelector((state:RootState) => state.onlineStorage.friend)[userId||''];


    return (
        <FriendList_Container>
            {friendListState.isLoading && <div>Loading...</div>}
            {(friendListState.data && userId) && (
                <FriendListUL>
                    {friendListState.data.map((friend:FriendList) => (
                        (userList.includes(friend.friendUserId) &&
                        <div key={friend.chattingRoomId}>
                            <FriendListView>
                                <Friend_ProfilePlace>
                                    <Friend_ImagePlace/>
                                    <Friend_TextPlace>
                                        <Friend_NamePlace><b>{friend.nickName}</b></Friend_NamePlace>
                                    </Friend_TextPlace>
                                </Friend_ProfilePlace>
                            </FriendListView>
                            <Friend_Hr/>
                        </div>
                        )
                    ))}
                </FriendListUL>
            )}
        </FriendList_Container>
    )
}