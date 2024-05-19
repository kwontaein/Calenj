import React, {ChangeEvent, useRef} from "react";
import {MessageSend_Cotainer, MessageSend_Input} from '../../../style/ChatBoxStyle';

interface MessageSendProps {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    sendMsg: (e: React.FormEvent<HTMLFormElement>) => void;
    chatRef: React.RefObject<HTMLInputElement>;
}

const MessageSend: React.FC<MessageSendProps> = ({content, setContent, sendMsg, chatRef}) => {
    return (
        <MessageSend_Cotainer onSubmit={sendMsg}>
            <MessageSend_Input type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                               ref={chatRef}/>
        </MessageSend_Cotainer>
    );
}

export default MessageSend;
