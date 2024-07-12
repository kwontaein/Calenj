import {useSelector} from "react-redux";
import {useRequestChatFile} from "../api/useRequestChatFile";
import {Message} from "../../reactQuery";
import {fileFilter} from "../lib/fileFilter";
import {RootState} from "../../redux";


export const useChatFetching = (param:string):
    [({pageParam}: {pageParam?: number | undefined}) => Promise<Message[]>, ({pageParam}: {pageParam?: number | undefined}) => Message] => {
    const stomp = useSelector((state: RootState) => state.stomp); // 리덕스 상태 구독
    const requestChatFile = useRequestChatFile(param)

    const fetchData = async ({pageParam = 0}) => {
        try {
            const message = await requestChatFile(pageParam);
            return fileFilter(message); // 처리된 결과 출력
        } catch (error) {
            console.error(error); // 오류 처리
            return [];
        }
    }

    const receiveNewChat = ({pageParam = 0}) => {
        //초기 세팅
        const {chatUUID, sendDate, userId, messageType, message} = stomp.receiveMessage
        const loadMsg: Message = {
            chatUUID: !pageParam ? "시작라인" : chatUUID.trim(),
            sendDate: !pageParam ? "" : sendDate,
            userId: !pageParam ? "" : userId.trim(),
            messageType: !pageParam ? "" : messageType.trim(),
            message: !pageParam ? "" : message.toString(),
        };
        return loadMsg;
    }

    return [fetchData,receiveNewChat]
}
