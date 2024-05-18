import {useEffect, useLayoutEffect, useState} from "react";
import {AHMFormat, changeDateForm} from '../../../../shared/lib';
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
import {BoardParamMap} from "../../../../store/module/StompMiddleware";
import NoticeDetail from "./NoticeDetail";
import {NoticeList} from "../../../../store/ReactQuery/queryInterface";
import {CreateNoticeModal} from "../../../../widgets/makeNotice";

interface SubScreenProps {
    groupId: string,
    subWidth: number
}

type NoticeProps = SubScreenProps & BoardOptionState & DispatchBoardOptionProps


const Notice: React.FC<NoticeProps> = ({groupId, subWidth, boardOption, updateClickState, updateBoardParam}) => {
    const [makeNotice, setMakeNotice] = useState(false);

    useEffect(() => {
        if (boardOption.clickState === "add") {
            setMakeNotice(true);
        }
    }, [boardOption.clickState]);

    const noticeListState = useFetchNoticeList(groupId)

    useEffect(() => {
        checkNoticeParam()
        noticeListState.refetch();
    }, []);

    const closeModal = () => {
        setMakeNotice(false);
        updateClickState({clickState: ''});
    };

    const checkNoticeParam = () => {

        const noticeParam = BoardParamMap.get(`${groupId}Notice`);
        if (noticeParam) {
            updateBoardParam({noticeParam: noticeParam});
        } else {
            updateBoardParam({noticeParam: ""});
        }
    }

    const sortNotice = (noticeListState: NoticeList[]): NoticeList[] => {
        return noticeListState.sort((a: NoticeList, b: NoticeList) => {
            return (+changeDateForm(b.noticeCreated)) - (+changeDateForm(a.noticeCreated))
        })
    }

    const redirectDetail = (param: string) => {
        BoardParamMap.set(`${groupId}Notice`, param);
        updateBoardParam({noticeParam: param});
    }

    return (
        <GroupNoticeList_Container>
            {boardOption.noticeParam === '' ?
                <div>
                    <div>{makeNotice && <CreateNoticeModal onClose={closeModal}/>}</div>
                    {noticeListState.data &&
                        (sortNotice(noticeListState.data).map((notice) => (
                            (boardOption.search_keyWord === '' ?
                                    <GroupNoticeListView_Li key={notice.noticeId}
                                                            onClick={() => {
                                                                redirectDetail(notice.noticeId)
                                                            }}>
                                        <GroupNoticeListTitle $subScreenWidth={subWidth}>
                                            {notice.noticeTitle}
                                        </GroupNoticeListTitle>
                                        <MiniText>{AHMFormat(changeDateForm(notice.noticeCreated))}</MiniText>
                                    </GroupNoticeListView_Li>
                                    : (notice.noticeTitle.includes(boardOption.search_keyWord)) &&
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
                <NoticeDetail noticeId={boardOption.noticeParam} subWidth={subWidth}/>
            }
        </GroupNoticeList_Container>
    )
}
export default connect(mapStateToBoardOptionProps, mapDispatchToBoardOptionProps)(Notice);