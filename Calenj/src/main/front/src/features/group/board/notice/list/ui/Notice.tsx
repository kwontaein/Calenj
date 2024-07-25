import {useEffect, useLayoutEffect, useState} from "react";
import {AHMFormat, changeDateForm} from '../../../../../../shared/lib';
import {FullScreen_div, MiniText} from '../../../../../../shared/ui/SharedStyled'
import {useFetchNoticeList} from "../../../../../../entities/reactQuery";
import {
    GroupNoticeList_Container,
    GroupNoticeListTitle, GroupNoticeListView_Li,
} from "./NoticeListStyled";
import {useSelector} from "react-redux";
import {NoticeDetailView} from '../../detail'
import {NoticeModal} from '../../create'
import {RootState} from "../../../../../../entities/redux";
import {useNoticeOption} from "../model/useNoticeOption";
import {sortNotice} from "../lib/sortNotice";




export const Notice: React.FC = () => {
    const {clickState, noticeParam, search_keyWord} = useSelector((state:RootState)=>state.boardOption);
    const [checkNoticeParam,redirectDetail] =useNoticeOption()
    const {param} = useSelector((state:RootState) => state.subNavigation.group_subNavState)

    const noticeListState = useFetchNoticeList(param)


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
                                        <GroupNoticeListTitle>
                                            {notice.noticeTitle}
                                        </GroupNoticeListTitle>
                                        <MiniText>{AHMFormat(changeDateForm(notice.noticeCreated))}</MiniText>
                                    </GroupNoticeListView_Li>
                                    : (notice.noticeTitle.includes(search_keyWord)) &&
                                    <GroupNoticeListView_Li key={notice.noticeId}
                                                            onClick={() => {
                                                                redirectDetail(notice.noticeId)
                                                            }}>
                                        <GroupNoticeListTitle>
                                            {notice.noticeTitle}
                                        </GroupNoticeListTitle>
                                        <MiniText>{AHMFormat(changeDateForm(notice.noticeCreated))}</MiniText>
                                    </GroupNoticeListView_Li>
                            )
                        )))
                    }
                </div>
                :
                <NoticeDetailView noticeId={noticeParam}/>
            }
        </GroupNoticeList_Container>
    )
}
