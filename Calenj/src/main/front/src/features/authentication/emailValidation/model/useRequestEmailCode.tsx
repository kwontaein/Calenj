import {reqestEmailCodeApi} from "../api/reqestEmailCodeApi";
import {getExpirationTimeApi} from "../api/getExpirationTimeApi";
import {useDispatch} from "react-redux";
import {updateToken} from "../../../../entities/redux/slice/EmailValidationSlice";

export const useRequestEmailCode = () => {
    const dispatch = useDispatch();

    const requestEmailCode = async (email: string, isValid: boolean, updateValidState: () => void) => {
        try {
            const res = await reqestEmailCodeApi(email, isValid);
            if (res !== 200) return;
            updateValidState();
            const expirationTime = await getExpirationTimeApi();
            if (typeof expirationTime === "number") {
                dispatch(updateToken({ tokenId: "tokenUUID", validateTime: expirationTime }));
            }
        } catch (error) {
            console.error('Error requesting email code:', error);
        }
    };

    return { requestEmailCode };
};