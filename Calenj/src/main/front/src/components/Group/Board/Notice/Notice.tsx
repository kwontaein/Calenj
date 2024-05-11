import { useEffect, useLayoutEffect, useState } from "react";
import {AHMFormat,changeDateForm} from '../../../../stateFunc/actionFun';
import MakeNotice from "./MakeNotice";
import {FullScreen_div, MiniText} from '../../../../style/FormStyle'
import {useFetchNoticeList} from "../../../../store/ReactQuery/queryManagement";
import {
    GroupNoticeList_Container,
    GroupNoticeListTitle, GroupNoticeListView_Li,
} from "../../../../style/Group/GroupNoticeStyle";
import {
    SubNavigateState,
    DispatchSubNavigationProps,
    mapDispatchToSubNavigationProps,
    mapStateToSubNavigationProps
} from "../../../../store/slice/SubNavigationSlice";
import {connect} from "react-redux";

interface SubScreenProps{
    groupId:string,
    subWidth:number
}

type NoticeProps = SubScreenProps & SubNavigateState & DispatchSubNavigationProps


const Notice :React.FC<NoticeProps> =({groupId,subWidth,subNavigateInfo,updateSubScreenStateOption})=>{
    const[makeNotice,setMakeNotice] = useState(false);

    useEffect(() => {
        if(subNavigateInfo.stateOption ==="add"){
            setMakeNotice(true);
        }
    }, [subNavigateInfo.stateOption]);

    const noticeListState = useFetchNoticeList(groupId)

    const closeModal = () => {
        setMakeNotice(false);
        updateSubScreenStateOption({stateOption:''});
    };


    return(
        <GroupNoticeList_Container>
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
        </GroupNoticeList_Container>
    )
}
export default connect(mapStateToSubNavigationProps,mapDispatchToSubNavigationProps) (Notice);