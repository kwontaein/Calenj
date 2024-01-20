import React, {useState, useEffect} from 'react';
import axios from 'axios';

const TestPost = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
// 원하는 형식으로 날짜를 설정합니다.

    const [data, setData] = useState({
        accountid: 'UserI1',
        user_password: 'UserP1',
        user_email: 'example@ex.com',
        user_phone: '010-1111-1111',
        user_role: 'MANAGER',
        user_join_date: formattedDate,
    });

    const [result, setResult] = useState('')

    useEffect(() => {
        console.log(data);
        axios.post('/api/usersave', data)
            .then(response => setResult(response.data))
            .catch(error => console.log('데이터 전송 중 에러 발생:', error))
    }, []);

    return (
        <div>
            <h2>데이터 전송 예제 : {result}</h2>
        </div>
    );
};
export default TestPost;