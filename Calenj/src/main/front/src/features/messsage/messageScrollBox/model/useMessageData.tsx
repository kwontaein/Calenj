import {changeDateForm} from "../../../../shared/lib";
import axios from "axios";
import {MutableRefObject, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Message, QUERY_CHATTING_KEY, QUERY_NEW_CHAT_KEY, useChatFileInfinite} from "../../../../entities/reactQuery";
import {connect, useSelector} from "react-redux";
import {endPointMap, RootState} from "../../../../entities/redux";
import {useIntersect} from "../../../../shared/model";
import {FetchData} from "../../../../entities/reactQuery/model/types";
import {
    FetchPreviousPageOptions,
    InfiniteData,
    InfiniteQueryObserverResult,
    useInfiniteQuery, useQueryClient
} from "@tanstack/react-query";
import {all} from "@redux-saga/core/effects";
import {useReceivedMessage} from "../../../../entities/message";
import {useReceiveChatInfinite} from "../../../../entities/reactQuery/model/queryModel";

interface useMessageData {
    messageList: Message[],
    chatUUID:string,
    position:string,
    topRef: React.RefObject<HTMLDivElement>,
    bottomRef: React.RefObject<HTMLDivElement>,
    hasNextPage:boolean,
    hasPreviousPage:boolean
    compareDate: (date1: string, date2: string) => boolean,
}

export const useMessageData = (): useMessageData => {

    const stomp = useSelector((state: RootState) => state.stomp)
    const stompParam = useSelector((state: RootState) => state.stomp.param)
    const userId = localStorage.getItem("userId");

    //메세지목록
    //웹소켓 메시지 목록
    const [chatUUID, setChatUUID] = useState<string>('');
    const [position, setPosition] = useState<string>('older');
    const queryClient = useQueryClient();
    const [prevMessage,setPrevMessage] = useState<Message[]>([])
    const {data, isFetching, hasNextPage, hasPreviousPage, fetchNextPage, fetchPreviousPage} = useChatFileInfinite(stompParam,userId||'')
    //새로운 메시지
    const receivedNewMessage = useReceivedMessage();
    const receivedMessages =useReceiveChatInfinite(stompParam,receivedNewMessage)

    const removeDuplicate = (messageList: Message[],newMessageList:Message[]): void => {
        const existingIds = new Set(messageList.map(message => message.chatUUID));
        // newMessageList에서 중복된 메시지를 필터링
        const removeDuplicatesList = newMessageList.filter(message => !existingIds.has(message.chatUUID));
        if (newMessageList.length !== removeDuplicatesList.length) {
            queryClient.setQueryData([QUERY_NEW_CHAT_KEY, stompParam], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                pages: removeDuplicatesList,
                pageParams: receivedMessages.data?.pageParams.slice(0,removeDuplicatesList.length)
            }));
        }
    }

    const newMessageList = useMemo(()=>{
        if(receivedMessages.data){
            return receivedMessages.data.pages.filter((message)=>message.chatUUID!=="시작라인")
        }
        return []
    },[receivedMessages.data])

    const messageList = useMemo(() => {
        if (data) {
            if(!isFetching){
                const messages = data.pages.reduce((prev, current) => prev.concat(current)).filter((message)=> (message.chatUUID!=="시작라인" && message.chatUUID!=="마지막라인"))
                setPrevMessage(messages)
                return hasNextPage ? messages : [...messages, ...newMessageList]
            }else{
                return prevMessage
            }
        }
        return [];
    }, [data, newMessageList, isFetching])





    const topRef = useIntersect((entry, observer) => {
        if (hasPreviousPage && messageList.length > 0) {
            observer.unobserve(entry.target);
            setPosition("older")
            setChatUUID(messageList[0].chatUUID)
            if(!data) return
            if(data.pages.length>3) {
                queryClient.setQueryData([QUERY_CHATTING_KEY, stompParam], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                    pages: data?.pages.slice(0, 3),
                    pageParams: data?.pageParams.slice(0, 3)
                }));
            }
            fetchPreviousPage()
        }
    });

    const bottomRef = useIntersect((entry, observer) => {
        if (hasNextPage && messageList.length > 0) {
            observer.unobserve(entry.target);
            setPosition("newer")
            setChatUUID(messageList[messageList.length - 1].chatUUID)
            if (!data) return
            if (data.pages.length > 3) {
                queryClient.setQueryData([QUERY_CHATTING_KEY, stompParam], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                    pages: data?.pages.slice(1, 4),
                    pageParams: data?.pageParams.slice(1, 4)
                }));
            }
            fetchNextPage().then().then(({data})=>{
                if(data && receivedMessages.data){
                    const lastPage = data.pages.at(-1) as Message[];
                    removeDuplicate(lastPage,receivedMessages.data.pages)
                }
            })
        }
    });


    //--------------------------------------------------------------------------------------------------------------- 의존성을 활용한 페이지 랜더링 및 업데이트 관리
    const compareDate = (date1: string, date2: string): boolean => {
        if (changeDateForm(date1).getDate() !== changeDateForm(date2).getDate()) return true
        if (changeDateForm(date1).getMonth() !== changeDateForm(date2).getMonth()) return true
        return changeDateForm(date1).getFullYear() !== changeDateForm(date2).getFullYear();
    }
    return {messageList, chatUUID, position, topRef, bottomRef, hasNextPage, hasPreviousPage, compareDate};
}