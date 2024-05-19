import {useState, useRef, useMemo} from "react";
import {useQueryClient, useInfiniteQuery, InfiniteData} from '@tanstack/react-query';
import store from '../../../store/store';
import {debounce, throttleByAnimationFrame} from '../../../shared/lib/actionFun';
import {QUERY_NEW_CAHT_KEY, QUERY_CHATTING_KEY} from "../../../store/ReactQuery/queryManagement";
import {Message, UseChatParams} from "../types";
import {receiveChatFile, requestChatFileRead, requestChatFileReload, fileLoadManagement} from '../services/chatService';

export const useChat = ({param, stomp, sendStompMsg, requestFile}: UseChatParams) => {
    const [content, setContent] = useState<string>('');
    const [prevScrollHeight, setPrevScrollHeight] = useState<number | null>(null);
    const chatRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const queryClient = useQueryClient();
    const messageLength = useRef<number>(0); // messageLength 정의

    const sendMsg = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (content === '') return;
        sendStompMsg({target: 'groupMsg', param: param, message: content, messageType: "message"});
        setContent('');
        if (chatRef.current) {
            chatRef.current.value = '';
        }
        // 스크롤 최하단으로 이동
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        }, 50);
    };

    const fetchData = async ({pageParam = 0}) => {
        try {
            const getFileData = () => {
                if (messageLength.current === -1) {
                    requestChatFileRead(param, pageParam);
                } else {
                    requestChatFileReload(param, pageParam);
                }

                return new Promise((res, rej) => {
                    const unsubscribe = store.subscribe(() => {
                        const {receiveMessage} = store.getState().stomp;
                        if (receiveMessage) {
                            res(receiveMessage.message);
                            unsubscribe();
                        }
                    });
                }).then((res) => {
                    return [...res as string[]];
                }).catch(() => {
                    return [];
                });
            }

            const message = await getFileData();
            if (message.length === 0 && !isFetching) {
                const debounceCount = debounce(() => {
                    const requestCount = fileLoadManagement();
                    if (requestCount < 10) return;

                    fileLoadManagement(true);
                    messageLength.current = -1;
                    refetch().then(() => {
                        if (!receiveNewMessage.data) return;

                        queryClient.setQueryData([QUERY_NEW_CAHT_KEY, param], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                            pages: data?.pages.slice(0, 1),
                            pageParams: data?.pageParams.slice(0, 1)
                        }));
                    });
                }, 500);
                debounceCount();
            } else {
                fileLoadManagement(true);
            }
            const messageResult = receiveChatFile(message);
            messageLength.current += messageResult.length;
            return messageResult;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const {data, hasNextPage, isFetching, isLoading, fetchNextPage, refetch} = useInfiniteQuery({
        queryKey: [QUERY_CHATTING_KEY, param],
        queryFn: fetchData,
        getNextPageParam: (messageList) => {
            const containsValue = messageList[messageList.length - 1]?.chatUUID === "시작라인" || messageList[messageList.length - 1]?.chatUUID === '엔드포인트' || undefined;
            return containsValue ? undefined : messageLength.current;
        },
        initialPageParam: 0,
        enabled: param === stomp.param,
        staleTime: Infinity,
        refetchInterval: false,
        retry: 3,
    });

    const receiveNewMessage = useInfiniteQuery({
        queryKey: [QUERY_NEW_CAHT_KEY, param],
        queryFn: () => {
            const loadMsg: Message = {
                chatUUID: stomp.receiveMessage.chatUUID,
                sendDate: stomp.receiveMessage.sendDate,
                userId: stomp.receiveMessage.userId,
                messageType: stomp.receiveMessage.messageType,
                message: stomp.receiveMessage.message.toString(),
            };
            return loadMsg;
        },
        getNextPageParam: () => true,
        initialPageParam: null,
        enabled: param === stomp.param && !isFetching,
        refetchInterval: false,
        staleTime: Infinity,
    });

    const messageList = useMemo(() => {
        if (data) {
            return [...data.pages.reduce((prev, current) => prev.concat(current), [])];
        }
        return [];
    }, [data]);

    const newMessageList = useMemo(() => {
        if (receiveNewMessage.data) {
            const removeDuplicatesMessage = [...new Set(receiveNewMessage.data.pages.map((message) => JSON.stringify(message)))]
                .map((message) => JSON.parse(message)) as Message[];
            if (receiveNewMessage.data.pages.length !== removeDuplicatesMessage.length) {
                queryClient.setQueryData([QUERY_NEW_CAHT_KEY, param], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                    pages: data?.pages.slice(0, removeDuplicatesMessage.length),
                    pageParams: data?.pageParams.slice(0, removeDuplicatesMessage.length)
                }));
            }
            return removeDuplicatesMessage;
        }
        return [];
    }, [receiveNewMessage.data]);

    return {
        content,
        setContent,
        sendMsg,
        messageList,
        newMessageList,
        topRef: useRef<HTMLDivElement>(null),
        scrollRef,
        chatRef,
        isLoading
    };
};
