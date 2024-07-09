import axios, {AxiosResponse} from "axios";
import {UserInfo} from "../../../user/userInfo";

export const getFriendUserProfileApi = async (userId: string): Promise<UserInfo> => {
    const res = await axios.post(`/api/getFriendUserProfile`, {userId: userId});
    return res.data;
}