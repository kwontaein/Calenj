import {useConfirm} from "../../../../../shared/model";
import {postNotice} from "../api/createNoticeApi";
import {UseQueryResult} from "@tanstack/react-query";

export const createNotice = (title: string,content: string, onClose:()=>void, groupId: string, queryState: UseQueryResult) => {
    if (content !== '' && title !== '') {
        useConfirm(`공지를 등록하시겠습니까??`,
            () => postNotice({title, content,onClose, groupId, queryState}),
            () => {
        });
    } else if (content === '') {
        window.alert('내용을 입력해주세요.');
    } else {
        window.alert('제목을 입력해주세요.');
    }
};