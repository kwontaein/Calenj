import { useEffect, useLayoutEffect, useState } from "react";
import {stateFilter,AHMFormat,changeDateForm} from '../../../stateFunc/actionFun';
import MakeNotice from "./MakeNotice";
import { ListView, MiniText} from '../../../style/FormStyle'
import {useFetchNoticeList} from "../../../store/ReactQuery/queryManagement";
import {
    GroupNoticeList_Container,
} from "../../../style/Group/GroupNoticeStyle";
import {GroupSubScreenTopIcon_Container, GroupSubScreenTop_Container, GroupSubScreenList_HR} from "../../../style/Group/GroupSubScreenStyle";

interface SubScreenProps{
    groupId:string,
}

const Notice :React.FC<SubScreenProps> =({groupId})=>{
    const[makeNotice,setMakeNotice] = useState(false);


    const noticeListState = useFetchNoticeList(groupId)

    const closeModal = () => {
        setMakeNotice(false);
    };



    return(
        <GroupNoticeList_Container>
            <GroupSubScreenTop_Container>
                공지
                <GroupSubScreenTopIcon_Container onClick={()=>setMakeNotice(true)}>
                    <i className="fi fi-rs-file-edit"  style={{marginTop:"5px"}}></i>
                </GroupSubScreenTopIcon_Container>
            </GroupSubScreenTop_Container>
            <GroupSubScreenList_HR/>

            <div>{makeNotice && <MakeNotice onClose={closeModal} groupId={groupId} queryState={noticeListState}/>}</div>
            {noticeListState.data &&
                (noticeListState.data.map((notice) => (
                        <ListView key={notice.noticeId}
                                  onClick={() => {}}>
                            {notice.noticeContent}
                            <br></br>
                            <MiniText>{AHMFormat(changeDateForm(notice.noticeCreated))}</MiniText>
                        </ListView>
                    ))
                )
            }
        </GroupNoticeList_Container>
    )
}
export default Notice;