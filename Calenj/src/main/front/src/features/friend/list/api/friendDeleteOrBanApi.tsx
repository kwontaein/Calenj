import axios from "axios";

export const friendDeleteOrBanApi = (friendUserId: string, ban: boolean): Promise<void> => {
    return axios.post('api/deleteFriend', {friendUserId, ban})
}