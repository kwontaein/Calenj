import axios from 'axios';
import {jwtFilter} from '../../../../entities/authentication/jwt';
import {saveDBFormat} from "../../../../shared/lib";

<<<<<<<< HEAD:Calenj/src/main/front/src/features/group/notice/api/createNoticeApi.ts
export const postNotice = async ({title, content, groupId, onClose, queryState}: {
    title: string;
    content: string;
    groupId: string;
    onClose : ()=>void;
    queryState: any;
========
export const postNotice = async ({title, content, groupId, queryState, onClose}: {
    title: string;
    content: string;
    groupId: string;
    queryState: any;
    onClose: () => void;
>>>>>>>> origin/SeungJae:Calenj/src/main/front/src/features/notice/createNotice/api/noticeApi.ts
}) => {
    const createDate = saveDBFormat(new Date());
    try {
        const response = await axios.post('api/makeNotice', {
            noticeTitle: title,
            noticeContent: content,
            noticeCreated: createDate,
            groupId
        });
        window.alert('공지를 생성했습니다.');
        onClose()
        queryState.refetch();
        onClose();
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error);
            if (error.response?.data) {
                jwtFilter(error.response.data as string);
            }
        }
    }
};
