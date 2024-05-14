import React, {useLayoutEffect, useState} from 'react';
import axios ,{AxiosError}from 'axios';
import {useLocation} from 'react-router-dom';
import {stateFilter, createTimePassed} from '../../../../stateFunc/actionFun'
import DetailTop from '../DetailTop'
import {NoticeDetailContainer, NoticeDetailContent_Container} from "../../../../style/Group/GroupNoticeStyle";
import {FullScreen_div} from "../../../../style/FormStyle";


interface NoticeDetails {
    groupId: string;
    noticeContent : string;  
    noticeCreated: string;
    noticeCreater: string;   
    noticeWatcher:string[];
    noticeTitle:string;
}

interface NoticeListProps{
    noticeId:string,
}

const NoticeDetail:React.FC<NoticeListProps>=({noticeId})=>{
    const [detail, setDetail] = useState<NoticeDetails | null>(null);


    function getNoticeDetail (){
         axios.post('/api/noticeDetail', null, {
            params: {
                noticeId: noticeId
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }) // 객체의 속성명을 'id'로 설정
            .then(response => {
                setDetail(response.data);
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
        <NoticeDetailContainer>
            {detail &&
                <FullScreen_div>
                     <DetailTop state={"notice"} title={detail.noticeTitle} created={detail.noticeCreated} watcher={detail.noticeWatcher}/>

                     <NoticeDetailContent_Container>
                         {detail.noticeContent}
                     </NoticeDetailContent_Container>
                </FullScreen_div>
            }
        </NoticeDetailContainer>
    )
}
export default NoticeDetail