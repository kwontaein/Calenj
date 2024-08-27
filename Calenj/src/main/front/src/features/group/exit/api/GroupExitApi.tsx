import axios, {AxiosResponse} from "axios";

export const groupExitApi = (groupId: string): Promise<AxiosResponse<any>> => {
    return axios.post('/api/exitGroup', {
        groupId: groupId,
        during: 7
    })
}