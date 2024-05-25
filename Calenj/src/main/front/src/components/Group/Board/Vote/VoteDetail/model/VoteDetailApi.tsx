import axios, {AxiosError} from "axios";
import {TimeOperation} from "../../../../../../shared/lib";
import {jwtFilter} from "../../../../../../entities/authentication/jwt";
import {BeforCheckVoter} from "./BeforeCheckVoter";
import {voteChoiceResponse, VoteDetails} from "../types";
import {checkVoteEnd} from "./checkVoteEnd";

export function getVoteDetail(
    voteId: string,
    setDetail: (detail: VoteDetails) => void,
    setVoteEnd: (end: boolean) => void,
    setIsLoading: (loading: boolean) => void,
    setVoted: (voted: voteChoiceResponse[]) => void,
    setMyVote: (myVote: boolean[]) => void,
    setDbMyVoter: (dbMyVoter: boolean) => void
) {
    axios.post('/api/voteDetail', null, {
        params: {voteId},
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then(response => {
            const voteDetail = response.data;
            BeforCheckVoter(voteDetail.voteChoiceResponse, setVoted, setMyVote, setDbMyVoter);
            TimeOperation(voteDetail.voteEndDate);
            setDetail(voteDetail);
            setVoteEnd(checkVoteEnd(voteDetail.voteEndDate));
            setIsLoading(true);
        })
        .catch(error => {
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if (axiosError.response?.data) {
                jwtFilter((axiosError.response.data) as string);
            }
        });
}
