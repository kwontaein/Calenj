export interface VoteContent {
    id: number,
    content: string,
}

export interface PostVoteData{
    groupId: string,
    voteCreated: string,
    voteTitle: string,
    voteEndDate: string,
    isMultiple: boolean,
    anonymous: boolean,
    postedVoteChoiceDTO: string[]
}