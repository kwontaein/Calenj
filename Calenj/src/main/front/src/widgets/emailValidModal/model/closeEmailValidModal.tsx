import {useConfirm} from "../../../shared/model";
export const closeEmailValidModal = (onClose:()=>void):()=>void =>{
    return () => {
        const cancle = () => console.log("취소");
        useConfirm(`지금 나가시면 남은시간까지 인증번호를 보낼 수 없습니다.\n정말로 나가시겠습니까?`, onClose, cancle);
    }
}
