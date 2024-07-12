import {useSelector} from "react-redux";
import {useRequestChatFile} from "./useRequestChatFile";
import {Message} from "../../reactQuery";
import {RootState} from "../../redux";
import {fileFilter} from "../lib/fileFilter";
import {useState} from "react";

interface ReturnChatFetching{
        requestFile :({pageParam}: {pageParam?: number | undefined}) => Promise<Message[]>,
        receiveNewChat : ({pageParam}: {pageParam?: number | undefined}) => Message
}

export const useChatFetching = (param:string): ReturnChatFetching=> {
    const stomp = useSelector((state: RootState) => state.stomp); // 리덕스 상태 구독
    const receivedChatFile = useRequestChatFile(param)

    const requestFile = async ({pageParam = 0}) => {
        try {
            const fileMessage = await receivedChatFile(pageParam)
            return fileFilter(fileMessage);

        } catch (error) {
            console.error(error); // 오류 처리
            return [];
        }
    }

    const receiveNewChat = ({pageParam = 0}) => {
        //초기 세팅
        if(pageParam===0){
            const startMsg: Message = {
                chatUUID:"시작라인",
                sendDate: '',
                userId: "",
                messageType: "",
                message: "",
            };
            return  startMsg;
        }else{
            return stomp.receiveMessage.message[0];
        }
    }
    return {requestFile,receiveNewChat}
}
