//types
import {UseQueryResult} from "@tanstack/react-query";

export interface ModalProps {
    onClose: () => void;
    groupId: string;
    queryState: UseQueryResult;
}

//types
export interface VoteContent {
    id: number,
    content: string,
}

