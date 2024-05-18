import axios from "axios";

export const checkEmailValidApi = async():Promise<boolean> =>{
    try {
        const response = await axios.get<boolean>('/api/emailValidationState');
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
