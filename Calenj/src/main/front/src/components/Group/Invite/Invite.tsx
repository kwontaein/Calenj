import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {ListView} from '../../../style/FormStyle'
import { Stomp, IMessage, CompatClient} from '@stomp/stompjs';
import {RootState} from '../../../store/store'
import {connect} from "react-redux";
import {StompCompat} from '../../../store/StompSlice'
import InviteModal from './InviteModal'

interface Friends {
    // 친구 아이디
    friendUserId: string;
    // 친구 닉네임
    nickName: string;
}

interface ParentProps{
    groupId : number
}

//(Component Props로 전달하기 위한 interface)
const mapStateToProps = (state: RootState): StompCompat => ({
    stompClient: state.stomp.stompClient, // store에서 가져올 상태를 매핑
});



const Invite :React.FC<ParentProps&StompCompat> =({groupId, stompClient})=>{
    const [inviteLink, setInviteLink] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [friends, setFriends] = useState<Friends[] | null>(null);
    const modalBackground = useRef<HTMLDivElement>(null);

   //usestate -> true false / 버큰클릭시 바뀌고 -> 컴포넌트 열고 프롭스로 전달
   function invite() {
    axios.post('/api/inviteCode', {
        groupId: groupId
    }).then(response => {
        setInviteLink(response.data)
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
    

    function sendToFriend(friendId: string, inviteLink: string) {
        //친구에게 알림 보내기
        if(stompClient!=null){
            stompClient.subscribe(`/topic/userOnline/${friendId}`, (isOnline: IMessage) => {
            })
            stompClient.send('/app/online', {}, JSON.stringify({inviteLink}));
        }
        }
        

    return(
        <div>
        <div className={'btn-wrapper'}>
            <button className={'modal-open-btn'} onClick={invite}>
                초대하기
            </button>
            </div>
                
        </div>
    )
}
export default connect(mapStateToProps) (Invite);