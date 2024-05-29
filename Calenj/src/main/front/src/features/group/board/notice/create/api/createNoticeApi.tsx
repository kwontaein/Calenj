import axios from 'axios';
import {jwtFilter} from '../../../../../../entities/authentication/jwt';
import {saveDBFormat} from "../../../../../../shared/lib";

export const postNotice = async ({title, content, groupId, onClose, queryState}: {
    title: string;
    content: string;
    groupId: string;
    onClose : ()=>void;
    queryState: any;
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
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error);
            if (error.response?.data) {
                jwtFilter(error.response.data as string);
            }
        }
    }
};
