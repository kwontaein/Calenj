import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {useId} from 'react';
import Chatting from "../../Test/Chatting";
import Notice from './Notice/Notice'
import {Client, CompatClient, Frame, IMessage, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import group from "./index";
import {ListView} from '../../style/FormStyle'
import Vote from "./Vote/Vote";
import Invite from "./Invite/Invite"
import {RootState} from '../../store/store'
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import {saveStomp,StompCompat} from '../../store/StompSlice'



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








//dispatch 함수타입을 interface로 정의
interface DispatchProps {
    saveStomp: (payload: { stompClient: CompatClient }) => void;
}

//(Component Props로 전달하기 위한 interface)
const mapStateToProps = (state: RootState): StompCompat => ({
    stompClient: state.stomp.stompClient, // store에서 가져올 상태를 매핑
});

//emailToken 정보를 수정하는 함수 정의 후 connect
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    saveStomp: (payload: { stompClient: CompatClient }) => dispatch(saveStomp(payload))
});


/* console = window.console || {};  //콘솔 출력 막는 코드.근데 전체 다 막는거라 걍 배포할때 써야할듯
 console.log = function no_console() {}; // console log 막기
 console.warn = function no_console() {}; // console warning 막기
 console.error = function () {}; // console error 막기*/

const GroupDetail: React.FC<DispatchProps & StompCompat> = ({saveStomp}) => {


    const [detail, setDetail] = useState<Details | null>(null);
    const [members, setMembers] = useState<Members[] | null>(null);
    const location = useLocation();
    const groupInfo = {...location.state};
    const id = useId();


    const stompClient = (() => {
        const sock = new SockJS("http://localhost:8080/ws-stomp");
        const stomp = Stomp.over(sock);

        // WebSocket 에러 처리
        stomp.onWebSocketError = (error: Error) => {
            console.error('Error with websocket', error);
        };

        // Stomp 에러 처리
        stomp.onStompError = (frame: Frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };
        saveStomp({stompClient:stomp});
        return stomp;
    })();

    // 컴포넌트가 마운트될 때 Stomp 클라이언트 초기화 및 설정
    useEffect(() => {
        
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

        stompClient.activate(); // 로그인 시 자동 활성화
        // console.log(stompClient);
        // 연결 성공시 처리
        stompClient.onConnect = (frame: Frame) => {
                // console.log('Connected: ' + frame);
            stompClient.subscribe(`/topic/userOnline/${groupInfo.groupId}`, (isOnline: IMessage) => {})
            stompClient.send('/app/online', {}, JSON.stringify({groupId: groupInfo.groupId}));
        };
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
            <Invite groupId={groupInfo.groupId}/>


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
                {detail && <Chatting groupName={detail.groupTitle} groupId={detail.groupId}/>}
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

export default connect(mapStateToProps, mapDispatchToProps) (GroupDetail);