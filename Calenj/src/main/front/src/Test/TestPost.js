import React, {useState, useEffect} from 'react';
import axios from 'axios';

const TestPost = () => {

    const [data, setData] = useState({
        accountid: 'UserI',
        user_password: 'UserP',
    });

    const [result, setResult] = useState('')

    useEffect(() => {
        axios.post('/api/testlogin', data)
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