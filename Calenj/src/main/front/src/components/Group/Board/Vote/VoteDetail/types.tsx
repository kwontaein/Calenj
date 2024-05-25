import React from "react";


export interface voteChoiceResponse {
    voteItem: string;
    voter: string[];
    voteIndex: number
}

export interface VoteDetails {
    voteCreater: string;
    voteTitle: string;
    voteCreated: string;
    voteEndDate: string;
    isMultiple: boolean;
    anonymous: boolean;
    voteWatcher: string[]
    voter: string[];
    countVoter: string[];
    voteChoiceResponse: voteChoiceResponse[];
}

export interface VoteDetailProps {
    //vote의 식별 id
    voteId: string;
    //전체 디테일정보
    detail: VoteDetails;
    //투표 목록별 값
    voteChoiceResponse: voteChoiceResponse[] | null;
    //사용자가 투표 현황
    myVote: boolean[];
    //처음 데이터를 불러올 때 사용자가 투표했는지 여부
    participation: boolean | undefined;
    //update이후 다시 가져오기 위한 함수
    refetchVoteDetail: () => void;
    //현재 클릭한 목록 수정
    pickVote: (e: React.ChangeEvent<HTMLInputElement>, isMultiple: boolean, myVote: boolean[],
               setMyVote: (myVote: boolean[]) => void,) => void
    viewVoterList: () => void;
    voteEnd: boolean;
    setMyVote: (myVote: boolean[]) => void;

}


export interface VoteListProps {
    voteId: string,
}
