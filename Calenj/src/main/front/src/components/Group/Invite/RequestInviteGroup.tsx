import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';

import InviteModal from './InviteModal'
import {
    Btn_ItemSelector,
    SelectorIcon_Container,
    SelectorText_Continer
} from "../../../style/Group/GrouypByNavigationSelectBoxStyle";


interface Friends {
    // 친구 아이디
    friendUserId: string;
    // 친구 닉네임
    nickName: string;
}

interface ParentProps {
    groupId: string
}


const RequestInviteGroup: React.FC<ParentProps> = ({groupId}) => {
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
            axios.get('/api/getFriendList', {})
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
            <Btn_ItemSelector onClick={invite}>
                <SelectorText_Continer>
                    초대하기
                </SelectorText_Continer>
                <SelectorIcon_Container>
                    <i className="fi fi-sr-user-add"></i>
                </SelectorIcon_Container>
            </Btn_ItemSelector>
            {modalOpen && <InviteModal onClose={closeModal} groupId={groupId} inviteLink={inviteLink}/>}
        </div>
    )
}
export default RequestInviteGroup;