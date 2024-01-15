import React, {useEffect, useState} from 'react';
import axios from 'axios';

function TestGet() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const [data, setData] = useState({
        accountid: 'UserI23',
        user_password: 'UserP23',
    });

    const [result, setResult] = useState('');

    const handleClick = () => {
        // 클릭 시 result.accessToken 정보를 서버로 전송
        axios.post('/api/testSuccess', result.accessToken, {
            headers: {
                'Authorization': `Bearer ${result.accessToken}`
            }
        })
            .then(response => {
                // 서버에서의 응답 처리
                console.log(response.data);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        axios.post('/api/testlogin', data)
            .then(response => setResult(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <div> grantType: {result.grantType}</div>
            <div> accessToken: {result.accessToken}</div>
            <div> refreshToken: {result.refreshToken}</div>
            <button onClick={handleClick}>Send AccessToken to Server</button>
        </div>
    );
}

export default TestGet;
