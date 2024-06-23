import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {ListView, MiniText} from '../../../../../../shared/ui/SharedStyled'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {QUERY_FRIEND_LIST_KEY, useFetchFriendEvent} from '../../../../../../entities/reactQuery'
import {jwtFilter} from "../../../../../../entities/authentication/jwt";

interface Event {
    createDate: string
    eventId: number
    eventName: string
    eventPurpose: string
    eventStatus: string
    eventUserId: string
    ownUserId: string
}


const MyRequestList: React.FC = () => {
    //그룹 목록 불러오기
    const friendListState = useFetchFriendEvent()

    return (
        <div>
            {friendListState.isLoading && <div>Loading...</div>}
            {friendListState.data && (
                <div>
                    <h2>보낸 친구 요청</h2>
                    <ul>
                        {friendListState.data.map((events) => (
                            <ListView key={events.eventId}>
                                {events.eventUserId} 님에게 보낸 친구 요청
                                <br/>
                                -{events.createDate}-
                            </ListView>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
export default MyRequestList;
