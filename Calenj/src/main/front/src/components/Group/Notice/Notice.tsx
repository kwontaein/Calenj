import { useEffect, useLayoutEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {stateFilter,AHMFormat,changeDateForm} from '../../../stateFunc/actionFun';
import MakeNotice from "./MakeNotice";
import {ListView, MiniText} from '../../../style/FormStyle'
import {useFetchNoteList} from "../../../store/ReactQuery/queryManagement";


const Notice :React.FC =()=>{
    const[makeNotice,setMakeNotice] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const groupInfo = {...location.state};


    const noticeListState = useFetchNoteList(groupInfo.groupId)

    const closeModal = () => {
        setMakeNotice(false);
    };
      //공지목록 불러오기

    const redirectDetail = (noticeId: string) => {
        navigate("/notice/detail", {state: {noticeId: noticeId}});
    }

    useEffect(()=>{
    
    },[])

   
    return(
        <div>                
            <h1>공지</h1>
            <button onClick={()=>setMakeNotice(true)}>공지생성하기</button>
            <div>{makeNotice && <MakeNotice onClose={closeModal} groupId={groupInfo.groupId} queryState={noticeListState}/>}</div>
            {noticeListState.data && 
            <div>
                <ul>
                    {noticeListState.data.map((notice) => (
                        <ListView key={notice.noticeId}
                        onClick={() => redirectDetail(notice.noticeId as string)}>
                            {notice.noticeContent}
                            <br></br>
                            <MiniText>{AHMFormat(changeDateForm(notice.noticeCreated))}</MiniText>
                        </ListView>
                    ))}
                </ul>
            </div>}
        </div>
    )
}
export default Notice;