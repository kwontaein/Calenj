import axios from "axios";

export const addFriendApi = async (friendUserId:string) => {
    axios.post('/api/requestFriend', {friendUserId: friendUserId}) // 객체의 속성명을 'id'로 설정;
        .then(() => window.alert('친구 요청이 성공적으로 전송되었습니다.'))
        .catch((error) => {
            window.alert('존재하지 않는 아이디 같아요.');
            console.log(error.response.status);
        })
}
