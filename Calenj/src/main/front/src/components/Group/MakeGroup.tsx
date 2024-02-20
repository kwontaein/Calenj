import React, {useEffect, useState} from 'react';
import axios from 'axios';

const MakeGroup: React.FC = () => {
    const today: Date = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    const [result, setResult] = useState('');
    const [data, setData] = useState({
        grouptitle: 'Group_kko123',
        groupcreated: formattedDate,
    });
    const MakeGroup = () => {
        axios.post('/api/makeGroup', data)
            .then(response => setResult(response.data))
            .catch(error => console.log(error));
    };

    const GroupList = () => {
        axios.post('/api/groupList')
            .then(response => setResult(response.data))
            .catch(error => console.log(error));
    };
    const groupDetail = () => {
        axios.post('/api/groupDetail')
            .then(response => setResult(response.data))
            .catch(error => console.log(error));
    };

    return (
        <div>
            <div>
                <button onClick={MakeGroup}>그룹 생성</button>
                <button onClick={GroupList}>그룹 목록</button>
                <button onClick={groupDetail}>그룹 상세</button>
                <div>username = {result}</div>
            </div>
        </div>
    );
}

export default MakeGroup;
