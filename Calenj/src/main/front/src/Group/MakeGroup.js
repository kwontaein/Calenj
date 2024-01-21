import React, {useEffect, useState} from 'react';
import axios from 'axios';

function MakeGroup() {

    /*const [data, setData] = useState({
        accountid: 'UserI1',
        user_password: 'UserP1',
    });*/

    const [result, setResult] = useState('');
    const [data, setData] = useState({
        group_title: 'TestGroup1',
        group_created: formattedDate,
    });
    const MakeGroup = () => {
        axios.post('/api/makeGroup', data)
            .then(response => setResult(response.data))
            .catch(error => console.log(error));
    };
    /* useEffect(() => {
         axios.post('/api/postCookie')
             .then(response => {
                 // 서버에서의 응답 처리
                 console.log(response.data);
             })
             .catch(error => console.log(error));
     }, [])*/

    return (
        <div>
            <div>
                <button onClick={MakeGroup}>그룹 생성</button>
                <div>username = {result}</div>
            </div>
        </div>
    );
}

export default MakeGroup;
