import React, { useEffect, useState} from 'react';
import axios from 'axios';

const MakeGroup: React.FC =()=>{
    const today : Date = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

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
