import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { jwtFilter} from "../../../../entities/authentication/jwt";
import axios, {AxiosError} from "axios";
import {inviteGroupApi} from "../api/inviteGroupApi";
import {joinGroupApi} from "../api/joinGroupApi";
import {useInviteGroup} from "../model/useInviteGroup";



export const InviteGroup: React.FC = () => {
    const [info, joinGroup] = useInviteGroup()

    return (
        <div>
            <div>
                <h3>{info?.inviter}님이 초대함 :<br/> {info?.groupTitle}그룹에 초대받았어요!</h3>
                <div>
                    <p>{info?.onlineCount}명 온라인</p> <p>멤버 {info?.memberCount}명</p>
                </div>
                <div onClick={joinGroup}>초대 수락하기</div>
                <div onClick={()=>document.location.replace("/")}>사양할게요</div>
            </div>
        </div>
    )
}

