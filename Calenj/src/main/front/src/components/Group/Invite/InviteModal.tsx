import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {ListView} from '../../../style/FormStyle'
import { Stomp, IMessage, CompatClient} from '@stomp/stompjs';
import {RootState} from '../../../store/store'
import {connect} from "react-redux";
import {StompCompat} from '../../../store/StompSlice'



interface Friends {
    // 친구 아이디
    friendUserId: string;
    // 친구 닉네임
    nickName: string;
}

interface ModalProps {
    onClose: () => void;
    groupId: string;
}

//(Component Props로 전달하기 위한 interface)
const mapStateToProps = (state: RootState): StompCompat => ({
    stompClient: state.stomp.stompClient, // store에서 가져올 상태를 매핑
});


const InviteModal :React.FC<ModalProps&StompCompat> =({onClose,stompClient})=>{
    const [inviteLink, setInviteLink] = useState<string>("");
    const [friends, setFriends] = useState<Friends[] | null>(null);
    const modalBackground = useRef<HTMLDivElement>(null);


    

    function sendToFriend(friendId: string, inviteLink: string) {
        //친구에게 알림 보내기
        stompClient?.subscribe(`/topic/userOnline/${friendId}`, (isOnline: IMessage) => {})
        stompClient?.send('/app/online', {}, JSON.stringify({inviteLink}));
    }

    return(
        <div>
      
            <div ref={modalBackground} className={'modal-container'} onClick={e => {
                if (e.target === modalBackground.current) {
                    onClose();
                }
            }}>
                <div className={'modal-content'}>
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
                        </ul>: 
                        <div className={'noFriends'}>
                            <p>친구가 없으신가요?</p>
                            <p>친구를 만들어 보세요!</p>
                        </div>
                        }
                    </div>
                    {inviteLink && <div className={'issueLink'}><b>{inviteLink}</b>
                        <button>복사하기</button>
                </div>}
                <button className={'modal-close-btn'} onClick={onClose}>닫기</button>
                </div>
            </div>

        </div>
    )
}
export default connect(mapStateToProps) (InviteModal);