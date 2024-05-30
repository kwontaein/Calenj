import {UserListView, MiniText} from '../../../../shared/ui/SharedStyled'
import {useFetchRequestFriendList} from "../../../../entities/reactQuery";
import {requestFriendApi} from "../api/requestFriendApi";

const RequestFriend: React.FC = () => {
    //그룹 목록 불러오기
    const requestFriendState = useFetchRequestFriendList();

    return (
        <div>
            {requestFriendState.isLoading && <div>Loading...</div>}
            {requestFriendState.data && (
                <div>
                    <h2>Request Friend List</h2>
                    <ul>
                        {requestFriendState.data.map((events) => (
                            <UserListView key={events.eventId}>
                                {events.eventUserId} 님이 보낸 친구 요청
                                <br/>
                                -{events.createDate}-
                                <br/>
                                <button onClick={() => requestFriendApi(events.ownUserId, "ACCEPT")}>친구 수락</button>
                                <button onClick={() => requestFriendApi(events.ownUserId, "REJECT")}>친구 거절</button>
                            </UserListView>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
export default RequestFriend;