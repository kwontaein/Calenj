import React, {useEffect, useState} from 'react';
import axios from 'axios';

function TestGet() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const [data, setData] = useState({
        accountid: 'UserI1',
        user_password: 'UserP1',
    });

    const [result, setResult] = useState('');
    const [logstate, setLogstate] = useState('logout');


    const handleClick = () => {
        // 클릭 시 result.accessToken 정보를 서버로 전송
        axios.post('/api/testSuccess', result.accessToken, {
            headers: {
                'Authorization': `Bearer ${result.accessToken}`, //Token 값
                'RefreshToken': `Bearer ${result.refreshToken}` //Refresh-Token 값
            }
        })
            .then(response => {
                // 서버에서의 응답 처리
                console.log(response.data);
            })
            .catch(error => console.log(error));
    };
    const handleClick2 = () => {
        // 클릭 시 result.accessToken 정보를 서버로 전송
        axios.post('/api/postCookie')
            .then(response => {
                // 서버에서의 응답 처리
                console.log(response.data);
            })
            .catch(error => console.log(error));
    };

    const login = () => {
        axios.post('/api/testlogin', data)
            .then(response => setResult(response.data), setLogstate("login"))
            .catch(error => console.log(error));
    };

    const logout = () => {
        axios.post('/api/logout', data)
            .then(response => setResult(response.data), setLogstate("logout"))
            .catch(error => console.log(error));
    };

    return (
        <div>
            <div> Date : {result}</div>
            {logstate === "logout" ?
                <button onClick={login}>로그인</button> :
                <button onClick={logout}>로그아웃</button>}
            <button onClick={handleClick}>Send AccessToken to Server</button>
            <button onClick={handleClick2}>Send Header Cookie to Server</button>
        </div>
    );
}

export default TestGet;
