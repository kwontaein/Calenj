import {useEffect, useLayoutEffect, useState} from "react";
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {stateFilter} from '../../../stateFunc/actionFun';
import MakeNotice from "./MakeNotice";
import {ListView, MiniText} from '../../../style/FormStyle'


interface NoticeList {
    noticeId: string;
    noticeContent: string;
    noticeCreater: string;
    noticeCreated: string;
}

export const QUERY_NOTICE_LIST_KEY: string = 'noticeList'
const Notice: React.FC = () => {
    const [makeNotice, setMakeNotice] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const groupInfo = {...location.state};


    const queryClient = useQueryClient();

    const closeModal = () => {
        setMakeNotice(false);
        noticeListState.refetch();
    };
    //공지목록 불러오기
    const getNoticeList = async (): Promise<NoticeList[] | null> => {
        try {
            const response = await axios.post('/api/noticeList', {groupId: groupInfo.groupId});
            // console.log(response.data);
            return response.data
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if (axiosError.response?.status) {
                console.log(axiosError.response.status);
                stateFilter((axiosError.response.status).toString());
            }
            return null;
        }
    }

    const noticeListState = useQuery<NoticeList[] | null, Error>({
        queryKey: [QUERY_NOTICE_LIST_KEY],
        queryFn: getNoticeList, //HTTP 요청함수 (Promise를 반환하는 함수)
    });

    const redirectDetail = (noticeId: string) => {
        navigate("/notice/detail", {state: {noticeId: noticeId}});
    }

    useEffect(() => {
        return queryClient.removeQueries({queryKey: [QUERY_NOTICE_LIST_KEY]});
    }, [])


    return (
        <div>
            <button onClick={() => setMakeNotice(true)}>공지생성하기</button>
            <div>{makeNotice && <MakeNotice onClose={closeModal} groupId={groupInfo.groupId}/>}</div>
            {noticeListState.data &&
                <div>
                    <h2>Notice List</h2>
                    <ul>
                        {noticeListState.data.map((notice) => (
                            <ListView key={notice.noticeId}
                                      onClick={() => redirectDetail(notice.noticeId as string)}>
                                {notice.noticeContent}
                                <br></br>
                                <MiniText>{notice.noticeCreated}</MiniText>
                            </ListView>
                        ))}
                    </ul>
                </div>}
        </div>
    )
}
export default Notice;