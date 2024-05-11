import React, {useLayoutEffect, useState} from 'react';
import axios ,{AxiosError}from 'axios';
import {useLocation} from 'react-router-dom';
import {stateFilter, createTimePassed} from '../../../../stateFunc/actionFun'
import DetailTop from '../DetailTop'


interface NoticeDetails {
    groupId: string;
    noticeContent : string;  
    noticeCreated: string;
    noticeCreater: string;   
    noticeWatcher:string[];
}




const NoticeDetail:React.FC=()=>{
    
    const [detail, setDetail] = useState<NoticeDetails | null>(null);
    const location = useLocation();
    const noticeInfo = {...location.state};


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
            .catch(error => {
                const axiosError = error as AxiosError;
                console.log(axiosError);
                if(axiosError.response?.data){
                    stateFilter((axiosError.response.data) as string);
                }
            });
    }
    
    useLayoutEffect(() => {
        getNoticeDetail();
    }, []);


    return(
        <div>
            {detail &&
            <div>
                 <DetailTop Created={detail.noticeCreated}Creater={detail.noticeCreater} Watcher={detail.noticeWatcher}/>
            
                <div style={{width:'88vw', marginLeft:'1vw',padding:'4vw'}}>
                    {detail?.noticeContent}
                </div>
            </div>
            }
            
        </div>
    )
}
export default NoticeDetail