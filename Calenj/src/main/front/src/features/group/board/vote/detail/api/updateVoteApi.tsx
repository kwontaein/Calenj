import axios, {AxiosResponse} from "axios";

export const updateVoteApi = (voteId:string,myVote: boolean[]) : Promise<AxiosResponse<any>> =>{
    return axios.post('/api/updateVote', {
        voteId: voteId,
        myVote: myVote,
    })
}