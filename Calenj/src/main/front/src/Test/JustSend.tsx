import React, {useState, useEffect} from 'react';
import axios from 'axios';

const JustSend = () => {

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    // 원하는 형식으로 날짜를 설정합니다.


    const [result, setResult] = useState('')

    useEffect(() => {
        console.log();
        axios.post('/api/testpost')
            .then(response => {
                setResult(response.data)
            })
            .catch(error => {
                console.log(error)
                console.log(error.response.status)
                console.log(error.response.data)
                if (error.response.data === "ALL_TOKEN_EXPIRED") {
                    window.alert("모든 토큰이 만료되었습니다. 재로그인하세요.")
                } else if (error.response.data === "UNKNOWN_EXCEPTION") {
                    window.alert("모든 토큰이 만료되었습니다. 재로그인하세요.")
                }
            })
    }, []);

    return (
        <div>
            <h2>데이터 전송 예제 : {result}</h2>
        </div>
    );
};
export default JustSend;