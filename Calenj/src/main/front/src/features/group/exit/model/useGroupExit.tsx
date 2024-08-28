import {useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {groupExitApi} from "../api/GroupExitApi";

export const useGroupExit = (setModalOpen: React.Dispatch<React.SetStateAction<boolean>>): [inviteLink: string, invite: () => void] => {
    const [inviteLink, setInviteLink] = useState<string>("");
    const groupId = useSelector((state: RootState) => state.subNavigation.group_subNavState.param)

    const invite = () => {
        groupExitApi(groupId)
            .then(response => {
                setInviteLink(response.data)
                setModalOpen(true)
                axios.get('/api/getFriendList')
                    .then(() => console.log("그룹에서 나갔습니다.")).catch(error => console.log(error));
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