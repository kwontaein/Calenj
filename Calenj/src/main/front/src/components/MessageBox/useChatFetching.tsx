import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {loadFileFilter} from "./loadFileFilter";
import {useRequestChatFile} from "./useRequestChatFile";


interface Message {
    chatUUID: string,
    sendDate: string,
    userEmail: string,
    nickName: string,
    messageType: string,
    message: string,
}

export const useChatFetching = (param:string):
    [({pageParam}: {pageParam?: number | undefined}) => Promise<Message[]>, ({pageParam}: {pageParam?: number | undefined}) => Message] => {

    const stomp = useSelector((state: RootState) => state.stomp); // 리덕스 상태 구독
    const requestChatFile = useRequestChatFile(param)

    const fetchData = async ({pageParam = 0}) => {
        try {
            const message = await requestChatFile(pageParam);
            return loadFileFilter(message); // 처리된 결과 출력
        } catch (error) {
            console.error(error); // 오류 처리
            return [];
        }
    }


    const receiveNewChat = ({pageParam = 0}) => {
        //초기 세팅
        const {chatUUID, sendDate, userEmail, nickName, messageType, message} = stomp.receiveMessage
        const loadMsg: Message = {
            chatUUID: !pageParam ? "시작라인" : chatUUID,
            sendDate: !pageParam ? "" : sendDate,
            userEmail: !pageParam ? "" : userEmail,
            nickName: !pageParam ? "" : nickName,
            messageType: !pageParam ? "" : messageType,
            message: !pageParam ? "" : message.toString(),
        };
        return loadMsg;
    }
    return [fetchData,receiveNewChat]
}
