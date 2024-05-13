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
    BoardOptionState,
    DispatchBoardOptionProps,
    mapDispatchToBoardOptionProps,
    mapStateToBoardOptionProps
} from "../../../../store/slice/BoardOptionSlice";
import {connect} from "react-redux";

interface SubScreenProps{
    groupId:string,
    subWidth:number
}

type NoticeProps = SubScreenProps & BoardOptionState & DispatchBoardOptionProps


const Notice :React.FC<NoticeProps> =({groupId,subWidth,boardOption,updateClickState})=>{
    const[makeNotice,setMakeNotice] = useState(false);

    useEffect(() => {
        if(boardOption.clickState ==="add"){
            setMakeNotice(true);
        }
    }, [boardOption.clickState]);

    const noticeListState = useFetchNoticeList(groupId)

    useEffect(() => {
        noticeListState.refetch();
    }, []);

    const closeModal = () => {
        setMakeNotice(false);
        updateClickState({clickState:''});
    };


    return(
        <GroupNoticeList_Container>
            <div>{makeNotice && <MakeNotice onClose={closeModal} groupId={groupId} queryState={noticeListState}/>}</div>
            {noticeListState.data &&
                (noticeListState.data.map((notice) => (
                    (boardOption.search_keyWord==='' ?
                        <GroupNoticeListView_Li key={notice.noticeId}
                                  onClick={() => {}}>
                            <GroupNoticeListTitle $subScreenWidth={subWidth}>
                                {notice.noticeTitle}
                            </GroupNoticeListTitle>
                            <MiniText>{AHMFormat(changeDateForm(notice.noticeCreated))}</MiniText>
                        </GroupNoticeListView_Li>
                    :   (notice.noticeTitle.includes(boardOption.search_keyWord)) &&
                        <GroupNoticeListView_Li key={notice.noticeId}
                                                onClick={() => {}}>
                            <GroupNoticeListTitle $subScreenWidth={subWidth}>
                                {notice.noticeTitle}
                            </GroupNoticeListTitle>
                            <MiniText>{AHMFormat(changeDateForm(notice.noticeCreated))}</MiniText>
                        </GroupNoticeListView_Li>
                    )
                )))
            }
        </GroupNoticeList_Container>
    )
}
export default connect(mapStateToBoardOptionProps,mapDispatchToBoardOptionProps) (Notice);