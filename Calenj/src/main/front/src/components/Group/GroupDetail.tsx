import React, {useLayoutEffect, useRef, useState} from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {useLocation} from 'react-router-dom';
import {useId} from 'react';
import Chatting from "../../Test/Chatting";
import Notice from './Notice/Notice'
import {ListView} from '../../style/FormStyle'
import Vote from "./Vote/Vote";
import Invite from "./Invite/Invite"
import {connect} from "react-redux";
import{ DispatchProps,updateTopic,updateApp,sendStompMsg,receivedStompMsg,StompState,mapDispatchToProps}  from '../../store/module/StompReducer';
import {stateFilter} from '../../stateFunc/actionFun'


interface Details {
    groupId: number;
    groupTitle: string;
    groupCreated: string;
    groupCreater: string;
    members:Members[];
}

interface Members {
    groupRoleType: String;
    group_user_location: String;
    nickName: String;
    onlineStatus: string;
    userEmail:string;
}


interface Message{
    from:string;
    message:string;
}

const QUERY_GROUP_DETAIL_KEY = 'groupDetail'

/* console = window.console || {};  //콘솔 출력 막는 코드.근데 전체 다 막는거라 걍 배포할때 써야할듯
 console.log = function no_console() {}; // console log 막기
 console.warn = function no_console() {}; // console warning 막기
 console.error = function () {}; // console error 막기*/
const GroupDetail :React.FC<DispatchProps>=({updateTopic})=>{
    const [detail, setDetail] = useState<Details | null>(null);
    const [members, setMembers] = useState<Members[] | null>(null);
    const location = useLocation();
    const groupInfo = {...location.state};
    const id = useId();




    // 컴포넌트가 마운트될 때 Stomp 클라이언트 초기화 및 설정
    //컴포넌트가 랜더링 전에 다른 컴포넌트의 랜더링을 막음
    useLayoutEffect(() => {
        // let State = initializeStompChannel();
        // State.next();
        // const dispatch = useDispatch();
        // dispatch(restartSaga());
        updateTopic({topicLogic:'userOnline',params:groupInfo.groupId,target:'groupId'})

        return;

    }, []);

    //그룹 목록 불러오기
    const getGroupList = async (): Promise<Details | null> => {
        try {
            const response = await axios.post('/api/groupDetail', null, {
                params: {
                    groupId: groupInfo.groupId
                },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }) // 객체의 속성명을 'id'로 설정;
            const data = response.data as Details;
            console.log(data)
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
        queryKey: [QUERY_GROUP_DETAIL_KEY,groupInfo.groupId],
        queryFn: getGroupList, //HTTP 요청함수 (Promise를 반환하는 함수)
    });


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
        {/* <div>
            {detail !== null && (
                <div key={detail.groupId}>
                    <div>Group Detail ID: {detail.groupId}</div>
                    <div>Group Detail Title: {detail.groupTitle}</div>
                </div>
            )}
        </div> */}
        {groupDetailState.isLoading && <div>Loading...</div>}
        {groupDetailState.data && (
            <div>
                <div key={groupDetailState.data.groupId}>
                    <div>Group Detail ID: {groupDetailState.data.groupId}</div>
                    <div>Group Detail Title: {groupDetailState.data.groupTitle}</div>
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

                <div>
                    <Chatting groupName={groupDetailState.data.groupTitle} groupId={groupDetailState.data.groupId}/>
                </div>
                <hr/>
                <div>
                    <Invite groupId={groupInfo.groupId}/>
                </div>
                <hr/>
                <div>
                    <Notice/>
                    <Vote/>
                </div>
            </div>
        )}
    </div>
    );
}

export default connect(null,mapDispatchToProps) (GroupDetail);