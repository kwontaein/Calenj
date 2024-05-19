export interface groupDetailProps {
    target: string;
    param: string;
}

export interface Message {
    chatUUID: string;
    sendDate: string;
    userId: string;
    messageType: string;
    message: string;
}

export interface voteChoiceResponse {
    voteIndex: number;
    voteItem: string;
    voter: string[];
}

export interface VoteDetails {
    voteChoiceResponse: voteChoiceResponse[];
    voteCreater: string;
    voteTitle: string;
    voteCreated: string;
    voteWatcher: number;
    voteEndDate: string;
    isMultiple: boolean;
    anonymous: boolean;
}

export type groupMsgProps = groupDetailProps & DispatchStompProps & StompData;

export interface DispatchStompProps {
    updateAppPosition: (position: { target: string; param: string }) => void;
    sendStompMsg: (message: { target: string; param: string; message: string; messageType: string }) => void;
    requestFile: (params: { target: string; param: string; requestFile: string; nowLine: number }) => void;
}

export interface StompData {
    receiveMessage: {
        state: string;
        param: string;
        chatUUID: string;
        sendDate: string;
        userId: string;
        messageType: string;
        message: string;
    };
    stomp: {
        param: string;
        receiveMessage: {
            state: string;
            param: string;
            chatUUID: string;
            sendDate: string;
            userId: string;
            messageType: string;
            message: string;
        };
    };
}

export interface MessageSendProps {
    content: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
    sendMsg: (e: React.FormEvent<HTMLFormElement>) => void;
    chatRef: React.RefObject<HTMLInputElement>;
}

export interface MessageBoxProps {
    messageList: Message[];
    newMessageList: Message[];
    topRef: React.RefObject<HTMLDivElement>;
    scrollRef: React.RefObject<HTMLDivElement>;
}

export interface UseChatParams {
    param: string;
    stomp: any;
    sendStompMsg: (msg: any) => void;
    requestFile: (params: any) => void;
}

export interface UseScrollParams {
    scrollRef: React.RefObject<HTMLDivElement>;
    updateEndpoint: (params: any) => void;
    param: string;
}
