import {useEffect, useLayoutEffect, useState} from "react";
import {AHMFormat, changeDateForm} from '../../../../shared/lib';
import {FullScreen_div, MiniText} from '../../../../style/FormStyle'
import {useFetchNoticeList} from "../../../../entities/ReactQuery";
import {
    GroupNoticeList_Container,
    GroupNoticeListTitle, GroupNoticeListView_Li,
} from "./NoticeListStyled";
import {useSelector} from "react-redux";
import {NoticeDetailView} from './NoticeDetail'
import {NoticeModal} from './NoticeModal'
import {RootState} from "../../../../store/store";
import {useNoticeOption} from "../model/useNoticeOption";
import {sortNotice} from "../lib/sortNotice";
import {SubScreenProps} from "../model/types";




export const Notice: React.FC<SubScreenProps> = ({groupId, subWidth}) => {
    const {clickState, noticeParam, search_keyWord} = useSelector((state:RootState)=>state.boardOption);
    const [checkNoticeParam,redirectDetail] =useNoticeOption()
    
    const noticeListState = useFetchNoticeList(groupId)


    useEffect(() => {
        checkNoticeParam()
        noticeListState.refetch();
    }, []);

    return (
        <GroupNoticeList_Container>
            {noticeParam === '' ?
                <div>
                    {clickState==="add" && <NoticeModal/>}
                    {noticeListState.data &&
                        (sortNotice(noticeListState.data).map((notice) => (
                            (search_keyWord === '' ?
                                    <GroupNoticeListView_Li key={notice.noticeId}
                                                            onClick={() => {
                                                                redirectDetail(notice.noticeId)
                                                            }}>
                                        <GroupNoticeListTitle $subScreenWidth={subWidth}>
                                            {notice.noticeTitle}
                                        </GroupNoticeListTitle>
                                        <MiniText>{AHMFormat(changeDateForm(notice.noticeCreated))}</MiniText>
                                    </GroupNoticeListView_Li>
                                    : (notice.noticeTitle.includes(search_keyWord)) &&
                                    <GroupNoticeListView_Li key={notice.noticeId}
                                                            onClick={() => {
                                                                redirectDetail(notice.noticeId)
                                                            }}>
                                        <GroupNoticeListTitle $subScreenWidth={subWidth}>
                                            {notice.noticeTitle}
                                        </GroupNoticeListTitle>
                                        <MiniText>{AHMFormat(changeDateForm(notice.noticeCreated))}</MiniText>
                                    </GroupNoticeListView_Li>
                            )
                        )))
                    }
                </div>
                :
                <NoticeDetailView noticeId={noticeParam} subWidth={subWidth}/>
            }
        </GroupNoticeList_Container>
    )
}