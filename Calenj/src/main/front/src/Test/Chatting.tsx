import React, {useState, useEffect} from 'react';

interface Message {
    sessionId: string;
    message: string;
    self: boolean;
}

const ChatApp: React.FC = () => {
    const [username, setUsername] = useState<string>(''); // 사용자명 상태
    const [msg, setMsg] = useState<string>(''); // 메시지 상태
    const [messages, setMessages] = useState<Message[]>([]); // 채팅 메시지 목록 상태
    const [websocket, setWebsocket] = useState<WebSocket | null>(null); // 웹소켓 상태

    useEffect(() => {
        // 웹소켓 연결
        const ws = new WebSocket("ws://localhost:8080/ws/chat");
        setWebsocket(ws);

        // 웹소켓 메시지 수신 이벤트 핸들러
        ws.onmessage = (msg: MessageEvent) => {
            const data: string = msg.data;
            const arr: string[] = data.split(":");
            const sessionId: string = arr[0];
            const message: string = arr[1];
            const cur_session: string = username;

            // 수신된 메시지를 상태에 추가
            if (sessionId === cur_session) {
                setMessages([...messages, {sessionId, message, self: true}]);
            } else {
                setMessages([...messages, {sessionId, message, self: false}]);
            }
        };

        // 웹소켓 연결 해제 이벤트 핸들러
        ws.onclose = () => {
            // 웹소켓 연결 해제 처리
        };

        return () => {
            // 컴포넌트 언마운트 시 웹소켓 연결 해제
            ws.close();
        };
    }, [username]);

    // 메시지 전송 핸들러
    const handleSend = () => {
        if (websocket && msg.trim() !== '') {
            websocket.send(username + ":" + msg);
            setMsg('');
        }
    };

    return (
        <div className="container">
            <div className="col-6">
                <label><b>채팅방</b></label>
            </div>
            <div>
                <div id="msgArea" className="col">
                    {/* 채팅 메시지 출력 */}
                    {messages.map((msg: Message, index: number) => (
                        <div key={index} className={msg.self ? 'alert alert-secondary' : 'alert alert-warning'}>
                            <b>{msg.sessionId} : {msg.message}</b>
                        </div>
                    ))}
                </div>
                <div className="col-6">
                    <div className="input-group mb-3">
                        {/* 메시지 입력 필드 */}
                        <input type="text" id="msg" className="form-control" aria-label="Recipient's username"
                               aria-describedby="button-addon2" value={msg} onChange={(e) => setMsg(e.target.value)}/>
                        <div className="input-group-append">
                            {/* 메시지 전송 버튼 */}
                            <button className="btn btn-outline-secondary" type="button" id="button-send"
                                    onClick={handleSend}>전송
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChatApp;
