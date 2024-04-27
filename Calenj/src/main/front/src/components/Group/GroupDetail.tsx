import React, {useEffect, useRef, useState} from 'react';
import {QueryState, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query';
import axios, {AxiosResponse, AxiosError} from 'axios';
import Notice from './Notice/Notice'
import {DEFAULT_HR, GROUP_USER_LIST, ListView, RowFlexBox} from '../../style/FormStyle'
import Vote from "./Vote/Vote";
import Invite from "./Invite/Invite"
import {stateFilter} from '../../stateFunc/actionFun';
import GroupMsgBox from '../MessageBox/MessageContainer';
import { QUERY_GROUP_DETAIL_KEY} from "../../store/ReactQuery/QueryKey";
import group from "./index";
import iterateFieldsByAction from "react-hook-form/dist/logic/iterateFieldsByAction";


interface NavigationProps {
    groupId: string
}
interface groupDetails {
    groupId: string;
    groupTitle: string;
    groupCreated: string;
    groupCreater: string;
    members: groupMembers[];
}

interface groupMembers {
    groupRoleType: String;
    group_user_location: String;
    nickName: String;
    onlineStatus: string;
    userEmail: string;
}



/* console = window.console || {};  //콘솔 출력 막는 코드.근데 전체 다 막는거라 걍 배포할때 써야할듯
 console.log = function no_console() {}; // console log 막기
 console.warn = function no_console() {}; // console warning 막기
 console.error = function () {}; // console error 막기*/
const GroupDetail: React.FC<NavigationProps> = ({groupId}) => {
    const [groupDetail,setGroupDetail] = useState<groupDetails>();
    const queryClient = useQueryClient();

    //그룹 디테일 불러오기
    useEffect(() => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,groupId]));
    }, [queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,groupId])]);


    return (
        <div>
            {groupDetail && (
                <div>
                    <div key={groupDetail.groupId}>
                        <div>방아이디: {groupDetail.groupId.toString().slice(0, 9).padEnd(20, '*')}</div>
                        <RowFlexBox style={{justifyContent: 'space-between'}}>
                            <div>방이름: {groupDetail.groupTitle}</div>
                            <div><Invite groupId={groupId}/></div>
                        </RowFlexBox>
                    </div>
                    <DEFAULT_HR/>
                    <div>
                        <GROUP_USER_LIST>
                            {groupDetail.members.map((member) => (
                                <ListView key={member.userEmail}>
                                    {localStorage.getItem(`userId`) === member.userEmail ?
                                        <span>(나) {member.nickName} </span> :
                                        <span>{member.nickName} </span>}
                                    {member.onlineStatus === 'ONLINE' ?
                                        <span style={{color: "green"}}> ● </span> :
                                        <span style={{color: "red"}}> ● </span>
                                    }
                                </ListView>
                            ))}
                        </GROUP_USER_LIST>
                    </div>
                    <DEFAULT_HR/>
                    <GroupMsgBox param={groupDetail.groupId}
                                 target={'group'}/>
                    <DEFAULT_HR/>
                    <div>
                        <Notice/>
                        <DEFAULT_HR/>
                        <Vote member={groupDetail.members.length}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GroupDetail;