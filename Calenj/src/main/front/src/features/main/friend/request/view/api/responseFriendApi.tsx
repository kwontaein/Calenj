import axios from "axios";

export const responseFriendApi = (friendUserId: string, isAccept: string) => {
    axios.post('/api/myResponse', {
        friendUserId: friendUserId,
        isAccept: isAccept,
    }) // 객체의 속성명을 'id'로 설정;
        .then(() => window.alert(`친구 요청을 ${isAccept === "ACCEPT" ? "수락" : "거절"}했습니다.`))
        .catch((error) => {
            window.alert('응답에 실패했습니다.');
            console.log(error.response.status);
        })

}