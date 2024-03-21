import {useState, useEffect} from 'react';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

interface Message {
    writer: string;
    message: string;
}

interface Room {
    groupName: string;
    groupId: number;
}

const Room: React.FC<Room> = ({groupName, groupId}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');

    const stomp = Stomp.over(() => {
        const sock = new SockJS("http://localhost:8080/ws-stomp")
        return sock;
    });

    useEffect(() => {
        const roomName = groupName;
        const group_Id = groupId;

        stomp.connect({}, () => {
            stomp.subscribe(`/sub/chat/room/${groupId}`, (chat) => {
                const content: Message = JSON.parse(chat.body);
                setMessages(prevMessages => [...prevMessages, content]);
            });
            stomp.send('/pub/chat/enter', {}, JSON.stringify({groupId}));
        });
        return () => {
            stomp.disconnect();
        };
    }, [groupId]);

    const sendMessage = () => {
        if (inputMessage.trim() !== '') {
            stomp.send('/pub/chat/message', {}, JSON.stringify({
                groupId: groupId,
                message: inputMessage,
            }));
            setInputMessage('');
        }
    }

    return (
        <div className="container">
            <div className="col-6">
                <h1>{groupName}</h1>
            </div>
            <div>
                <div id="msgArea" className="col">
                    {messages.map((message, index) => (
                        <div key={index} className="col-6">
                            <div>
                                <b>{message.writer}: {message.message}</b>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-6">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={inputMessage}
                               onChange={(e) => setInputMessage(e.target.value)}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={sendMessage}>전송
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6"></div>
        </div>
    );
}

export default Room;
