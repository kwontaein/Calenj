import React from 'react';
import {CheckCondition_Button} from '../../../../style/FormStyle';
import {createNotice} from '../model/createNotice';
import {mapStateToNavigationProps, NavigateState} from "../../../../store/slice/NavigatgionSlice";
import {connect} from "react-redux";
import {useFetchNoticeList} from "../../../../entities/ReactQuery/index";
import {NoticeButtonsProps} from "../model/types";


const NoticeButtons: React.FC<NavigateState & NoticeButtonsProps> = ({navigateInfo, onClose, title, content}) => {


    const noticeListState = useFetchNoticeList(navigateInfo.navigateParam)
    return (
        <CheckCondition_Button $isAble={content !== '' && title !== ''} onClick={() => {
            createNotice(title, content, navigateInfo.navigateParam, noticeListState, onClose)
        }}>
            등록
        </CheckCondition_Button>
    );
};

export const CreateBtn = connect(mapStateToNavigationProps, null)(NoticeButtons);
