import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {stateFilter} from '../../stateFunc/actionFun'
import {UserListView, MiniText} from '../../style/FormStyle'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {QUERY_FRIEND_LIST_KEY} from '../../store/ReactQuery/QueryKey'

interface FriendList {
    friendId: string;
    nickName: string;
    chattingRoomId: number;
    friendAddDate: string;
}

interface Event {
    createDate: string
    eventId: number
    eventName: string
    eventPurpose: string
    eventStatus: string
    eventUserId: string
    ownUserId: string
}


const RequestFriend: React.FC = () => {
    //그룹 목록 불러오기
    const getEvents = async (): Promise<Event[] | null> => {
        try {
            const response = await axios.get('/api/requestedList');
            console.log('친구 요청 받은 목록을 불러옵니다.');
            const data = response.data as Event[];
            const dataSort = data.sort((a, b) => {
                return (Number(b.createDate) - Number(a.createDate));
            })
            return dataSort;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if (axiosError.response?.status) {
                console.log(axiosError.response.status);
                stateFilter((axiosError.response.status).toString());
            }
            return null;
        }
    }


    const friendListState = useQuery<Event[] | null, Error>({
        queryKey: [QUERY_FRIEND_LIST_KEY],
        queryFn: getEvents, //HTTP 요청함수 (Promise를 반환하는 함수)
    });

    const acceptFriend = async (friendUserId: string, isAccept: string) => {
        axios.post('/api/myResponse', {
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
            {friendListState.isLoading && <div>Loading...</div>}
            {friendListState.data && (
                <div>
                    <h2>받은 친구 요청</h2>
                    <ul>
                        {friendListState.data.map((events) => (
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