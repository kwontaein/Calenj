import React, {useLayoutEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {useId} from 'react';
import Chatting from "../../Test/Chatting";
import Notice from './Notice/Notice'
import SockJS from "sockjs-client";
import {ListView} from '../../style/FormStyle'
import Vote from "./Vote/Vote";
import Invite from "./Invite/Invite"

import {connect} from "react-redux";
import{ DispatchProps,updateTopic,updateApp,sendStompMsg,receivedStompMsg,StompState,mapDispatchToProps}  from '../../store/module/StompReducer';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import {RestartSaga} from '../../store/store'



interface Details {
    groupId: number;
    groupTitle: string;
    groupCreated: string;
    groupCreater: string;
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



/* console = window.console || {};  //콘솔 출력 막는 코드.근데 전체 다 막는거라 걍 배포할때 써야할듯
 console.log = function no_console() {}; // console log 막기
 console.warn = function no_console() {}; // console warning 막기
 console.error = function () {}; // console error 막기*/

    const [detail, setDetail] = useState<Details | null>(null);
    const [members, setMembers] = useState<Members[] | null>(null);
    const location = useLocation();
    const groupInfo = {...location.state};
    const id = useId();




    // 컴포넌트가 마운트될 때 Stomp 클라이언트 초기화 및 설정
    //컴포넌트가 랜더링 전에 다른 컴포넌트의 랜더링을 막음
    useLayoutEffect(() => {

        axios.post('/api/groupDetail', null, {
            params: {
                groupId: groupInfo.groupId
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }) // 객체의 속성명을 'id'로 설정
        .then(response => {
            console.log(response.data.members);
            setDetail(response.data);
            setMembers(response.data.members);
        })
        .catch(error => console.log(error));


        let unSubscribe;//구취기능
        RestartSaga();
        // let State = initializeStompChannel();
        // State.next();
        // const dispatch = useDispatch();
        // dispatch(restartSaga());
        updateTopic({topicLogic:'userOnline',params:groupInfo.groupId,target:'groupId'})


        // //정보를 가지고 있음 (payload)
        // const topicPayloadValue=State.next(updateTopic({topicLogic:'userOnline',params:groupInfo.groupId,target:'groupId'})).value;
        // const startStomp =State.next(topicPayloadValue).value //값을 저장하고 넘어감
        // const stompStartFn =startStomp.next(startStomp);//제네레이션 함수실행을 위한 next()
        // //Stomp연결,(첫번째 call)
        // const createStompConnectionPromise =stompStartFn.value.payload.fn();
        // createStompConnectionPromise.then((res:CompatClient)=>{
        //     console.log("Stomp connection created successfully.")
        //     console.log(startStomp)
        //         //call은 비동기식처리, Promise가능, res를 받아 넘기기(res: StompClient)
        //         const nextSecound=startStomp.next(res); //2번째 call로 넘어가기
        //         const [stompCleint,topicLogic, topicParams, topicTarget ] =[...nextSecound.value.payload.args,];
        //         //버퍼반환, 버퍼 종료 시 채널구독 취소
        //         const secoundCall =nextSecound.value.payload.fn(stompCleint,topicLogic,topicParams,topicTarget)
        //         unSubscribe=()=>{secoundCall.close()} //버퍼 종료 => 구독취소, (thunk)=>즉시종료 X, 함수 호출 시 종료
        //         const forkSend = startStomp.next(unSubscribe)
        //         //메세지 수신을 위한 sendMsg 제네레이터 함수
        //         const sendMsgFn = forkSend.value.payload.fn(stompCleint)
        //         sendMsgFn.next() //함수 들어간 후 next()=>첫 yield
        //         const appPayloadValue =sendMsgFn.next(updateApp({appLogic:'userOnline', target:'groupId',params:groupInfo.groupId})).value
        //         console.log(sendMsgFn.next(appPayloadValue))
        //         console.log(startStomp.next())
        //     })
        return;

    }, []);





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
            <div>
                {detail !== null && (
                    <div key={detail.groupId}>
                        <div>Group Detail ID: {detail.groupId}</div>
                        <div>Group Detail Title: {detail.groupTitle}</div>
                    </div>
                )}
            </div>


            {members &&
                <div>
                    <ul>
                        {members.map((member) => (
                            <ListView key={member.userEmail}>
                                {member.nickName} : {onlineCheck(member.onlineStatus)}
                            </ListView>
                        ))}
                    </ul>
                </div>
            }

            <div>
                {/* {detail && <Chatting groupName={detail.groupTitle} groupId={detail.groupId}/>} */}
            </div>
            <hr/>
            <div>
            </div>

            <hr/>
            <Notice/>
            <Vote/>
        </div>
    );
}

export default connect(null,mapDispatchToProps) (GroupDetail);