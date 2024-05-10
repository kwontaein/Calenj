import React, {useEffect, useState} from 'react';
import {StompData} from "../../store/module/StompReducer";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

interface UserModalProps {
    user: groupMembers;
    onClose: () => void; // onClose prop 추가
}

interface groupMembers {
    groupRoleType: String;
    group_user_location: String;
    nickName: String;
    onlineStatus: string;
    userEmail: string;
}

interface profile {
    introduce: string;    // 소개
    joinDate: string;    // 가입일
    sameGroup: string[];// 같이 있는 그룹
    chatUUID: number;// 개인 메세지 버튼
}


const UserModal: React.FC<UserModalProps> = ({user, onClose}) => {
    const [profile, setProfile] = useState<profile | null>(null);

    useEffect(() => {
        axios.post(`/api/getProfile`, {userEmail: user.userEmail})
            .then((res) => {
                setProfile(res.data);
            })
            .catch(() => {
                window.alert('잘못된 접근입니다. 재시작을 해주세요.');
            });
    }, []);

    return (
        <div>
            <p>이메일 : {user.userEmail}</p>
            <p>닉네임 : {user.nickName}</p>
            {localStorage.getItem("userId") === user.userEmail ? " " : <p>공통 : {profile?.sameGroup}</p>}
            <p>소개 : {profile?.introduce}</p>
            <p>역할 : {user.groupRoleType}</p>
            <p>가입일 : {profile?.joinDate}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};


export default UserModal;
