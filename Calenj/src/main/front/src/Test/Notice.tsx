import { UUID } from "crypto";
import { useLayoutEffect, useState } from "react";
import NoticeModal from "./NoticeModal";
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios ,{AxiosResponse, AxiosError}from 'axios';
import {useLocation} from 'react-router-dom';
import {stateFilter} from '../stateFunc/actionFun';



interface NoticeList{
    noticeId : string;
    noticeTitle : string;
    noticeCreated : string;
    noticeContent : string;
    noticeCreater : string;
    noticeWatcher :string[];
}

export const QUERY_NOTICE_LIST_KEY: string = 'noticeList'
const Notice :React.FC =()=>{
    const[makeNotice,setMakeNotice] = useState(false);
    const[noticeListView,setNoticeListView] = useState(false);
    const location = useLocation();
    const groupInfo = {...location.state};
    
    const closeModal = () => {
        setMakeNotice(false);
    };
      //그룹 목록 불러오기
      const getNoticeList = async (): Promise<NoticeList[]|null>=> {
        try{
            const response = await axios.post('/api/noticeList',{groupId:groupInfo.groupId});
            console.log(response.data);
            return response.data
        }catch(error){
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if(axiosError.response?.data){
                stateFilter((axiosError.response.data) as string);
            }
            return null;
        }
    }

    const groupListState = useQuery<NoticeList[]|null, Error>({
        queryKey: [QUERY_NOTICE_LIST_KEY],
        queryFn: getNoticeList, //HTTP 요청함수 (Promise를 반환하는 함수)
    });




   
    return(
        <div>
            <button onClick={()=>setMakeNotice(true)}>생성하기</button>
            <div>{makeNotice && <NoticeModal onClose={closeModal} groupId={groupInfo.groupId}/>}</div>
            {groupListState.data && 
                <div>
                <h2>Notice List</h2>
                <ul>
                    {groupListState.data.map((notice) => (
                        <li key={notice.noticeId}>
                            제목 :{notice.noticeTitle}
                            <br/>
                            내용 : {notice.noticeContent}
                        </li>
                    ))}
                </ul>
            </div>}
        </div>
    )
}
export default Notice;