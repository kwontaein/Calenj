import {BoardParamMap} from "../../../../../../entities/redux/module/StompMiddleware";
import {updateBoardParam} from "../../../../../../entities/redux/slice/BoardOptionSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../entities/redux/store";
import {string} from "yup";

export const useNoticeOption = ():[()=>void,(param:string)=>void] =>{
    const groupId = useSelector((state:RootState)=> state.subNavigateInfo.param)
    const dispatch = useDispatch();
    const checkNoticeParam = () => {
        const noticeParam = BoardParamMap.get(`${groupId}Notice`);
        if (noticeParam) {
            dispatch(updateBoardParam({noticeParam: noticeParam}));
        } else {
            dispatch(updateBoardParam({noticeParam: ""}));
        }
    }
    const redirectDetail = (param: string) => {
        BoardParamMap.set(`${groupId}Notice`, param);
        dispatch(updateBoardParam({noticeParam: param}));
    }

    return [checkNoticeParam, redirectDetail]
}
