import {useConfirm} from "../../../../shared/model";
export const closeEmailValidModal = (onClose:()=>void):()=>void =>{
    return () => {
        const cancel = () => console.log("취소");
        useConfirm(`인증을 취소하시겠습니까?`, onClose, cancel);
    }
}
