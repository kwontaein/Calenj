import {groupMembers} from "../../../../entities/reactQuery";

export interface UserModalProps {
    user: groupMembers;
    onClose: () => void; // onClose prop 추가
}


export interface Profile {
    introduce: string;    // 소개
    joinDate: string;    // 가입일
    sameGroup: string[];// 같이 있는 그룹
    chatUUID: number;// 개인 메세지 버튼
}