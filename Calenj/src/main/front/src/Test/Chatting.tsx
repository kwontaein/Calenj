import React, {useEffect, useState} from 'react';
import {Client, Frame, IMessage, Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';


interface Message {
    nickName: string;
    message: string;
}

interface Room {
    groupName: string;
    groupId: number;
}


const Chatting: React.FC<Room> = ({groupName, groupId}) => { // 상태 변수들 정의
    const [msg, setMsg] = useState<string>(''); // 사용자 이름
    const [messages, setMessages] = useState<Message[]>([]); // 수신된 메시지 배열
    const [stompClient, setStompClient] = useState<Client | null>(null); // Stomp 클라이언트 인스턴스

    // 컴포넌트가 마운트될 때 Stomp 클라이언트 초기화 및 설정
    useEffect(() => {
        const stompClient = Stomp.over(() => {
            return new SockJS("http://localhost:8080/ws-stomp");
        });

        stompClient.activate();

        // 연결 성공시 처리
        stompClient.onConnect = (frame: Frame) => {
            // '/topic/chat/room/${groupId}' 구독하고 메시지 수신시 showGreeting 함수 호출
            stompClient.subscribe(`/topic/chat/room/${groupId}`, (greeting: IMessage) => {
                setMessages(prevMessages => [...prevMessages, JSON.parse(greeting.body)]);
            });
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

        // Stomp 클라이언트 설정 저장
        setStompClient(stompClient);

        // 컴포넌트 언마운트시 Stomp 클라이언트 비활성화
        return () => {
            stompClient.deactivate();
        };
    }, []);

    // 메시지 전송 함수
    function sendName(): void {
        if (stompClient) {
            //send 는 목적지에 직접 메시지를 전송
            //publish 는 메시지를 구독자에게 "발행"하는 것.

            stompClient.publish({
                destination: "/app/chat/message", // 메시지 전송 대상
                body: JSON.stringify({
                    groupId: groupId,
                    message: msg,
                }) // JSON 형태의 데이터 전송
            });
        }
    }
    
    // JSX 반환
    return (
        <div>
            <div id="main-content" className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-md-12">
                            {/* 메시지 표시 테이블 */}
                            <div className="table table-striped">
                                <div>
                                    <div>
                                        <div>Greetings</div>
                                    </div>
                                </div>
                                <div>
                                    {/* 메시지 표시 */}
                                    {messages.map((message: Message, index: number) => (
                                        <div key={index}>
                                            <div><h3> {message.message}</h3></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Message Field</label>
                            {/* 사용자 이름 입력 필드 */}
                            <input type="text" className="form-control" value={msg}
                                   onChange={(e) => setMsg(e.target.value)}/>
                        </div>
                        {/* Send 버튼 */}
                        <button className="btn btn-default" onClick={sendName}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatting;
