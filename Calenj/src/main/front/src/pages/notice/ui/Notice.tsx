import {useEffect, useState} from "react";
import {useFetchNoticeList} from "../../../entities/ReactQuery/index";
import {GroupNoticeList_Container,} from "../../../style/Group/GroupNoticeStyle";
import {
    BoardOptionState,
    DispatchBoardOptionProps,
    mapDispatchToBoardOptionProps,
    mapStateToBoardOptionProps
} from "../../../store/slice/BoardOptionSlice";
import {connect} from "react-redux";
import {checkNoticeParam, redirectDetail, sortNotice} from "../../../features/notice/noticeInfo";
import NoticeListItem from "./NoticeListItem"
import {NoticeDetailInfo, SubScreenProps} from "../../../widgets/noticeDetail";
import {CreateNoticeModal} from "../../../widgets/notice";

type NoticeProps = SubScreenProps & BoardOptionState & DispatchBoardOptionProps
const Notice: React.FC<NoticeProps> = ({groupId, subWidth, boardOption, updateClickState, updateBoardParam}) => {
    const [makeNotice, setMakeNotice] = useState(false);

    useEffect(() => {
        if (boardOption.clickState === "add") {
            setMakeNotice(true);
        }
    }, [boardOption.clickState]);

    //공지 목록 읽어오기
    const noticeListState = useFetchNoticeList(groupId)

    useEffect(() => {
        checkNoticeParam(groupId, updateBoardParam)
        noticeListState.refetch();
    }, []);

    //모달 닫기
    const closeModal = () => {
        setMakeNotice(false);
        updateClickState({clickState: ''});
    };

    return (
        <GroupNoticeList_Container>
            {boardOption.noticeParam === '' ?
                <div>
                    <div>{makeNotice && <CreateNoticeModal onClose={closeModal}/>}</div>
                    {noticeListState.data &&
                        (sortNotice(noticeListState.data).map((notice) => (
                            <NoticeListItem
                                key={notice.noticeId}
                                notice={notice}
                                subWidth={subWidth}
                                boardOption={boardOption}
                                redirectDetail={() => redirectDetail(notice.noticeId, groupId, updateBoardParam)}
                            />
                        )))
                    }
                </div> : <NoticeDetailInfo noticeId={boardOption.noticeParam} subWidth={subWidth}/>
            }
        </GroupNoticeList_Container>
    )
}
export const NoticeInfo = connect(mapStateToBoardOptionProps, mapDispatchToBoardOptionProps)(Notice);