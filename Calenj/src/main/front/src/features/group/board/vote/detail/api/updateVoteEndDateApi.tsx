import axios, {AxiosResponse} from "axios";
import {saveDBFormat} from "../../../../../../shared/lib";

export const updateVoteEndDateApi = (voteId:string): Promise<AxiosResponse<any>> =>{
    return axios.post('/api/updateVoteEndDate',{
        voteId: voteId,
        voteEndDate:saveDBFormat(new Date())
    })
}