import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {ListView} from '../../../style/FormStyle'
import {Stomp, IMessage, CompatClient} from '@stomp/stompjs';
import {RootState} from '../../../store/store'
import {connect} from "react-redux";
import InviteModal from './InviteModal'

// import{ DispatchProps,updateTopic,updateApp,sendStompMsg,receivedStompMsg,StompState,mapDispatchToProps}  from '../../../store/module/StompReducer';

interface Friends {
    // 친구 아이디
    friendUserId: string;
    // 친구 닉네임
    nickName: string;
}

interface ParentProps {
    groupId: number
}


const Invite: React.FC<ParentProps> = ({groupId}) => {
    const [inviteLink, setInviteLink] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [friends, setFriends] = useState<Friends[] | null>(null);
    const modalBackground = useRef<HTMLDivElement>(null);

    //usestate -> true false / 버큰클릭시 바뀌고 -> 컴포넌트 열고 프롭스로 전달
    function invite() {
        axios.post('/api/inviteCode', {
            groupId: groupId,
            during: 7
        }).then(response => {
            setInviteLink(response.data)
            setModalOpen(true);
            axios.post('/api/getFriendList', {})
                .then(response => {
                    setFriends(response.data)
                    console.log("friends", friends)
                    console.log(response.data)
                    setModalOpen(true)
                }).catch(error => console.log(error));
        }).catch(error => console.log(error));

    }

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {

    })

    function sendToFriend(friendId: string, inviteLink: string) {
        //친구에게 알림 보내기
        // if(stompClient!=null){
        //     stompClient.subscribe(`/topic/userOnline/${friendId}`, (isOnline: IMessage) => {
        //     })
        //     stompClient.send('/app/online', {}, JSON.stringify({inviteLink}));
        // }
    }


    return (
        <div>
            <div className={'btn_wrapper'}>
                <button className={'btn_modalOpen'} onClick={invite}>
                    초대하기
                </button>
                {modalOpen && <InviteModal onClose={closeModal} groupId={groupId} inviteLink={inviteLink}/>}
            </div>

        </div>
    )
}
export default Invite;