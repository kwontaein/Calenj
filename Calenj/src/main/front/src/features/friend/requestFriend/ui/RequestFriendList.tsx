import {useState} from "react";
import {FriendEvent, useFetchRequestFriendList, useFetchResponseFriendList} from "../../../../entities/reactQuery";

import {FriendEventDetail} from "../../detail";
import {
    Friend_DatePlace, Friend_Hr,
    Friend_ImagePlace, Friend_NamePlace,
    Friend_ProfilePlace, Friend_TextPlace,
    FriendList_Container,
    FriendListUL,
    FriendListView
} from "../../../../shared/ui/FriendListStyled";

export const RequestFriendList : React.FC = () =>{
    const [modal, setModal] = useState<boolean>(false)
    const requestFriendState = useFetchRequestFriendList();
    const [eventKey,setEventKey] = useState<string>('')

    //모달 정보를 넘기기 위한 userKey 세팅
    const showRequestInfo = (userId:string) =>{
        setEventKey(userId)
        setModal(true)
    }
    const onClose = () =>{
        setEventKey('')
        setModal(false)
    }


    return (
        <FriendList_Container>
            {(eventKey!=='' && modal) && <FriendEventDetail onClose={onClose} myRequest={true} userKey={eventKey} waitingView={true}/>}
            {requestFriendState.isLoading && <div>Loading...</div>}
            {requestFriendState.data && (
                <FriendListUL>
                    {requestFriendState.data.map((event:FriendEvent) => (
                        <div key={event.eventId}>
                            <FriendListView onClick={()=>showRequestInfo(event.receivedUserId)}>
                                <Friend_ProfilePlace>
                                    <Friend_ImagePlace>
                                    </Friend_ImagePlace>
                                    <Friend_TextPlace>
                                        <Friend_NamePlace><b>{event.nickName}</b>
                                            님의 응답 대기중</Friend_NamePlace>
                                        <Friend_DatePlace> {event.createDate}</Friend_DatePlace>
                                    </Friend_TextPlace>
                                </Friend_ProfilePlace>
                            </FriendListView>
                            <Friend_Hr/>
                        </div>
                    ))}
                </FriendListUL>
            )}
        </FriendList_Container>
    )
}