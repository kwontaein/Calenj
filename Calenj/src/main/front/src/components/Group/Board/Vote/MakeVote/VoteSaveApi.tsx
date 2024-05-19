import {saveDBFormat} from "../../../../../shared/lib";
import axios, {AxiosError} from "axios";
import {jwtFilter} from "../../../../../entities/authentication/jwt";
import {VoteContent} from "../../../../../features/vote/makeVote";

interface VoteDto {
    voteList: VoteContent[],
    groupId: string,
    voteTitle: string,
    isMultiple: boolean,
    anonymous: boolean,
    selectedDate: Date,
    onClose: () => void,
}

export const postVote = async ({
                                   voteList,
                                   groupId,
                                   voteTitle,
                                   isMultiple,
                                   anonymous,
                                   selectedDate,
                                   onClose
                               }: VoteDto): Promise<void> => {
    const data = {
        dto1: {
            groupId: groupId,
            voteCreated: saveDBFormat(new Date()),
            voteTitle: voteTitle,
            voteEndDate: saveDBFormat(selectedDate as Date),
            isMultiple: isMultiple,
            anonymous: anonymous,
            postedVoteChoiceDTO: voteList.map(item => item.content)
        }
    };
    axios.post('api/makeVote', data.dto1)
        .then((res) => {
            window.alert('투표를 생성했습니다.')
            onClose();
        })
        .catch((error) => {
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if (axiosError.response?.data) {
                jwtFilter((axiosError.response.data) as string);
            }
        })
}

