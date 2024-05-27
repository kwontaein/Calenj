import {NoticeList} from "../../../../entities/ReactQuery";
import {changeDateForm} from "../../../../shared/lib";

export const sortNotice = (noticeListState: NoticeList[]): NoticeList[] => {
    return noticeListState.sort((a: NoticeList, b: NoticeList) => {
        return (+changeDateForm(b.noticeCreated)) - (+changeDateForm(a.noticeCreated))
    })
}