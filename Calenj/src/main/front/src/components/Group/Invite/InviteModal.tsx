import React, {useEffect, useRef, useState} from 'react';
import {ListView, Modal_Background} from '../../../style/FormStyle'
import {GroupInviteModal_Container} from "../../../style/Group/GroupInviteStyle";
import {useQueryClient, } from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../../entities/ReactQuery/model/queryModel";
import {GroupDetail} from "../../../entities/ReactQuery";

interface Friends {
    // 친구 아이디
    friendUserId: string;
    // 친구 닉네임
    nickName: string;
}

interface ModalProps {
    onClose: () => void;
    groupId: string;
    inviteLink: string;
}


const InviteModal: React.FC<ModalProps> = ({onClose, inviteLink,groupId}) => {
    const [friends, setFriends] = useState<Friends[] | null>(null);
    const modalBackground = useRef<HTMLDivElement>(null);
    const [groupDetail,setGroupDetail] =useState<GroupDetail|undefined>()
    const queryClient = useQueryClient();

    useEffect(() => {
           setGroupDetail(queryClient?.getQueryData([QUERY_GROUP_DETAIL_KEY,groupId]))
    }, [groupId,inviteLink])

    useEffect(() => {
        // updateTopic({topicLogic:'',})
    })

    function sendToFriend(friendId: string, inviteLink: string) {
        //친구에게 알림 보내기
        // stompClient?.subscribe(`/topic/userOnline/${friendId}`, (isOnline: IMessage) => {})
        // stompClient?.send('/app/online', {}, JSON.stringify({inviteLink}));
    }

    return (
            <Modal_Background ref={modalBackground} onClick={e => {
                if (e.target === modalBackground.current) {
                    onClose();
                }
            }}>
                <GroupInviteModal_Container>
                    <div>{groupDetail?.groupTitle} 그룹으로 초대하기</div>
                    <div className={'FriendList'}>
                        {friends && friends.length > 0 ?
                            <ul>
                                {friends.map((friend) => (
                                    <ListView>
                                        <div>{friend.nickName}({friend.friendUserId})</div>
                                        <button onClick={() => sendToFriend(friend.friendUserId, inviteLink)}>
                                            친구에게 보내기
                                        </button>
                                    </ListView>
                                ))}
                            </ul> :
                            <div className={'noFriends'}>
                                <p>친구가 없으신가요?</p>
                                <p>친구를 만들어 보세요!</p>
                            </div>
                        }
                    </div>
                    {inviteLink && <div style={{userSelect: 'text'}}><b>{inviteLink}</b>
                        <button>복사하기</button>
                    </div>}
                    <button className={'btn_inviteClose'} onClick={onClose}>닫기</button>
                </GroupInviteModal_Container>
            </Modal_Background>
    )
}
export default InviteModal;