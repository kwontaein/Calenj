import {useState, useEffect} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function ChatRoomComponent({room}) {
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState("");
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        setUsername("a");

        const sockJs = new SockJS("/stomp/chat");
        const stomp = Stomp.over(sockJs);

        stomp.connect({}, () => {
            setStompClient(stomp);
            stomp.subscribe(`/sub/chat/room/${room.roomId}`, (chat) => {
                const content = JSON.parse(chat.body);
                setMessages(prevMessages => [...prevMessages, content]);
            });

            stomp.send('/pub/chat/enter', {}, JSON.stringify({roomId: room.roomId, writer: username}));
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, [room, username]);

    const handleSendMessage = () => {
        const msg = document.getElementById("msg");

        if (msg && stompClient) {
            stompClient.send('/pub/chat/message', {}, JSON.stringify({
                roomId: room.roomId,
                message: msg,
                writer: username
            }));
            document.getElementById("msg");
        }
    };

    return (
        <div className="container">
            <div className="col-6">
                <h1>{room.name}</h1>
            </div>
            <div>
                <div id="msgArea" className="col">
                    {messages.map((msg, index) => (
                        <div key={index}
                             className={`alert ${msg.writer === username ? "alert-secondary" : "alert-warning"}`}>
                            <b>{msg.writer} : {msg.message}</b>
                        </div>
                    ))}
                </div>
                <div className="col-6">
                    <div className="input-group mb-3">
                        <input type="text" id="msg" className="form-control"/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={handleSendMessage}>전송
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatRoomComponent;
