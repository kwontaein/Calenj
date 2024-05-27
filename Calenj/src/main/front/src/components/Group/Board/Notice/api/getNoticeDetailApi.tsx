import axios, {AxiosError, AxiosResponse} from "axios";
import {jwtFilter} from "../../../../../entities/authentication/jwt";
import {NoticeDetail} from '../../../../../entities/ReactQuery'

export const getNoticeDetailApi = (noticeId:string) :Promise<NoticeDetail> =>{
        return axios.post('/api/noticeDetail', null, {
            params: {
                noticeId: noticeId
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
    // 객체의 속성명을 'id'로 설정

}