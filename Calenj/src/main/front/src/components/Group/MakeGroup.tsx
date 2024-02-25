import React, {useEffect, useState} from 'react';
import axios from 'axios';

interface Group {
    groupid: string;
    grouptitle: string;
}

const MakeGroup: React.FC = () => {
    const today: Date = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    const [result, setResult] = useState('');
    const [groups, setGroups] = useState<Group[] | null>(null); // null로 초기화
    const [detail, setDetail] = useState('');
    const [data, setData] = useState({
        grouptitle: 'Group_example4',
        groupcreated: formattedDate,
    });
    const MakeGroup = () => {
        axios.post('/api/makeGroup', data)
            .then(response => setResult(response.data))
            .catch(error => console.log(error));
    };

    const GroupList = () => {
        axios.post('/api/groupList')
            .then(response => setGroups(response.data))
            .catch(error => console.log(error));
    };


    const groupDetail = (groupid: string) => {
        axios.post('/api/groupDetail', null, {
            params: {
                groupid: groupid
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }) // 객체의 속성명을 'id'로 설정
            .then(response => setDetail(response.data))
            .catch(error => console.log(error));
    };

    return (
        <div>
            <div>
                <button onClick={MakeGroup}>그룹 생성</button>
                <button onClick={GroupList}>그룹 목록</button>

                <div>result = {result}</div>
                <div>
                    {/* groups state를 map 함수를 사용하여 각 그룹 정보를 출력합니다. */}
                    {groups !== null && groups.map(group => (
                        <div key={group.groupid} onClick={() => groupDetail(group.groupid)}>
                            <div>Group ID: {group.groupid}</div>
                            <div>Group Title: {group.grouptitle}</div>
                        </div>
                    ))}
                </div>
                <div>detail = {detail}</div>
            </div>
        </div>
    );
}

export default MakeGroup;
