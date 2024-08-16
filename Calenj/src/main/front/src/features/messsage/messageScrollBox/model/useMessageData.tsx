import {changeDateForm} from "../../../../shared/lib";
import {useEffect, useMemo, useRef, useState} from "react";
import {Message, QUERY_CHATTING_KEY, QUERY_NEW_CHAT_KEY, useChatFileInfinite} from "../../../../entities/reactQuery";
import {useSelector} from "react-redux";
import {RootState, scrollPointMap} from "../../../../entities/redux";
import {useIntersect} from "../../../../shared/model";
import {
    InfiniteData,
    useQueryClient
} from "@tanstack/react-query";
import {useReceiveChatInfinite} from "../../../../entities/reactQuery/model/queryModel";
import {receivedMessage} from "../../../../entities/message";


interface useMessageData {
    messageList: Message[],
    chatUUID: string,
    position: string,
    topRef: React.RefObject<HTMLDivElement>,
    bottomRef: React.RefObject<HTMLDivElement>,
    hasNextPage: boolean,
    hasPreviousPage: boolean
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
    const [prevMessage, setPrevMessage] = useState<Message[]>([])
    const {
        data,
        isFetching,
        hasNextPage,
        hasPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        refetch
    } = useChatFileInfinite(stompParam, userId || '')
    //새로운 메시지
    const receivedNewMessage = receivedMessage();
    const receivedMessages = useReceiveChatInfinite(stompParam, receivedNewMessage)
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const removeDuplicate = (messageList: Message[], newMessageList: Message[]): void => {
        const existingIds = new Set(messageList.map(message => message.chatUUID));
        // newMessageList에서 중복된 메시지를 필터링
        const removeDuplicatesList = newMessageList.filter(message => !existingIds.has(message.chatUUID));
        if (newMessageList.length !== removeDuplicatesList.length) {
            queryClient.setQueryData([QUERY_NEW_CHAT_KEY, stompParam], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                pages: removeDuplicatesList,
                pageParams: receivedMessages.data?.pageParams.slice(0, removeDuplicatesList.length)
            }));
        }
    }

    const newMessageList = useMemo(() => {
        if (receivedMessages.data) {
            console.log(receivedMessages.data)
            return receivedMessages.data.pages.filter((message) => message.chatUUID !== "시작라인")
        }
        return []
    }, [receivedMessages.data])

    const messageList = useMemo(() => {
        if (data) {
            if (!isFetching) {
                const messages = data.pages.reduce((prev, current) => prev.concat(current)).filter((message) => (message.chatUUID !== "시작라인" && message.chatUUID !== "마지막라인"))
                setPrevMessage(messages)
                return hasNextPage ? messages : [...messages, ...newMessageList]
            } else {
                return prevMessage
            }
        }
        return [];
    }, [data, newMessageList, isFetching])


    const topRef = useIntersect((entry, observer) => {
        if (!isInitialLoad && hasPreviousPage && messageList.length > 0) {
            observer.unobserve(entry.target);
            setPosition("older");
            setChatUUID(messageList[0].chatUUID);
            if (!data) return;
            if (data.pages.length > 3) {
                queryClient.setQueryData([QUERY_CHATTING_KEY, stompParam], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                    pages: data?.pages.slice(0, 3),
                    pageParams: data?.pageParams.slice(0, 3)
                }));
            }
            fetchPreviousPage();
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
            fetchNextPage().then().then(({data}) => {
                if (data && receivedMessages.data) {
                    const lastPage = data.pages.at(-1) as Message[];
                    removeDuplicate(lastPage, receivedMessages.data.pages)
                }
            })
        }
    });

    useEffect(() => {
        const {param, state} = stomp.receiveMessage
        if (stompParam !== param || state !== 'SEND' || isInitialLoad) return
        const sendUser = stomp.receiveMessage.userId
        if (userId === sendUser) {
            if (!receivedMessages.data || !data) return
            //page의 길이가 4가 넘어가면 마지막 메시지가 page내에 존재하지 않으니 refetch를 해준다.
            if (data.pages.length < 4) return
            queryClient.setQueryData([QUERY_CHATTING_KEY, stompParam], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                pages: data?.pages.slice(0, 1),
                pageParams: [{position: "", chatUUID: ""}]
            }));
            scrollPointMap.delete(stompParam);

            refetch({}).then(() => {
                queryClient.setQueryData([QUERY_NEW_CHAT_KEY, stompParam], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                    pages: data?.pages.slice(0, 1),
                    pageParams: data?.pageParams.slice(0, 1)
                }));
            })
            return
        }

    }, [stomp.receiveMessage.receivedUUID])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoad(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    //--------------------------------------------------------------------------------------------------------------- 의존성을 활용한 페이지 랜더링 및 업데이트 관리
    const compareDate = (date1: string, date2: string): boolean => {
        if (changeDateForm(date1).getDate() !== changeDateForm(date2).getDate()) return true
        if (changeDateForm(date1).getMonth() !== changeDateForm(date2).getMonth()) return true
        return changeDateForm(date1).getFullYear() !== changeDateForm(date2).getFullYear();
    }
    return {messageList, chatUUID, position, topRef, bottomRef, hasNextPage, hasPreviousPage, compareDate};
}