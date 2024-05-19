import axios, {AxiosError} from "axios";
import {jwtFilter} from "../../../../entities/authentication/jwt";
import {NoticeDetails} from "../";

export function getNoticeDetail(detailMutate: (detail: NoticeDetails) => void, noticeId: string) {
    axios.post('/api/noticeDetail', null, {
        params: {
            noticeId: noticeId
        },
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }) // 객체의 속성명을 'id'로 설정
        .then(response => {
            detailMutate(response.data);
        })
        .catch(error => {
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if (axiosError.response?.data) {
                jwtFilter((axiosError.response.data) as string);
            }
        });
}