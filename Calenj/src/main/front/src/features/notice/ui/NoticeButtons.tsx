import React from 'react';
import {CheckCondition_Button} from '../../../style/FormStyle';
import {createNotice} from '../model/createNotice';
import {mapStateToNavigationProps, NavigateState} from "../../../store/slice/NavigatgionSlice";
import {connect} from "react-redux";
import {useFetchNoticeList} from "../../../store/ReactQuery/queryManagement";

interface NoticeButtonsProps {
    title: string;
    content: string;
}

const NoticeButtons: React.FC<NavigateState & NoticeButtonsProps> = ({navigateInfo, title, content}) => {


    const noticeListState = useFetchNoticeList(navigateInfo.navigateParam)
    return (
        <CheckCondition_Button $isAble={content !== '' && title !== ''} onClick={() => {
            createNotice(title, content, navigateInfo.navigateParam, noticeListState)
        }}>
            등록
        </CheckCondition_Button>
    );
};

export const CreateBtn = connect(mapStateToNavigationProps, null)(NoticeButtons);
