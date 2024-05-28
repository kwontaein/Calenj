import axios, {AxiosResponse, AxiosError} from 'axios';
import {UserListView, MiniText} from '../../style/FormStyle'
import {useFetchRequestFriendList} from "../../entities/ReactQuery";


interface FriendList {
    friendId: string;
    nickName: string;
    chattingRoomId: number;
    friendAddDate: string;
}




const RequestFriend: React.FC = () => {
    //그룹 목록 불러오기



    const requestFriendState = useFetchRequestFriendList();

    const acceptFriend = async (friendUserId: string, isAccept: string) => {
        axios.post('/api/responseFriend', {
            friendUserId: friendUserId,
            isAccept: isAccept === "ACCEPT" ? 0 : 1
        }) // 객체의 속성명을 'id'로 설정;
            .then(() => window.alert(`친구 요청을 ${isAccept === "ACCEPT" ? "수락" : "거절"}했습니다.`))
            .catch((error) => {
                window.alert('응답에 실패했습니다.');
                console.log(error.response.status);
            })
    }

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
                                <button onClick={() => acceptFriend(events.ownUserId, "ACCEPT")}>친구 수락</button>
                                <button onClick={() => acceptFriend(events.ownUserId, "REJECT")}>친구 거절</button>
                            </UserListView>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
export default RequestFriend;