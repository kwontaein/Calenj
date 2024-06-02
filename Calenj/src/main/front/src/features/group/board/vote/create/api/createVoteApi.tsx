import {PostVoteData} from "../model/types";
import axios, {AxiosResponse} from "axios";

export const createVoteApi = (data:PostVoteData):Promise<AxiosResponse<any>> =>{
     return axios.post('api/makeVote', data)

}