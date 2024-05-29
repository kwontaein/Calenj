import axios, {AxiosError, AxiosResponse} from "axios";
import {jwtFilter} from "../../../../../../entities/authentication/jwt";
import {NoticeDetail} from '../../../../../../entities/reactQuery'

export const getNoticeDetailApi = async (noticeId:string) :Promise<NoticeDetail> =>{
        const response = await axios.post('/api/noticeDetail', null, {
            params: {
                noticeId: noticeId
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        return response.data
    // 객체의 속성명을 'id'로 설정

}