import axios from "axios";

export const requestFriendApi = (friendUserId: string, isAccept: string) =>{
    axios.post('/api/responseFriend', {
        friendUserId: friendUserId,
        isAccept: isAccept === "ACCEPT" ? 0 : 1
    }) // 객체의 속성명을 'id'로 설정;
        .then(() => window.alert(`친구 요청을 ${isAccept === "ACCEPT" ? "수락" : "거절"}했습니다.`))
        .catch((error) => {
            window.alert('응답에 실패했습니다.');
            console.log(error.response.status);
    })

}