import store from '../../../store/store';
import {debounce} from '../../../shared/lib/actionFun';

export const requestChatFileRead = (param: string, readPoint: number) => {
    store.dispatch({
        type: 'REQUEST_FILE_READ',
        payload: {target: 'groupMsg', param, requestFile: "READ", nowLine: readPoint}
    });
};

export const requestChatFileReload = (param: string, pageLength: number) => {
    store.dispatch({
        type: 'REQUEST_FILE_RELOAD',
        payload: {target: 'groupMsg', param, requestFile: "RELOAD", nowLine: pageLength}
    });
};

export const receiveChatFile = (messages: string[]) => {
    const messageEntries = messages.map((message: string) => {
        const [chatUUID, sendDate, userId, messageType, messageContent] = message.split("$", 6);
        return {
            chatUUID: chatUUID,
            sendDate: sendDate.slice(1, 17),
            userId: userId,
            messageType: messageType,
            message: messageContent,
        };
    });

    return [...new Set(messageEntries.map((message) => JSON.stringify(message)))]
        .map((message) => JSON.parse(message));
};
let requestCount = 0;

export const fileLoadManagement = (reset: boolean = false) => {
    if (reset) {
        requestCount = 0;
    } else {
        requestCount += 1;
    }
    return requestCount;
};
