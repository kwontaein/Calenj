import React, {useState, useEffect} from 'react';
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
    const [messages, setMessages] = useState<string[]>([]); // 수신된 메시지 배열
    const [connected, setConnected] = useState<boolean>(false); // WebSocket 연결 상태
    const [stompClient, setStompClient] = useState<Client | null>(null); // Stomp 클라이언트 인스턴스


    // 컴포넌트가 마운트될 때 Stomp 클라이언트 초기화 및 설정
    useEffect(() => {
        const stompClient = Stomp.over(() => {
            const sock = new SockJS("http://localhost:8080/ws-stomp")
            return sock;
        });

        // 연결 성공시 처리
        stompClient.onConnect = (frame: Frame) => {
            setConnected(true);
            console.log('Connected: ' + frame);
            // '/topic/chat/room/${groupId}' 구독하고 메시지 수신시 showGreeting 함수 호출
            stompClient.subscribe(`/topic/chat/room/${groupId}`, (greeting: IMessage) => {
                showGreeting(JSON.parse(greeting.body).message);
            });
            stompClient.send('/app/chat/enter', {}, JSON.stringify({groupId}));
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

    // WebSocket 연결 함수
    function connect(): void {
        if (stompClient) {
            stompClient.activate();
        }
    }

    // WebSocket 연결 해제 함수
    function disconnect(): void {
        if (stompClient) {
            stompClient.deactivate();
            setConnected(false);
            console.log("Disconnected");
        }
    }

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

    // 새로운 메시지를 수신하여 메시지 배열에 추가하는 함수
    function showGreeting(message: string): void {
        setMessages(prevMessages => [...prevMessages, message]);
    }

    // JSX 반환
    return (
        <div>
            <noscript>
                <h2 style={{color: '#ff0000'}}>Seems your browser doesn't support Javascript! WebSocket relies on
                    Javascript being enabled. Please enable Javascript and reload this page!</h2>
            </noscript>
            <div id="main-content" className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>WebSocket connection:</label>
                            {/* Connect 버튼 */}
                            <button className="btn btn-default" onClick={connect} disabled={connected}>Connect</button>
                            {/* Disconnect 버튼 */}
                            <button className="btn btn-default" onClick={disconnect} disabled={!connected}>Disconnect
                            </button>
                        </div>
                    </div>
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
                                    {messages.map((message: string, index: number) => (
                                        <div key={index}>
                                            <div>{message}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>What is your name?</label>
                            {/* 사용자 이름 입력 필드 */}
                            <input type="text" className="form-control" placeholder="Your name here..." value={msg}
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
