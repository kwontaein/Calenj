import {useEffect, useState} from 'react';
import axios from "axios";

interface UserInfo {
    nickname: string;
    userEmail: string;
    userPhone: string;
    userJoinDate: string;
}

const Option = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [editedInfo, setEditedInfo] = useState<UserInfo | null>(null); // 수정된 정보를 저장할 상태 추가

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = () => {
        axios.get(`/api/getUserInfo`) // 예시: 사용자 정보를 가져오는 API 엔드포인트
            .then((res) => {
                setUserInfo(res.data);
                setEditedInfo(res.data); // 초기 값으로 사용자 정보 설정
            })
            .catch(() => {
                window.alert('사용자 정보를 가져오는 중에 오류가 발생했습니다.');
            });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditedInfo((prevState) => ({
            ...prevState!,
            [name]: value
        }));
    };


    const handleUpdateUserInfo = () => {
        window.alert("정보 업데이트")
        axios.put(`/api/updateUserNickName`, editedInfo)
            .then(() => {
                window.alert('사용자 정보가 성공적으로 업데이트되었습니다.');
                fetchUserInfo(); // 업데이트된 정보를 다시 가져옴
            })
            .catch(() => {
                window.alert('사용자 정보를 업데이트하는 중에 오류가 발생했습니다.');
            });
    };

    return (
        <div>
            <div>
                {/*닉네임은 그냥 변경 가능.*/}
                <label>Nickname:</label>
                <input type="text" name="nickname" value={editedInfo?.nickname || ''} onChange={handleInputChange}/>
            </div>
            <div>
                {/*이메일은 수정하려면 이메일 인증이 필요함.
                   이메일 인증 부분을 다시 사용하면 좋을 듯?
                   인증 번호가 맞으면 새로운 이메일 인증을 해야 함.
                */}
                <label>Email:</label>
                <input type="email" name="userEmail" value={editedInfo?.userEmail || ''} onChange={handleInputChange}/>
            </div>
            <div>
                {/* 전화번호는 수정하려면 문자 인증이 필요함.
                    구현 안해서 스킵 -> 그냥 넣는걸로
                */}
                <label>Phone:</label>
                <input type="text" name="userPhone" value={editedInfo?.userPhone || ''} onChange={handleInputChange}/>
            </div>
            <div>
                <label>Join Date:</label>
                <input type="text" name="userJoinDate" value={userInfo?.userJoinDate || ''} disabled/>
            </div>

            <button onClick={handleUpdateUserInfo}>정보 업데이트</button>
        </div>
    );
};

export default Option;
