import {
    EventFriendButton_Container, EventFriendItem_Container,
    EventFriendList_Container, EventFriendListBottom_Container,
    EventFriendListMiddle_Container,
    EventFriendListTop_Container, EventFriendName_Container, FriendJoinState_Button, JoinFriendList_Container
} from "./EventFriendListStyled";
import {useFetchFriendList} from "../../../../entities/reactQuery";
import {DateEventAction, DateEventState} from "../../../../entities/calendar";
import React from "react";
import {ProfileContainer, TextColor} from "../../../../shared/ui/SharedStyled";

interface AddEventProps {
    onClose: React.DispatchWithoutAction,
    eventState: DateEventState;
    eventDispatch: React.Dispatch<DateEventAction>;
}

export const EventFriendList: React.FC<AddEventProps> = ({onClose, eventState, eventDispatch}) => {

    const userId = localStorage.getItem('userId') || ''
    const friendListState = useFetchFriendList(userId);
    const friendListHandler = (friendId: string) => {
        //존재하지 않으면 추가
        if (eventState.friendList.some((id) => friendId === id)) {
            const newFriendList = eventState.friendList.filter((id) => id !== friendId)
            eventDispatch({type: 'SET_FRIEND_LIST', payload: newFriendList})
        } else {
            const newFriendList = [...eventState.friendList, friendId];
            eventDispatch({type: 'SET_FRIEND_LIST', payload: newFriendList})
        }
    }

    return (
        <EventFriendList_Container>
            <EventFriendListTop_Container>
                <div>일정 친구추가</div>
                <EventFriendButton_Container onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </EventFriendButton_Container>
            </EventFriendListTop_Container>
            <EventFriendListMiddle_Container>
                {(friendListState.data && friendListState.data.length > 0) ?
                    (friendListState.data.map((friend) => (
                        <EventFriendItem_Container key={friend.friendUserId} onClick={() => {
                            friendListHandler(friend.friendUserId)
                        }}>
                            <EventFriendName_Container>
                                {friend.nickName}
                            </EventFriendName_Container>
                            <FriendJoinState_Button
                                $isJoin={eventState.friendList.some((id) => id === friend.friendUserId)}>
                                {eventState.friendList.some((id) => id === friend.friendUserId) ? '제거' : '추가'}
                            </FriendJoinState_Button>
                        </EventFriendItem_Container>
                    )))
                    :
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: 'center',
                        fontSize: '13px',
                        color: `${TextColor}77`
                    }}>
                        친구가 존재하지 않습니다.
                    </div>
                }
            </EventFriendListMiddle_Container>
            <EventFriendListBottom_Container>
                <div style={{fontSize: '10px'}}>일정에 참여하는 친구</div>
                <JoinFriendList_Container>
                    {eventState.friendList.map((friendId) => (
                        <ProfileContainer $userId={friendId} key={friendId}
                                          style={{width: '18px', height: '18px', minWidth: 'unset'}}/>
                    ))}
                </JoinFriendList_Container>
            </EventFriendListBottom_Container>

        </EventFriendList_Container>
    )
}