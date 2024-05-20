import {useConfirm} from "../../../shared/model";
import {postNotice} from "../api/noticeApi";
import {UseQueryResult} from "@tanstack/react-query";

export const createNotice = (content: string, title: string, groupId: string, queryState: UseQueryResult) => {
    if (content !== '' && title !== '') {
        useConfirm(`공지를 등록하시겠습니까??`, () => postNotice({title, content, groupId, queryState}), () => {
        });
    } else if (content === '') {
        window.alert('내용을 입력해주세요.');
    } else {
        window.alert('제목을 입력해주세요.');
    }
};