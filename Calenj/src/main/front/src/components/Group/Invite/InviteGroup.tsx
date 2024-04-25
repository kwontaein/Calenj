import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {Route, useLocation, useParams} from "react-router-dom";
import {saveDBFormat, stateFilter, useConfirm} from "../../../stateFunc/actionFun";
import axios, {AxiosError} from "axios";
import {Mini_Textarea, RowFlexBox} from "../../../style/FormStyle";
import InviteGroup from "./InviteGroup";
import {rejects} from "node:assert";

interface GroupInfo {
    groupId: string;
    groupTitle: string;
    inviter: string;
    onlineCount: number;
    memberCount: number;
    ableCode: string;
}

const inviteGroup: React.FC = () => {

    const {inviteCode} = useParams();
    const [info, setInfo] = useState<GroupInfo | null>(null);


    useEffect(() => {
        axios.post('/api/inviteGroup', {inviteCode: inviteCode}
        )
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
                    stateFilter((axiosError.response.data) as string);
                }
            })
    }, [])

    const JoinGroup = () => {
        
        console.log("실행?")
        axios.post('/api/joinGroup', {
            groupId: info?.groupId
        })
            .then((res) => {
                window.alert('그룹에 참여되었습니다')
                document.location.replace("/");
            })
            .catch((error) => {
                const axiosError = error as AxiosError;
                console.log(axiosError);
                if (axiosError.response?.data) {
                    stateFilter((axiosError.response.data) as string);
                }
            })
    }
    const rejectGroup = () => {
        document.location.replace("/");
    }

    return (
        <div>
            <div>
                <h3>{info?.inviter}님이 초대함 :<br/> {info?.groupTitle}그룹에 초대받았어요!</h3>
                <div>
                    <p>{info?.onlineCount}명 온라인</p> <p>멤버 {info?.memberCount}명</p>
                </div>
                <div onClick={JoinGroup}>초대 수락하기</div>
                <div onClick={rejectGroup}>사양할게요</div>
            </div>
        </div>
    )
}

export default inviteGroup;