import React, {useEffect, useState} from 'react';
import {getUserProfileApi} from "../api/getUserProfileApi";
import {Profile, UserModalProps} from "../model/types";



export const UserModal: React.FC<UserModalProps> = ({user, onClose}) => {
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        getUserProfileApi(user.userEmail)
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
            <p>역할 : {user.userEmail}</p>
            <p>가입일 : {profile?.joinDate}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};


