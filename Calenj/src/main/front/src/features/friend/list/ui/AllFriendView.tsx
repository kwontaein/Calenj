import {
    Friend_DatePlace, Friend_Hr,
    Friend_ImagePlace, Friend_NamePlace,
    Friend_ProfilePlace, Friend_TextPlace,
    FriendList_Container,
    FriendListUL,
    FriendListView
} from "../../../../shared/ui/FriendListStyled";
import {FriendEventDetail} from "../../detail";
import {FriendEvent, FriendList, useFetchFriendList} from "../../../../entities/reactQuery";

export const AllFriendView: React.FC = () => {
    const friendListState = useFetchFriendList();

    return (
        <FriendList_Container>
            {friendListState.isLoading && <div>Loading...</div>}
            {friendListState.data && (
                <FriendListUL>
                    {friendListState.data.map((friend:FriendList) => (
                    <>
                    <FriendListView key={friend.friendId}>
                        <Friend_ProfilePlace>
                            <Friend_ImagePlace/>
                            <Friend_TextPlace>
                                <Friend_NamePlace><b>{friend.nickName}</b></Friend_NamePlace>
                            </Friend_TextPlace>
                        </Friend_ProfilePlace>
                    </FriendListView>
                    <Friend_Hr/>
                    </>
                ))}
                </FriendListUL>
            )}
        </FriendList_Container>
    )
}