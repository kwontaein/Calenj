import axios, {AxiosError} from "axios";
import {jwtFilter} from "../../../../entities/authentication/jwt";

export const responseFriendApi = (friendUserId: string, isAccept: string):Promise<void> => {
    return axios.post('/api/myResponse', {
            friendUserId: friendUserId,
            isAccept: isAccept,
        }) // 객체의 속성명을 'id'로 설정;
            .then(() => window.alert(`친구 요청을 ${isAccept === "ACCEPT" ? "수락" : "거절"}했습니다.`))
            .catch((error) => {
                window.alert('응답에 실패했습니다.');
                const axiosError = error as AxiosError;
                console.log(axiosError);
                if (axiosError.response?.status) {
                    console.log(axiosError.response.status);
                    jwtFilter((axiosError.response.status).toString());
                }
            })
}