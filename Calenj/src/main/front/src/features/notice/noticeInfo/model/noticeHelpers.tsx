import {BoardParamMap} from "../../../../store/module/StompMiddleware";
import {NoticeList} from "../../../../entities/ReactQuery/index";
import {changeDateForm} from '../../../../shared/lib';

export const checkNoticeParam = (groupId: string, updateBoardParam: any) => {
    const noticeParam = BoardParamMap.get(`${groupId}Notice`);
    if (noticeParam) {
        updateBoardParam({noticeParam: noticeParam});
    } else {
        updateBoardParam({noticeParam: ""});
    }
};

export const sortNotice = (noticeList: NoticeList[]): NoticeList[] => {
    return noticeList.sort((a: NoticeList, b: NoticeList) => {
        return (+changeDateForm(b.noticeCreated)) - (+changeDateForm(a.noticeCreated));
    });
};

export const redirectDetail = (noticeId: string, groupId: string, updateBoardParam: any) => {
    BoardParamMap.set(`${groupId}Notice`, noticeId);
    updateBoardParam({noticeParam: noticeId});
};
