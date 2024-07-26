import {changeDateForm} from "../../../../shared/lib";
import axios from "axios";
import {MutableRefObject, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Message, QUERY_CHATTING_KEY, useChatFileInfinite} from "../../../../entities/reactQuery";
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
    const [newMessages, setNewMessages] = useState<Message[]>([]);
    const [chatUUID, setChatUUID] = useState<string>('');
    const [position, setPosition] = useState<string>('older');
    //마지막 페이지인지 구분하기 위한 값
    const [lastMessage, setLastMessage] = useState<Message>();
    const queryClient = useQueryClient();

    const {data, isFetching, hasNextPage, hasPreviousPage, fetchNextPage, fetchPreviousPage} = useChatFileInfinite(stompParam,userId||'')

    const messageList = useMemo(() => {
        if (data && !isFetching) {
            const messages = data.pages.reduce((prev, current) => prev.concat(current)).filter((message)=>message.chatUUID!=="시작라인")
            return hasNextPage ? messages : [...messages, ...newMessages]
        }
        return [];
    }, [data, isFetching])




    //데이터 => 웹소켓 새로운 메세지 받기
    useEffect(() => {
        const {state, param, message} = stomp.receiveMessage;
        if (stompParam !== param ) return;
        if (message && state === "SEND") {
            setNewMessages([...newMessages, ...message]);
            setLastMessage(message[message.length - 1]);
        }
    }, [stomp.receiveMessage.receivedUUID]);



    const topRef = useIntersect((entry, observer) => {
        if (hasPreviousPage && messageList.length > 0) {
            observer.unobserve(entry.target);
            setPosition("older")
            setChatUUID(messageList[0].chatUUID)
            if(!data) return
            console.log(data.pageParams)
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
            console.log("실행")
            observer.unobserve(entry.target);
            setPosition("newer")
            setChatUUID(messageList[messageList.length - 1].chatUUID)
            if (!data) return
            console.log(data.pageParams)
            if (data.pages.length > 3) {
                queryClient.setQueryData([QUERY_CHATTING_KEY, stompParam], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                    pages: data?.pages.slice(1, 4),
                    pageParams: data?.pageParams.slice(1, 4)
                }));
            }
            fetchNextPage()
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