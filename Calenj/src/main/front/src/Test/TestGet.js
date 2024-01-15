import React, {useEffect, useState} from 'react';
import axios from 'axios';

function TestGet() {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const [data, setData] = useState({
        accountid: 'UserI23',
        user_password: 'UserP23',
        user_email: 'example@ex.com',
        user_phone: '010-1111-1111',
        user_roll: 'User',
        user_join_date: formattedDate,
    });

    const [result, setResult] = useState('')

    useEffect(() => {
        axios.post('/api/testlogin', data)
            .then(response => setResult(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <div>
            백엔드에서 가져온 데이터입니다 : {result}
        </div>
    );
}

export default TestGet;