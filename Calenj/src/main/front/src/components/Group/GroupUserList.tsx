import React, {useEffect, useRef, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {useId} from 'react';
import Notice from './Notice/Notice'
import {DEFAULT_HR, GROUP_USER_LIST, ListView, RowFlexBox} from '../../style/FormStyle'
import Vote from "./Vote/Vote";
import Invite from "./Invite/Invite"
import {connect} from "react-redux";
import {stateFilter} from '../../stateFunc/actionFun';
import {DispatchStompProps, mapDispatchToStompProps} from '../../store/module/StompReducer';
import GroupMsgBox from '../MessageBox/MessageContainer';
import {endPointMap} from '../../store/module/StompMiddleware';
import {QUERY_GROUP_DETAIL_KEY} from "../../store/ReactQuery/QueryKey";
import group from "./index";

interface Details {
    groupId: number;
    groupTitle: string;
    groupCreated: string;
    groupCreater: string;
    members: Members[];
}

interface Members {
    groupRoleType: String;
    group_user_location: String;
    nickName: String;
    onlineStatus: string;
    userEmail: string;
}

interface NavigationProps {
    groupDetailState: Details
}

const GroupUserList: React.FC<DispatchStompProps & NavigationProps> = ({groupDetailState}) => {
    return (
        <GROUP_USER_LIST>
            {groupDetailState.members.map((member) => (
                <ListView key={member.userEmail}>
                    {localStorage.getItem(`userId`) === member.userEmail ?
                        <span>(나) {member.nickName} </span> :
                        <span>{member.nickName} </span>}
                    {member.onlineStatus === 'ONLINE' ?
                        <span style={{color: "green"}}> ● </span> :
                        <span style={{color: "red"}}> ● </span>
                    }
                </ListView>))}
        </GROUP_USER_LIST>
    );
}

export default connect(null, mapDispatchToStompProps)(GroupUserList);