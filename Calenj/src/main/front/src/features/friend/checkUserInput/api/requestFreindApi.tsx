import axios, {AxiosResponse} from "axios";

export const requestFriendApi = async (friendUserId:string) :Promise<CheckUserName> => {
    return axios.post('/api/requestFriend', {friendUserId: friendUserId}) // 객체의 속성명을 'id'로 설정;
            .then((res:AxiosResponse) => {
                return res.data
            })
            .catch((error) => {
                window.alert('알 수 없는 오류가 발생했습니다. 관리자에게 문의해주세요.');
            })
    }
