import React from "react";
import {
    GroupNoticeListTitle,
    GroupNoticeListView_Li
} from "../../../style/Group/GroupNoticeStyle";
import {AHMFormat, changeDateForm} from '../../../shared/lib';
import {NoticeList} from "../../../store/ReactQuery/queryInterface";
import {MiniText} from '../../../style/FormStyle'

interface NoticeListItemProps {
    notice: NoticeList;
    subWidth: number;
    boardOption: any; // 실제 타입으로 변경
    redirectDetail: () => void;
}

const NoticeListItem: React.FC<NoticeListItemProps> = ({notice, subWidth, boardOption, redirectDetail}) => {
    return (
        (boardOption.search_keyWord === '' || notice.noticeTitle.includes(boardOption.search_keyWord)) && (
            <GroupNoticeListView_Li onClick={redirectDetail}>
                <GroupNoticeListTitle $subScreenWidth={subWidth}>
                    {notice.noticeTitle}
                </GroupNoticeListTitle>
                <MiniText>{AHMFormat(changeDateForm(notice.noticeCreated))}</MiniText>
            </GroupNoticeListView_Li>
        )
    );
};

export default NoticeListItem;
