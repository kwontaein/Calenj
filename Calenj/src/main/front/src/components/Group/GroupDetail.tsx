import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {useId} from 'react';
import Chatting from "../../Test/Chatting";
import Notice from './Notice/Notice'
import {Client, Frame, IMessage, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import group from "./index";
import {ListView} from '../../style/FormStyle'
import Vote from "./Vote/Vote";

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
}

interface Friends {
    // 친구 아이디
    friendUserId: string;
    // 친구 닉네임
    nickName: string;
}


const GroupDetail: React.FC = () => {


    /* console = window.console || {};  //콘솔 출력 막는 코드.근데 전체 다 막는거라 걍 배포할때 써야할듯
     console.log = function no_console() {}; // console log 막기
     console.warn = function no_console() {}; // console warning 막기
     console.error = function () {}; // console error 막기*/

    const [detail, setDetail] = useState<Details | null>(null);
    const [members, setMembers] = useState<Members[] | null>(null);
    const [friends, setFriends] = useState<Friends[] | null>(null);
    const [inviteLink, setInviteLink] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const modalBackground = useRef<HTMLDivElement>(null);

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
    }, []);

    useEffect(() => {
        stompClient.activate(); // 로그인 시 자동 활성화

        // 연결 성공시 처리
        stompClient.onConnect = (frame: Frame) => {
            // console.log('Connected: ' + frame);
            stompClient.subscribe(`/topic/userOnline/${groupInfo.groupId}`, (isOnline: IMessage) => {
            })
            stompClient.send('/app/online', {}, JSON.stringify({groupId: groupInfo.groupId}));
        };
    }, [])

//usestate -> true false / 버큰클릭시 바뀌고 -> 컴포넌트 열고 프롭스로 전달
    function invite() {
        axios.post('/api/inviteCode', {
            groupId: groupInfo.groupId
        }).then(response => {
            setInviteLink(response.data)
            axios.post('/api/getFriendList', {})
                .then(response => {
                    setFriends(response.data)
                    console.log("friends", friends)
                    console.log(response.data)
                    setModalOpen(true)
                }).catch(error => console.log(error));
        }).catch(error => console.log(error));

    }

    function sendToFriend(friendId: string, inviteLink: string) {
        stompClient.subscribe(`/topic/userOnline/${friendId}`, (isOnline: IMessage) => {
        })
        stompClient.send('/app/online', {}, JSON.stringify({inviteLink}));
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
                            <ListView>
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
            <div className={'btn-wrapper'}>
                <button className={'modal-open-btn'} onClick={invite}>
                    초대하기
                </button>
            </div>
            {modalOpen &&
                <div ref={modalBackground} className={'modal-container'} onClick={e => {
                    if (e.target === modalBackground.current) {
                        setModalOpen(false);
                    }
                }}>
                    <div className={'modal-content'}>
                        <div className={'FriendList'}>
                            {friends && friends.length > 0 ?
                                <ul>
                                    {friends.map((friend) => (
                                        <ListView>
                                            <div>{friend.nickName}({friend.friendUserId})</div>
                                            <button onClick={() => sendToFriend(friend.friendUserId, inviteLink)}>
                                                친구에게 보내기
                                            </button>
                                        </ListView>
                                    ))}
                                </ul> : <div className={'noFriends'}>
                                    <p>친구가 없으신가요?</p>
                                    <p>친구를 만들어 보세요!</p>
                                </div>
                            }</div>
                        {inviteLink && <div className={'issueLink'}><b>{inviteLink}</b>
                            <button>복사하기</button>
                        </div>}
                        <button className={'modal-close-btn'} onClick={() => setModalOpen(false)}>
                            모달 닫기
                        </button>
                    </div>
                </div>
            }
            <hr/>
            <Notice/>
            <Vote/>
        </div>
    );
}

export default GroupDetail;