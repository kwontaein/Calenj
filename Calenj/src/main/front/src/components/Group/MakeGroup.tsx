import React, {useEffect, useState} from 'react';
import axios from 'axios';

interface Group {
    groupid: string;
    grouptitle: string;
}

interface Details {
    groupId: string;
    groupCreated: string;
    groupTitle: string;
    groupCreater: string;
}

interface Members {
    groupRoleType: String;

    group_user_location: String;

    nickName: String;
}

const MakeGroup: React.FC = () => {
    const today: Date = new Date();
    const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    const [result, setResult] = useState('');
    const [groups, setGroups] = useState<Group[] | null>(null); // null로 초기화
    const [detail, setDetail] = useState<Details | null>(null);
    const [members, setMembers] = useState<Members[] | null>(null);

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
            .then(response => {
                setDetail(response.data);
                setMembers(response.data.members);
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <div>
                <button onClick={MakeGroup}>그룹 생성</button>
                <button onClick={GroupList}>그룹 목록</button>
                <div>result = {result}</div>
                <div>
                    {groups !== null && groups.map(group => (
                        <div key={group.groupid} onClick={() => groupDetail(group.groupid)}>
                            <div>Group ID: {group.groupid}</div>
                            <div>Group Title: {group.grouptitle}</div>
                        </div>
                    ))}
                </div>
                <hr/>
                <div>
                    {detail !== null && (
                        <div key={detail.groupId}>
                            <div>Group Detail ID: {detail.groupId}</div>
                            <div>Group Detail Title: {detail.groupTitle}</div>
                        </div>
                    )}
                </div>
                <hr/>
                <div>
                    {members !== null && members.map(members => (
                        <div>
                            <div>닉네임 : {members.nickName}</div>
                            <div>역할 : {members.groupRoleType}</div>
                            <div>위치 : {members.group_user_location}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MakeGroup;
