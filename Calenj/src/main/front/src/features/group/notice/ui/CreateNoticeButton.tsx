import React from 'react';
import {CheckCondition_Button} from '../../../../style/FormStyle';
import {createNotice} from '../model/createNotice';
import {useFetchNoticeList} from "../../../../entities/ReactQuery";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {updateClickState} from "../../../../store/slice/BoardOptionSlice";
import {NoticeButtonsProps} from "../model/types";



export const CreateNoticeButton: React.FC<NoticeButtonsProps> = ({title,content}) => {
    const {param} = useSelector((state:RootState)=> state.subNavigateInfo)
    const dispatch = useDispatch()
    const onClose = ()=>{
        dispatch(updateClickState({clickState: ''}))
    }

    const noticeListState = useFetchNoticeList(param)
    return (
        <CheckCondition_Button $isAble={content !== '' && title !== ''} onClick={() => {
            createNotice(title, content, onClose, param,  noticeListState)
        }}>
            등록
        </CheckCondition_Button>
    );
};
