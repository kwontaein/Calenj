import {useMessageData} from "../model/useMessageData";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    AHMFormat,
    AHMFormatV2,
    changeDateForm,
    debounce,
    shortAHMFormat,
} from "../../../../shared/lib";
import {useDispatch, useSelector} from "react-redux";
import {requestFile, RootState} from "../../../../entities/redux";
import {
    DateContainer,
    DateContainer2, HR_ChatEndPoint, HR_NewDate, ImageContent, ImageWrapper,
    MessageBoxContainer, MessageContainer,
    MessageContainer2, MessageContentContainer,
    MessageContentContainer2, MessageGridView, MessageScroll_Container, NickNameContainer, ProfileContainer,
    ScrollableDiv
} from "./MessageScrollBoxStyled";
import {RowFlexBox} from "../../../../shared/ui/SharedStyled";
import {Message} from "../../../../entities/reactQuery"
import {dateOperation} from "../lib/dateOperation";
import axios from "axios";

export const MessageScrollBox2: React.FC = () => {
    const {inputSize} = useSelector((state: RootState) => state.messageInputSize);
    const {userNameRegister} = useSelector((state: RootState) => state.userNameRegister);
    const dispatch = useDispatch();
    const stomp = useSelector((state: RootState) => state.stomp);
    const {compareDate} = useMessageData(stomp.param);

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessages, setNewMessages] = useState<Message[]>([]);
    const [lastMessage, setLastMessage] = useState<Message>();
    const [firstPage, setIsFirstPage] = useState<boolean>(false);
    const [lastPage, setIsLastPage] = useState<boolean>(true);
    const [showDown, setShowDown] = useState<boolean>(true);
    const [hasMoreTop, setHasMoreTop] = useState(true);
    const [hasMoreBottom, setHasMoreBottom] = useState(true);

    const isFetchingRef = useRef(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const topDivRef = useRef<HTMLDivElement | null>(null);
    const bottomDivRef = useRef<HTMLDivElement | null>(null);
    const endPointRef = useRef<HTMLDivElement | null>(null);
    const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const stompParam = useSelector((state: RootState) => state.stomp.param)
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const {state, param, message} = stomp.receiveMessage;
        if (stompParam !== param || messages.length === 0) return;
        if (message && state === "SEND") {
            setNewMessages(prev => [...prev, ...message]);
            setLastMessage(message[message.length - 1]);
        }
    }, [stomp.receiveMessage.receivedUUID]);

    const scrollToMessage = useCallback((chatUUID: string, alignToBottom: boolean = false) => {
        const messageDiv = messageRefs.current[chatUUID];
        if (messageDiv && containerRef.current) {
            containerRef.current.scrollTop = alignToBottom
                ? messageDiv.offsetTop - containerRef.current.clientHeight + messageDiv.clientHeight
                : messageDiv.offsetTop - 80;
        }
    }, []);

    const scrollToBottom = useCallback(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, []);

    const fetchInitialMessages = useCallback(async () => {
        const response = await axios.post('/api/getChattingFile', {
            param: stompParam,
            userId
        });
        const data = response.data;
        setMessages(data);
        setLastMessage(data[data.length - 1]);
        setIsLastPage(true);
        if (data[0].chatUUID === "시작라인") setIsFirstPage(true);
        setTimeout(() => {
            const hasEndPoint = data.some((message: Message) => message.chatUUID === "엔드포인트");
            hasEndPoint ? scrollToMessage("엔드포인트") : scrollToBottom();
        }, 0);
    }, [stompParam, userId, scrollToMessage, scrollToBottom]);

    useEffect(() => {
        fetchInitialMessages();
    }, [fetchInitialMessages]);

    useEffect(() => {
        if (newMessages.length > 0 && containerRef.current) {
            const {scrollTop, scrollHeight, clientHeight} = containerRef.current;
            const isAtBottom = scrollHeight - scrollTop <= clientHeight + 300;
            isAtBottom ? scrollToBottom() : setShowDown(true);
        }
    }, [newMessages, scrollToBottom]);

    const goBottom = async () => {
        lastPage ? scrollToBottom() : fetchInitialMessages();
    }

    const fetchMoreMessages = async (position: 'older' | 'newer', chatUUID?: string) => {
        if (!chatUUID || isFetchingRef.current) return;
        isFetchingRef.current = true;
        setTimeout(() => {
            isFetchingRef.current = false;
        }, 500);

        try {
            const response = await axios.post('/api/ReloadChattingFile', {
                param: stompParam,
                userId,
                chatId: chatUUID,
                newOrOld: position
            });

            const data = response.data;
            setMessages(prevMessages => {
                const newMessages = position === 'older'
                    ? [...data, ...prevMessages]
                    : [...prevMessages, ...data];

                if (newMessages[0].chatUUID === "시작라인") setIsFirstPage(true);
                if (newMessages[newMessages.length - 1].chatUUID === lastMessage?.chatUUID) {
                    setNewMessages([]);
                    setIsLastPage(true);
                }

                if (newMessages.length >= 120) {
                    if (position === 'older') {
                        setIsLastPage(false);
                        return newMessages.slice(0, 60);
                    } else {
                        setIsFirstPage(false);
                        return newMessages.slice(newMessages.length - 60);
                    }
                }

                return newMessages;
            });

            setTimeout(() => {
                scrollToMessage(chatUUID, position === 'newer');
            }, 0);

        } catch (error) {
            console.error(`Error fetching ${position} messages:`, error);
        }
    };

    const debouncing_EndPoint = useMemo(() => debounce(() => {
        dispatch(requestFile({target: 'groupMsg', param: stompParam, requestFile: "ENDPOINT", nowLine: 0}));
    }, 1000), [dispatch, stompParam]);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const container = containerRef.current;
            const topDivRect = topDivRef.current?.getBoundingClientRect();
            const bottomDivRect = bottomDivRef.current?.getBoundingClientRect();
            const endPointDivRect = endPointRef.current?.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            if (topDivRect && topDivRect.bottom >= containerRect.top && hasMoreTop) {
                fetchMoreMessages('older', messages[0]?.chatUUID);
            }
            if (bottomDivRect && bottomDivRect.top <= containerRect.bottom && hasMoreBottom) {
                fetchMoreMessages('newer', messages[messages.length - 1]?.chatUUID);
            }
            if (lastPage && endPointDivRect && endPointDivRect.top <= containerRect.bottom) {
                debouncing_EndPoint();
            }

            const {scrollHeight, clientHeight, scrollTop} = container;
            if (scrollHeight === clientHeight + scrollTop && lastPage) {
                debouncing_EndPoint();
            }
        };

        containerRef.current?.addEventListener('scroll', handleScroll);
        return () => containerRef.current?.removeEventListener('scroll', handleScroll);
    }, [hasMoreTop, hasMoreBottom, messages, fetchMoreMessages, lastPage, debouncing_EndPoint]);

    const MessageBox = useMemo(() => {
        const connectList = lastPage ? [...messages, ...newMessages] : [...messages];
        return (
            <ScrollableDiv ref={containerRef}>
                {!firstPage && <div className="scrollTop" ref={topDivRef}></div>}
                {connectList.map((message: Message, index: number) => (
                    <div key={message.chatUUID}>
                        {(index !== 0 && compareDate(connectList[index - 1].sendDate, message.sendDate) && (message.chatUUID !== '엔드포인트')) &&
                            <HR_NewDate
                                data-content={AHMFormat(changeDateForm(message.sendDate.slice(0, 16))).slice(0, 13)}></HR_NewDate>}
                        <MessageBoxContainer
                            className={message.chatUUID}
                            ref={(el) => messageRefs.current[message.chatUUID] = el}
                            $sameUser={(index !== 0 && connectList[index - 1]?.userId === message.userId) &&
                                dateOperation(connectList[index - 1].sendDate, message.sendDate)}>
                            {message.chatUUID === '엔드포인트' ? (
                                <HR_ChatEndPoint data-content={"NEW"}></HR_ChatEndPoint>
                            ) : ((index && connectList[index - 1]?.userId === message.userId) &&
                            dateOperation(connectList[index - 1].sendDate, message.sendDate) ? (
                                <MessageContainer2>
                                    <DateContainer2>{shortAHMFormat(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer2>
                                    <MessageContentContainer2>
                                        {(message.messageType === 'null' || message.messageType === null) && message.message.replace(/\\lineChange/g, '\n').trim()}
                                    </MessageContentContainer2>
                                </MessageContainer2>
                            ) : (
                                <RowFlexBox style={{width: 'auto'}}>
                                    <ProfileContainer $userId={message.userId}></ProfileContainer>
                                    <MessageContainer>
                                        <RowFlexBox>
                                            <NickNameContainer>{userNameRegister[message.userId]?.userName}</NickNameContainer>
                                            <DateContainer>{AHMFormatV2(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer>
                                        </RowFlexBox>
                                        <MessageContentContainer>
                                            {message.messageType === 'image' ? (
                                                <MessageGridView>
                                                    {message.message.trim().slice(1, -1).split(',').map((image, index) => (
                                                        <ImageWrapper key={index}>
                                                            <ImageContent $image={image.split('/')[0].trim()}>
                                                                {image.split('/')[0].trim()}
                                                            </ImageContent>
                                                        </ImageWrapper>
                                                    ))}
                                                </MessageGridView>
                                            ) : (
                                                <div>{message.message.replace(/\\lineChange/g, '\n').trim()}</div>
                                            )}
                                        </MessageContentContainer>
                                    </MessageContainer>
                                </RowFlexBox>
                            ))}
                        </MessageBoxContainer>
                    </div>
                ))}
                {!lastPage ? (
                    <div className="scrollBottom" style={{marginTop: '10px'}} ref={bottomDivRef}></div>
                ) : (
                    <div className="scrollBottom" style={{marginTop: '10px'}} ref={endPointRef}></div>
                )}
                <button onClick={goBottom}
                        style={{position: 'fixed', bottom: '70px', right: '10px', backgroundColor: "grey"}}>
                    <p>맨 아래로</p>
                </button>
            </ScrollableDiv>
        );
    }, [messages, newMessages, lastPage, compareDate, userNameRegister, goBottom, scrollToMessage]);

    return (
        <MessageScroll_Container $inputSize={inputSize}>
            {MessageBox}
        </MessageScroll_Container>
    )
}
