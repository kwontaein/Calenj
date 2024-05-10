import { useEffect, useLayoutEffect, useState } from "react";
import {AHMFormat,changeDateForm} from '../../../stateFunc/actionFun';
import MakeNotice from "./MakeNotice";
import {FullScreen_div, MiniText} from '../../../style/FormStyle'
import {useFetchNoticeList} from "../../../store/ReactQuery/queryManagement";
import {
    GroupNoticeListTitle, GroupNoticeListView_Li,
} from "../../../style/Group/GroupNoticeStyle";
import {GroupSubScreenTopIcon_Container, GroupSubScreenTop_Container, GroupSubScreenList_HR} from "../../../style/Group/GroupSubScreenStyle";

interface SubScreenProps{
    groupId:string,
    subWidth:number
}


const Notice :React.FC<SubScreenProps> =({groupId,subWidth})=>{
    const[makeNotice,setMakeNotice] = useState(false);


    const noticeListState = useFetchNoticeList(groupId)

    const closeModal = () => {
        setMakeNotice(false);
    };



    return(
        <FullScreen_div>
            <div>{makeNotice && <MakeNotice onClose={closeModal} groupId={groupId} queryState={noticeListState}/>}</div>
            {noticeListState.data &&
                (noticeListState.data.map((notice) => (
                        <GroupNoticeListView_Li key={notice.noticeId}
                                  onClick={() => {}}>
                            <GroupNoticeListTitle $subScreenWidth={subWidth}>
                                {notice.noticeTitle}
                            </GroupNoticeListTitle>
                            <MiniText>{AHMFormat(changeDateForm(notice.noticeCreated))}</MiniText>
                        </GroupNoticeListView_Li>
                    ))
                )
            }
        </FullScreen_div>
    )
}
export default Notice;