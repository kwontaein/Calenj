import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {useId} from 'react';
import Chatting from "../../Test/Chatting";
import Notice from './Notice/Notice'
import {Client, Frame, IMessage, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import group from "./index";

interface OnlineState {
    nickName: string;
    isOnline: string;
}

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
    userEmail: String;
}

const GroupDetail: React.FC = () => {
    const [detail, setDetail] = useState<Details | null>(null);
    const [members, setMembers] = useState<Members[] | null>(null);
    const location = useLocation();
    const groupInfo = {...location.state};
    const id = useId();
    const [online, setOnline] = useState<OnlineState[]>([]); // 수신된 메시지 배열


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
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        const stompClient = Stomp.over(() => {
            return new SockJS("http://localhost:8080/ws-stomp");
        });

        stompClient.activate();//로그인 시 자동 활성화

        // 연결 성공시 처리
        stompClient.onConnect = (frame: Frame) => {
            console.log('Connected: ' + frame);
            stompClient.subscribe(`/topic/userOnline/${groupInfo.groupId}`, (isOnline: IMessage) => {
                console.log("JSON.parse(isOnline.body)", Object.entries(JSON.parse(isOnline.body)));
                setOnline((JSON.parse(isOnline.body))); // 여기에서 setOnline() 호출
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
            <div>
                <div>
                    {Object.entries(online).map(([nickName, OnlineState]) => {
                        const groupedMembers = members !== null ? members.filter(member => member.nickName === nickName) : [];
                        console.log(OnlineState);
                        return (
                            <div key={nickName}>
                                <li>{nickName}: {OnlineState.isOnline}</li>
                                {groupedMembers.map((member, index) => (
                                    <div key={index}>
                                        <div>닉네임: {member.nickName}</div>
                                        <div>역할: {member.groupRoleType}</div>
                                        <div>위치: {member.group_user_location}</div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
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
        </div>
    );
}

export default GroupDetail;