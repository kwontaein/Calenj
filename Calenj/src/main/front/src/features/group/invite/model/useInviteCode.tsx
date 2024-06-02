import {useState} from "react";
import {inviteCodeApi} from "../api/inviteCodeApi";
import axios from "axios";
import {Friends} from "./types";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";

export const useInviteCode = (setModalOpen: React.Dispatch<React.SetStateAction<boolean>>) :[inviteLink:string, invite : ()=>void] =>{
    const [inviteLink, setInviteLink] = useState<string>("");
    const [friends, setFriends] = useState<Friends[] | null>(null);
    const groupId= useSelector((state:RootState)=> state.subNavigateInfo.param)

    const invite = () => {
        inviteCodeApi(groupId)
            .then(response => {
                setInviteLink(response.data)
                setModalOpen(true)
                axios.get('/api/getFriendList')
                    .then(response => {
                        setFriends(response.data);
                    }).catch(error => console.log(error));
            }).catch(error => console.log(error));
    }


    function sendToFriend(friendId: string, inviteLink: string) {
        //친구에게 알림 보내기
        // if(stompClient!=null){
        //     stompClient.subscribe(`/topic/userOnline/${friendId}`, (isOnline: IMessage) => {
        //     })
        //     stompClient.send('/app/online', {}, JSON.stringify({inviteLink}));
        // }
    }


    return [inviteLink, invite]
}