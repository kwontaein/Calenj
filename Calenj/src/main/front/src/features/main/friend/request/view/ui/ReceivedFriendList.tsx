import {UserListView, MiniText} from '../../../../../../shared/ui/SharedStyled'
import {QUERY_FRIEND_LIST_KEY, useFetchRequestFriendList} from "../../../../../../entities/reactQuery";
import {responseFriendApi} from "../api/responseFriendApi";
import {useQueryClient} from "@tanstack/react-query";

export const ReceivedFriendList: React.FC = () => {
    //그룹 목록 불러오기
    const requestFriendState = useFetchRequestFriendList();
    const queryClient = useQueryClient();
    return (
        <div>
            {requestFriendState.isLoading && <div>Loading...</div>}
            {requestFriendState.data && (
                <div>
                    <h2>Request Friend List</h2>
                    <ul>
                        {requestFriendState.data.map((events) => (
                            <UserListView key={events.eventId}>
                                <div>
                                    {events.nickName}으로부터
                                    친구 요청
                                    <br/>
                                    -{events.createDate}-
                                </div>
                                <div>
                                    <button onClick={() => responseFriendApi(events.ownUserId, "ACCEPT").then(()=> queryClient.refetchQueries({queryKey:[QUERY_FRIEND_LIST_KEY]}))}>
                                        친구 수락
                                    </button>
                                    <button onClick={() => responseFriendApi(events.ownUserId, "REJECT").then(()=> queryClient.refetchQueries({queryKey:[QUERY_FRIEND_LIST_KEY]}))}>
                                        친구 거절
                                    </button>
                                </div>
                            </UserListView>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
