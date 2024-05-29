import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {inviteGroupApi} from "../api/inviteGroupApi";
import {AxiosError} from "axios";
import {jwtFilter} from "../../../../entities/authentication/jwt";
import {joinGroupApi} from "../api/joinGroupApi";
import {GroupInfo} from "./types";

export const useInviteGroup = ():[info:GroupInfo|null, joinGroup:()=>void] =>{
    const {inviteCode} = useParams();
    const [info, setInfo] = useState<GroupInfo | null>(null);


    useEffect(() => {
        inviteGroupApi(inviteCode)
            .then((res) => {
                console.log(res.data);
                if (res.data == null) {
                    window.alert("잘못된 초대 코드입니다");
                }
                setInfo(res.data);
            })
            .catch((error) => {
                const axiosError = error as AxiosError;
                console.log(axiosError);
                if (axiosError.response?.data) {
                    jwtFilter((axiosError.response.data) as string);
                }
            })
    }, [])

    const joinGroup = () => {
        if(!info) return
        console.log("실행?")
        joinGroupApi(info.groupId)
            .then((res) => {
                window.alert('그룹에 참여되었습니다')
                document.location.replace("/");
            })
            .catch((error) => {
                const axiosError = error as AxiosError;
                console.log(axiosError);
                if (axiosError.response?.data) {
                    jwtFilter((axiosError.response.data) as string);
                }
            })
    }

    return[info, joinGroup]
}