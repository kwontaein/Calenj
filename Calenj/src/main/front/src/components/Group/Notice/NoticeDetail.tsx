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




const NoticeDetail:React.FC=()=>{
    
    const [detail, setDetail] = useState<NoticeDetails | null>(null);
    const [viewBy, setViewBy] = useState<number>(0);
    const location = useLocation();
    const noticeInfo = {...location.state};

    function getNoticeVieweBy(){
        axios.post('/api/noticeViewBy', null, {
            params: {
                noticeId: noticeInfo.noticeId
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }) // 객체의 속성명을 'id'로 설정
            .then(response => {
                setViewBy(response.data);
                console.log(response.data);
            })
            .catch(error => console.log(error));
    }

    function getNoticeDetail (){
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
    }
    
    useLayoutEffect(() => {
        getNoticeVieweBy();
        getNoticeDetail();
    }, []);


    return(
        <div>
            {detail?.noticeTitle}
            <br/>
            조회인원 : {viewBy}
        
            <hr/>
            {detail?.noticeContent}
        </div>
    )
}
export default NoticeDetail