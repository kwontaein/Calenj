import React, {useEffect, useState} from 'react';
import axios from 'axios';

function MakeGroup() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const [data, setData] = useState({
        accountid: 'UserI1',
        user_password: 'UserP1',
    });

    const [result, setResult] = useState('');
    const [logstate, setLogstate] = useState('');

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

    useEffect(() => {
        axios.post('/api/postCookie')
            .then(response => {
                // 서버에서의 응답 처리
                if (response.data) {
                    setLogstate("login");
                } else {
                    setLogstate("logout");
                }
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <div>
            <div> Date : {result}</div>
            {logstate === "logout" ?
                <button onClick={login}>로그인</button> :
                <button onClick={logout}>로그아웃</button>}
        </div>
    );
}

export default MakeGroup;
