import { useEffect, useLayoutEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {stateFilter,AHMFormat,changeDateForm} from '../../../stateFunc/actionFun';
import MakeNotice from "./MakeNotice";
import {FullScreen_div, ListView, MiniText} from '../../../style/FormStyle'
import {useFetchNoticeList} from "../../../store/ReactQuery/queryManagement";
import {CreateNotice_Btn} from "../../../style/Group/GroupNoticeStyle";

interface SubScreenProps{
    groupId:string,
}

const Notice :React.FC<SubScreenProps> =({groupId})=>{
    const[makeNotice,setMakeNotice] = useState(false);


    const noticeListState = useFetchNoticeList(groupId)

    const closeModal = () => {
        setMakeNotice(false);
    };
      //공지목록 불러오기

    // const redirectDetail = (noticeId: string) => {
    //     navigate("/notice/detail", {state: {noticeId: noticeId}});
    // }


    return(
        <FullScreen_div>
            <CreateNotice_Btn onClick={()=>setMakeNotice(true)}>공지생성하기</CreateNotice_Btn>
            <div>{makeNotice && <MakeNotice onClose={closeModal} groupId={groupId} queryState={noticeListState}/>}</div>
            {noticeListState.data && 
                <div>
                    {noticeListState.data.map((notice) => (
                        <ListView key={notice.noticeId}
                        onClick={() => {}}>
                            {notice.noticeContent}
                            <br></br>
                            <MiniText>{AHMFormat(changeDateForm(notice.noticeCreated))}</MiniText>
                        </ListView>
                    ))}
                </div>
            }
        </FullScreen_div>
    )
}
export default Notice;