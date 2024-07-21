import {changeDateForm} from "../../../../shared/lib";
import axios from "axios";
import {MutableRefObject, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Message} from "../../../../entities/reactQuery";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {useIntersect} from "../../../../shared/model";

interface useMessageData {
    connectMessages: Message[],
    firstPage: boolean,
    lastPage: boolean,
    fetchMoreMessages: (position: 'older' | 'newer', chatUUID?: string) => Promise<string | void>,
    compareDate: (date1: string, date2: string) => boolean,
}

export const useMessageData = (): useMessageData => {

    const stomp = useSelector((state: RootState) => state.stomp)
    const stompParam = useSelector((state: RootState) => state.stomp.param)
    const userId = localStorage.getItem("userId");
    //메세지목록
    const [messages, setMessages] = useState<Message[]>([]);
    //웹소켓 메시지 목록
    const [newMessages, setNewMessages] = useState<Message[]>([]);
    //마지막 페이지인지 구분하기 위한 값
    const [lastMessage, setLastMessage] = useState<Message>();

    //맨 처음 페이지인지
    const [firstPage, setIsFirstPage] = useState<boolean>(false);
    //맨 마지막 페이지인지
    const [lastPage, setIsLastPage] = useState<boolean>(true);
    //api 중복 호출 방지
    const [isFetching, setIsFetching] = useState(false); // 요청 진행 여부를 추적하는 ref


    //시작하자마자 데이터 받아오기
    useEffect(() => {
        getInitialMessages();
    }, []);


    //데이터 => 웹소켓 새로운 메세지 받기
    useEffect(() => {
        const {state, param, message} = stomp.receiveMessage;
        if (stompParam !== param || messages.length === 0) return;
        if (message && state === "SEND") {
            setNewMessages([...newMessages, ...message]);
            setLastMessage(message[message.length - 1]);
        }
    }, [stomp.receiveMessage.receivedUUID]);

    const connectMessages = useMemo(() => {
        if (messages.length === 0) return []
        if (messages[0].chatUUID === "시작라인") {
            setIsFirstPage(true);
        } else {
            setIsFirstPage(false)
        }
        if ([...messages, ...newMessages].at(-1)?.chatUUID === lastMessage?.chatUUID) {
            setIsLastPage(true)
        } else {
            setIsLastPage(false)
        }

        return (lastPage ? [...messages, ...newMessages] : [...messages]).filter((message: Message) => message.chatUUID !== "시작라인")
    }, [messages, newMessages])


    //데이터 => 초기 Message get
    const getInitialMessages = async () => {
        const response = await axios.post('/api/getChattingFile', {
            param: stompParam,
            userId: userId,
        });
        setMessages(response.data);
        setLastMessage(response.data.at(-1))
        setIsLastPage(true);
    };


    useEffect(() => {
        if (!isFetching) return
        setTimeout(() => {
            setIsFetching(false);
        }, 500)
    }, [connectMessages]);

    //데이터 => 추가 데이터 받기 및 가공
    const fetchMoreMessages = async (position: 'older' | 'newer', chatUUID?: string): Promise<string | void> => {
        if (!chatUUID || isFetching) return; // 메시지가 없거나 요청 진행 중이면 반환
        setIsFetching(true) // 요청 시작 플래그 설정

        axios.post('/api/ReloadChattingFile', {
            param: stompParam,
            userId: userId,
            chatId: chatUUID,
            newOrOld: position
        }).then((response) => {
            setMessages(prevMessages => {
                if (!response.data) return prevMessages
                if (response.data[0].chatUUID === prevMessages[0]?.chatUUID) {
                    return prevMessages; // 동일한 메시지의 중복 방지
                }

                if (position === 'older') {
                    if ((response.data.length + prevMessages.length) >= 120) {
                        return [...response.data, ...prevMessages].slice(0, 60);
                    } else {
                        return [...response.data, ...prevMessages]
                    }
                } else { //position => newer
                    if ((response.data.length + prevMessages.length) >= 120) {
                        return [...prevMessages, ...response.data].slice(prevMessages.length + response.data.length - 62);
                    } else {
                        return [...prevMessages, ...response.data]
                    }
                }
            });

        }).catch((err) => {
            console.error(`Error fetching ${position} messages:`, err);
        });

        return chatUUID;
    };


    //--------------------------------------------------------------------------------------------------------------- 의존성을 활용한 페이지 랜더링 및 업데이트 관리
    const compareDate = (date1: string, date2: string): boolean => {
        if (changeDateForm(date1).getDate() !== changeDateForm(date2).getDate()) return true
        if (changeDateForm(date1).getMonth() !== changeDateForm(date2).getMonth()) return true
        return changeDateForm(date1).getFullYear() !== changeDateForm(date2).getFullYear();
    }
    return {connectMessages, firstPage, lastPage, fetchMoreMessages, compareDate};
}