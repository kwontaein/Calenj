import {InfiniteData} from "@tanstack/react-query";
import {useDispatch} from "react-redux";
import {endPointMap} from "../../../store/module/StompMiddleware";
import {requestFile} from "../../../store/module/StompReducer";
import store from "../../../store/store";
import {debounce} from "../../../shared/lib";
import {fileLoadManagement} from "../../../features/messsage";
import {QUERY_NEW_CAHT_KEY} from "../../../entities/ReactQuery/model/queryModel";

interface Message {
    chatUUID: string,
    sendDate: string,
    userEmail: string,
    nickName: string,
    messageType: string,
    message: string,
}
export const useFileLoad =(param:string, data:InfiniteData<Message[], unknown>, dispatch: ReturnType<typeof useDispatch>)
    :[requestChatFileRead:(readPoint:number)=>void,requestChatFileReload:(pageLength:number)=>void, receiveChatFile:(message:string[])=>Message[] ]=>{
    const requestChatFileRead = (readPoint:number) => {
        if (!data?.pages || endPointMap.get(param) > 0) {
            dispatch(
                requestFile({
                    target: 'groupMsg',
                    param: param,
                    requestFile: "READ",
                    nowLine: readPoint,
                }));
        }
    }
    const requestChatFileReload = (pageLength:number) => {
        if (data?.pages) {
            dispatch(
                requestFile({
                    target: 'groupMsg',
                    param: param,
                    requestFile: "RELOAD",
                    nowLine: pageLength,
                }));
        }
    }

    const receiveChatFile = (messages: string[]) => {

        const messageEntries = Array.from(messages, (message: string) => {
            const [chatUUID,sendDate,userEmail,nickName,messageType,messageContent] = message.split("$", 6);

            const loadMsg: Message = {
                chatUUID: chatUUID,
                sendDate: sendDate.slice(1, 17),
                userEmail: userEmail,
                nickName: nickName,
                messageType: messageType,
                message: messageContent,
            };

            return loadMsg;
        }).filter((msg: Message | null) => msg !== null);  // null이 아닌 메시지만 필터링

        //객체 중복 필터링
        const removeDuplicatesMessage = [...new Set(messageEntries.map((message)=> JSON.stringify(message)))]
            .map((message) => JSON.parse(message)) as Message[];

        if(messageEntries.length !== removeDuplicatesMessage.length){
            //중복된 요소가 있을경우
            return removeDuplicatesMessage;
        }else{
            return messageEntries
        }
    }




    return [ requestChatFileRead, requestChatFileReload ,receiveChatFile]
}