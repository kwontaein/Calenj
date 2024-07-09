import axios, {AxiosResponse} from "axios";
import {UserInfo} from "../model/types";

export const getUserProfileApi = async (userId: string): Promise<UserInfo> => {
    const res = await axios.post(`/api/getFriendUserProfile`, {userId: userId});
    return res.data;
}