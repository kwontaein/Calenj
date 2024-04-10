import React, {useLayoutEffect, useRef, useState} from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {useLocation} from 'react-router-dom';
import {useId} from 'react';
import Chatting from "../../Test/Chatting";
import Notice from './Notice/Notice'
import {ListView, RowFlexBox} from '../../style/FormStyle'
import Vote from "./Vote/Vote";
import Invite from "./Invite/Invite"
import {connect} from "react-redux";
import {stateFilter} from '../../stateFunc/actionFun';
import MessageDisplay from "../../store/module/MessageDispay";
import {
    DispatchStompProps,
    StompData,
    mapDispatchToStompProps,
    mapStateToStompProps, updateDestination, updateOnline
} from '../../store/module/StompReducer';
import {RootState} from "../../store/store";


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


interface Message {
    from: string;
    message: string;
}

const QUERY_GROUP_DETAIL_KEY = 'groupDetail'

/* console = window.console || {};  //콘솔 출력 막는 코드.근데 전체 다 막는거라 걍 배포할때 써야할듯
 console.log = function no_console() {}; // console log 막기
 console.warn = function no_console() {}; // console warning 막기
 console.error = function () {}; // console error 막기*/
const GroupDetail: React.FC<DispatchStompProps & StompData> = ({sendStompMsg, receivedStompMsg}) => {
    const location = useLocation();
    const groupInfo = {...location.state};
    const id = useId();


    // 컴포넌트가 마운트될 때 Stomp 클라이언트 초기화 및 설정
    //컴포넌트가 랜더링 전에 다른 컴포넌트의 랜더링을 막음
    useLayoutEffect(() => {
        // updateTopic({topicLogic:'userOnline',params:groupInfo.groupId,target:'groupId'})
        return;

    }, []);

    //그룹 디테일 불러오기
    const getGroupList = async (): Promise<Details | null> => {
        try {
            const response = await axios.post('/api/groupDetail', {
                groupId: groupInfo.groupId
            }) // 객체의 속성명을 'id'로 설정;
            const data = response.data as Details;
            return data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if (axiosError.response?.status) {
                console.log(axiosError.response.status);
                stateFilter((axiosError.response.status).toString());
            }
            return null;
        }
    }


    const groupDetailState = useQuery<Details | null, Error>({
        queryKey: [QUERY_GROUP_DETAIL_KEY, groupInfo.groupId],
        queryFn: getGroupList, //HTTP 요청함수 (Promise를 반환하는 함수)
    });

    const sendMsg = () => {
        if (groupDetailState.data) {
            sendStompMsg({target: 'groupMsg', params: groupDetailState.data.groupId, message: '강승재 븅진 ㅋㅋ'})
        }
        console.log('ㅎㅇ')
    }


    const onlineCheck = (isOnline: string): string => {
        let status;
        switch (isOnline) {
            case "ONLINE":
                status = '온라인';
                break;
            case "SLEEP":
                status = '자리비움';
                break;
            case "TOUCH":
                status = '방해금지';
                break;
            default:
                status = '오프라인';
        }
        return status
    }

    return (
        <div>
            {groupDetailState.isLoading && <div>Loading...</div>}
            {groupDetailState.data && (
                <div>
                    <div key={groupDetailState.data.groupId}>
                        <div>방아이디: {groupDetailState.data.groupId.toString().slice(0, 9).padEnd(20, '*')}</div>
                        <RowFlexBox style={{justifyContent: 'space-between'}}>
                            <div>방이름: {groupDetailState.data.groupTitle}</div>
                            <div><Invite groupId={groupInfo.groupId}/></div>
                        </RowFlexBox>
                    </div>
                    <div>
                        <ul>
                            {groupDetailState.data.members.map((member) => (
                                <ListView key={member.userEmail}>
                                    {member.nickName} : {onlineCheck(member.onlineStatus)}
                                </ListView>
                            ))}
                        </ul>
                    </div>
                    <div onClick={() => {
                        sendMsg()
                    }}>
                        타겟설정
                    </div>
                    <hr/>
                    <div>
                        <MessageDisplay
                            receivedStompMsg={receivedStompMsg}
                            groupId={groupDetailState.data.groupId}
                        />
                    </div>
                    <hr/>
                    <div>
                        <Notice/>
                        <Vote member={groupDetailState.data.members.length}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default connect(mapStateToStompProps, mapDispatchToStompProps)(GroupDetail);