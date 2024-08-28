import {FriendEvent, useFetchRequestFriendList, useFetchResponseFriendList} from "../../../../entities/reactQuery";

import {useEffect, useState} from "react";
import {FriendEventDetail} from "../../detail";
import {
    Friend_DatePlace, Friend_Hr,
    Friend_ImagePlace, Friend_NamePlace,
    Friend_ProfilePlace, Friend_TextPlace,
    FriendList_Container,
    FriendListUL,
    FriendListView
} from "../../../../shared/ui/FriendListStyled";
import {CalenJLogo} from "../../../../shared/ui/logo/CalenJLogo";



export const ResponseFriendList: React.FC = () => {
    const [modal, setModal] = useState<boolean>(false)
    const [eventKey,setEventKey] = useState<string>('')
    const userId =localStorage.getItem('userId')||'';
    //그룹 목록 불러오기
    const responseFriendState = useFetchResponseFriendList(userId);
    const showResponseInfo = (userId:string) =>{
        setEventKey(userId)
        setModal(true)
    }
    const onClose = () =>{
        setEventKey('')
        setModal(false)
    }

    return (
        <FriendList_Container>
            {responseFriendState.isLoading && <div>Loading...</div>}
            {(eventKey!=='' && modal) && <FriendEventDetail onClose={onClose} myRequest={false} userKey={eventKey} waitingView={false}/>}
            {responseFriendState.data && (
                <FriendListUL>
                    {responseFriendState.data.map((event:FriendEvent) => (
                        <div key={event.eventId}>
                            <FriendListView onClick={()=>showResponseInfo(event.ownUserId)}>
                                <Friend_ProfilePlace>
                                    <Friend_ImagePlace/>
                                    <Friend_TextPlace>
                                        <Friend_NamePlace><b>{event.nickName} </b>
                                            으로부터 친구 요청</Friend_NamePlace>
                                        <Friend_DatePlace> {event.createDate}</Friend_DatePlace>
                                    </Friend_TextPlace>
                                </Friend_ProfilePlace>
                            </FriendListView>
                            <Friend_Hr/>
                        </div>
                    ))}
                    {responseFriendState.data.length===0 &&
                        <CalenJLogo text={"현재는 아무런 요청도 없네요.. 캘포도 친구를 기다리고 있어요"}/>
                    }
                </FriendListUL>
            )}
        </FriendList_Container>
    )
}
