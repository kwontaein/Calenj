import React, {useLayoutEffect, useState} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {useId} from 'react';

interface NoticeDetails {
    groupId: string;
    noticeTitle: string;
    noticeContent : string;  
    noticeCreated: string;
    noticeCreater: string;   
}

interface ViewBy {
    viewer:string[];
}


const NoticeDetail:React.FC=()=>{
    
    const [detail, setDetail] = useState<NoticeDetails | null>(null);
    const [viewBy, setViewBy] = useState<ViewBy | null>(null);
    const location = useLocation();
    const noticeInfo = {...location.state};

    useLayoutEffect(() => {
        axios.post('/api/noticeDetail', null, {
            params: {
                noticeId: noticeInfo.noticeId
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }) // 객체의 속성명을 'id'로 설정
            .then(response => {
                setDetail(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }, []);


    return(
        <div>
            {detail?.noticeTitle}
            <br/>
            {detail?.noticeContent}
        </div>
    )
}
export default NoticeDetail