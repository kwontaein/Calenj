import {updateBoardParam, BoardParamMap, RootState} from "../../../../../../entities/redux";
import {useDispatch, useSelector} from "react-redux";

import {string} from "yup";

export const useNoticeOption = ():[()=>void,(param:string)=>void] =>{
    const groupId = useSelector((state:RootState)=> state.subNavigation.group_subNavState.param)
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
