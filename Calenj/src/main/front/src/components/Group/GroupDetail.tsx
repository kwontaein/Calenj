import React, {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {useLocation} from 'react-router-dom';
import {useId} from 'react';
import Chatting from "../../Test/Chatting";
import Notice from './Notice/Notice'
import {Client, Frame, IMessage, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import group from "./index";
import Vote from './Vote/Vote';
import {stateFilter} from '../../stateFunc/actionFun';


interface Details {
    groupId: number;
    groupTitle: string;
    groupCreated: string;
    groupCreater: string;
}

interface Members {
    groupRoleType: string;
    group_user_location: string;
    nickName: string;
    userEmail: string;
    isOnline: string;
}

const GroupDetail: React.FC = () => {
    //a
    const [detail, setDetail] = useState<Details | null>(null);
    const [members, setMembers] = useState<Members[] | null>(null);
    const location = useLocation();
    const groupInfo = {...location.state};
    const id = useId();


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
                setDetail(response.data);
                setMembers(response.data.members);
            })
            .catch(error => {
                const axiosError = error as AxiosError;
                console.log(axiosError);
                if (axiosError.response?.data) {
                    stateFilter((axiosError.response.data) as string);
                }
            });

    }, []);

    useEffect(() => {

        const stompClient = Stomp.over(() => {
            return new SockJS("http://localhost:8080/ws-stomp");
        });

        stompClient.activate();

        // 연결 성공시 처리
        stompClient.onConnect = (frame: Frame) => {
            // '/topic/chat/room/${groupId}' 구독하고 메시지 수신시 showGreeting 함수 호출
            stompClient.subscribe(`/topic/userOnline/${groupInfo.groupId}`, (online: IMessage) => {
            })
            stompClient.send('/app/online', {}, JSON.stringify({groupId: groupInfo.groupId}));
        };

        // WebSocket 에러 처리
        stompClient.onWebSocketError = (error: Error) => {
            console.error('Error with websocket', error);
        };

        // Stomp 에러 처리
        stompClient.onStompError = (frame: Frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };
//
        // Stomp 클라이언트 설정 저장
        // 컴포넌트 언마운트시 Stomp 클라이언트 비활성화
        return () => {
            stompClient.send('/app/offline', {}, JSON.stringify({groupId: groupInfo.groupId}));
            stompClient.deactivate();
        };
    }, [])

    function invite() {
        axios.post('/api/inviteGroup', null, {
            params: {
                groupId: groupInfo.groupId
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }) // 객체의 속성명을 'id'로 설정
            .then(response => {
                console.log(response.data)
            })
            .catch(error => console.log(error));

    }

    // 새로운 메시지를 수신하여 메시지 배열에 추가하는 함수
    /*
        function onlineConsole(online: OnlineState): void {
            setOnline(prevOnlines => [...prevOnlines, online]);
        }
    */

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
            <hr/>
            
            <hr/>
            <div>
                {detail && <Chatting groupName={detail.groupTitle} groupId={detail.groupId}/>}
            </div>
            <hr/>
            <div>
                <div onClick={invite}>초대하기</div>
            </div>
            <hr/>
            <Notice/>

            <Vote/>
        </div>
    );
}

export default GroupDetail;