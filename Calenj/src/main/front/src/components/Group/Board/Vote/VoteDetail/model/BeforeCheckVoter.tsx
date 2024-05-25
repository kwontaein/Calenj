import {voteChoiceResponse} from "../types";

export const BeforCheckVoter = (
    voteList: voteChoiceResponse[],
    setVoted: (voted: voteChoiceResponse[]) => void,
    setMyVote: (myVote: boolean[]) => void,
    setDbMyVoter: (dbMyVoter: boolean) => void
) => {
    let newList = voteList.sort((a, b) => a.voteIndex - b.voteIndex);
    let userVoter = new Array(voteList.length).fill(false);
    let userEmail = localStorage.getItem('userId');
    newList.forEach((item, index) => {
        item.voter.forEach(voter => {
            if (voter === userEmail?.toString()) {
                userVoter[index] = true; // 내가 투표한 게 있는지 체크
            }
        });
    });
    setVoted(newList);
    setMyVote(userVoter);
    setDbMyVoter(userVoter.includes(true)); // 내가 투표한 게 있는지 있으면 true
};
