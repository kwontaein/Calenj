import { useRef, useState, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";


const ROOM_SEQ = 0;

const webSocket: React.FC = () => {
    const [chatMessages, setChatMessages] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const client = useRef<StompJs.Client>();
    
  //최초 랜더링 시 1회실행 연결 후 해당 컴포넌트가 닫히면 연결 끊기
  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);
                                 
  const connect = () => {
    client.current = new StompJs.Client({
        brokerURL: 'ws//localhost:8080/ws',
        onConnect:()=>{
            subscribe(); // 연결 성공 시 구독하는 로직실행
        },
    });
    client.current.activate(); //클라이언트 활성화
  };

  const disconnect = () => { //연결 끊기
    if(client.current!==undefined){
        client.current.deactivate();
    }
  };

  const subscribe: () => void = () => {
    if(client.current!==undefined){
        //메시지의 payload는 body에 실려옴 string으로 파싱 후 setting
        client.current.subscribe(`/sub/chat/${ROOM_SEQ}`, ({ body }) => {
            const jsonBody = JSON.parse(body);
            setChatMessages((prevMessage) => [...prevMessage, jsonBody]);
        });
    }
  };

  const publish: (message: string) => void = (message) => {// 입력되는 채팅
    if(client.current!==undefined){
        // 연결되지 않았으면 메시지를 보내지 않는다. 
        if (!client.current.connected) { 
        return;
        }

        client.current.publish({
        destination: "/pub/chat",
        body: JSON.stringify({
            roomSeq: ROOM_SEQ,
            message: message }),
        });
    }
    setMessage("");
  };

  return (
    <div>
      {chatMessages && chatMessages.length > 0 && (
        <ul>
          {chatMessages.map((_chatMessage, index) => (
            <li key={index}>{_chatMessage.message}</li>
          ))}
        </ul>
      )}
      <div>
        <input
          type={"text"}
          placeholder={"message"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ////e.witch는 사용자가 누른 키의 코드 13은 엔터
          onKeyPress={(e) => e.which === 13 && publish(message)} 
        />
        <button onClick={() => publish(message)}>send</button>
      </div>
    </div>
  );
};

export default webSocket;
