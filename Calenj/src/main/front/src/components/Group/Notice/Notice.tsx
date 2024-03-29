import { useEffect, useLayoutEffect, useState } from "react";
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios ,{AxiosResponse, AxiosError}from 'axios';
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {stateFilter} from '../../../stateFunc/actionFun';
import MakeNotice from "./MakeNotice";



interface NoticeList{
    noticeId : string;
    noticeTitle : string;
    noticeContent : string;
    noticeCreater : string;
    noticeCreated : string;
}

export const QUERY_NOTICE_LIST_KEY: string = 'noticeList'
const Notice :React.FC =()=>{
    const[makeNotice,setMakeNotice] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const groupInfo = {...location.state};


    const queryClient = useQueryClient();
    
    const closeModal = () => {
        setMakeNotice(false);
        noticeListState.refetch();
    };
      //공지목록 불러오기
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

    const noticeListState = useQuery<NoticeList[]|null, Error>({
        queryKey: [QUERY_NOTICE_LIST_KEY],
        queryFn: getNoticeList, //HTTP 요청함수 (Promise를 반환하는 함수)
    });

    const redirectDetail = (noticeId: string) => {
        navigate("/notice/detail", {state: {noticeId: noticeId}});
    }

    useEffect(()=>{
        return queryClient.removeQueries({queryKey: [QUERY_NOTICE_LIST_KEY]});
    },[])

   
    return(
        <div>
            <button onClick={()=>setMakeNotice(true)}>공지생성하기</button>
            <div>{makeNotice && <MakeNotice onClose={closeModal} groupId={groupInfo.groupId}/>}</div>
            {noticeListState.data && 
                <div>
                <h2>Notice List</h2>
                <ul>
                    {noticeListState.data.map((notice) => (
                        <li key={notice.noticeId}
                        onClick={() => redirectDetail(notice.noticeId as string)}>
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