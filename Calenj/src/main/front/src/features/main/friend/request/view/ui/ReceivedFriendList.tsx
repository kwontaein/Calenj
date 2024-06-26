import {useFetchRequestFriendList} from "../../../../../../entities/reactQuery";
import {getUserProfileApi} from "../../../../../group/members"
import {
    ReceivedFriend_DatePlace, ReceivedFriend_Hr, ReceivedFriend_ImagePlace,
    ReceivedFriend_NamePlace, ReceivedFriend_ProfilePlace, ReceivedFriend_ResponseBtn, ReceivedFriend_TextPlace,
    ReceivedFriendList_Container, ReceivedFriendListUL,
    ReceivedFriendListView
} from "./ReceivedFriendListStyled";
import {useState} from "react";
import {UserInfo} from "../../../../../user/userInfo";

interface RequestFriend{
    chatUUID: string
    eventContent:string
    introduce: string
    joinDate: string
    nickName: string
    sameFriend: string[]
    sameGroup : string[]
}

export const ReceivedFriendList: React.FC = () => {
    const [profile, setProfile] = useState<UserInfo | null>(null);
    const [requestModal, setRequestModal] = useState<boolean>(false)
    const [userInfo,setUserInfo] = useState<RequestFriend>()

    //그룹 목록 불러오기
    const requestFriendState = useFetchRequestFriendList();

    const getUserProfile = async (userId: string) => {
        try {
            const userData = await getUserProfileApi(userId);
            setProfile(userData);
            console.log(userData);
        } catch (error) {
            window.alert('잘못된 접근입니다. 재시작을 해주세요.');
        }
    };


    return (
        <ReceivedFriendList_Container>
            {requestFriendState.isLoading && <div>Loading...</div>}
            {requestFriendState.data && (
                <ReceivedFriendListUL>
                    {requestFriendState.data.map((events) => (
                        <ReceivedFriendListView key={events.eventId} onClick={() => getUserProfile(events.eventUserId)}>
                            <ReceivedFriend_ProfilePlace>
                                <ReceivedFriend_ImagePlace>
                                </ReceivedFriend_ImagePlace>
                                <ReceivedFriend_TextPlace>
                                    <ReceivedFriend_NamePlace><b>{events.nickName} </b>
                                        으로부터 친구 요청</ReceivedFriend_NamePlace>
                                    <ReceivedFriend_DatePlace> {events.createDate}</ReceivedFriend_DatePlace>
                                </ReceivedFriend_TextPlace>
                            </ReceivedFriend_ProfilePlace>
                        </ReceivedFriendListView>
                    ))}
                    <ReceivedFriend_Hr/>
                </ReceivedFriendListUL>
            )}
        </ReceivedFriendList_Container>
    )
}
