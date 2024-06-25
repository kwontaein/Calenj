import {groupMembers} from "../../../../entities/reactQuery";

export interface UserModalProps {
    user: groupMembers;
    onClose: () => void; // onClose prop 추가
}
