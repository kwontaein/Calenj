import {useMessageScroll} from "../../index";
import {useMessageData} from "../model/useMessageData";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {AHMFormat, AHMFormatV2, changeDateForm, shortAHMFormat, throttleByAnimationFrame} from "../../../../shared/lib";
import {useComponentSize, useIntersect} from "../../../../shared/model";
import {useDispatch, useSelector} from "react-redux";
import {
    endPointMap,
    requestFile,
    RootState,
    scrollPointMap,
    sendStompMsg,
    updateAppPosition
} from "../../../../entities/redux";
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

    const {compareDate} = useMessageData(stomp.param)


    //메세지목록
    const [messages, setMessages] = useState<Message[]>([]);
    //웹소켓 메시지 목록
    const [newMessages, setNewMessages] = useState<Message[]>([]);
    //마지막 페이지인지 구분하기 위한 값
    const [lastMessage, setLastMessage] = useState<Message>();

    //맨 처음 페이지인지
    const [alarm, setAlarm] = useState<number>(0);

    //맨 처음 페이지인지
    const [firstPage, setIsFirstPage] = useState<boolean>(false);
    //맨 마지막 페이지인지
    const [lastPage, setIsLastPage] = useState<boolean>(true);

    //아래로 내려가기 버튼
    const [showDown, setShowDown] = useState<boolean>(true);

    //위로 내용 불러오기
    const [hasMoreTop, setHasMoreTop] = useState(true);
    //아래로 내용 불러오기
    const [hasMoreBottom, setHasMoreBottom] = useState(true);

    //보낼 채팅 내용
    const [inputMessage, setInputMessage] = useState("");

    //api 중복 호출 방지
    const isFetchingRef = useRef(false); // 요청 진행 여부를 추적하는 ref
    const isSendRef = useRef(false); // 요청 진행 여부를 추적하는 ref

    //높이 관련
    const containerRef = useRef<HTMLDivElement | null>(null);
    const topDivRef = useRef<HTMLDivElement | null>(null);
    const bottomDivRef = useRef<HTMLDivElement | null>(null);


    //높이 관련(엔드포인트 찍기 위한 div)
    const endPointRef = useRef<HTMLDivElement | null>(null);
    //높이 관련(메세지 uuid 위치로 이동)
    const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const userId = localStorage.getItem("userId");
    const {param} = useSelector((state: RootState) => state.subNavigation.group_subNavState)

    //웹소켓 메세지 받기
    useEffect(() => {
        const {state} = stomp.receiveMessage;
        if (param !== stomp.receiveMessage.param) return;
        if (stomp.receiveMessage.message && stomp.receiveMessage.state === "SEND") {
            setNewMessages([...newMessages, ...stomp.receiveMessage.message]);
            setLastMessage(stomp.receiveMessage.message[stomp.receiveMessage.message.length - 1]);
            if (userId === stomp.receiveMessage.message[0].userId) {
                setAlarm(0);
            } else {
                setAlarm(alarm + 1);

            }
        }
    }, [stomp.receiveMessage.message]);

    const scrollToMessage = useCallback((chatUUID: string, alignToBottom: boolean = false) => {
        const messageDiv = messageRefs.current[chatUUID];
        if (messageDiv && containerRef.current) {
            if (alignToBottom) {
                containerRef.current.scrollTop = messageDiv.offsetTop - containerRef.current.clientHeight + messageDiv.clientHeight;
            } else {
                containerRef.current.scrollTop = messageDiv.offsetTop - 80;
            }
        }
    }, []);

    //스크롤 맨 밑으로 이동
    const scrollToBottom = useCallback(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, []);

    //시작하자마자 데이터 받아오기
    useEffect(() => {
        fetchInitialMessages();


    }, []);
    //시작하자마자 데이터 받아오기 #2
    const fetchInitialMessages = async () => {
        const response = await axios.post('/api/getChattingFile', {
            param: param,
            userId: userId,
        });
        setMessages(response.data);
        setLastMessage(response.data[response.data.length - 1])
        setIsLastPage(true);

        if (response.data[0].chatUUID === "시작라인") {
            setIsFirstPage(true);
        }
        setTimeout(() => {
            // 엔드포인트 메시지가 있는지 확인
            const hasEndPoint = response.data.some((message: Message) => message.chatUUID === "엔드포인트");
            if (hasEndPoint) {
                scrollToMessage("엔드포인트");
            } else {
                scrollToBottom();
            }
        }, 0);
    };

    useEffect(() => {
        if (newMessages.length > 0) {
            if (containerRef.current) {
                const {scrollTop, scrollHeight, clientHeight} = containerRef.current;
                const isAtBottom = scrollHeight - scrollTop <= clientHeight + 300; // 바닥에서 50px 이내에 있을 경우
                if (isAtBottom) {
                    scrollToBottom();
                } else {
                    setShowDown(true);
                }
            }
        }
    }, [newMessages, scrollToBottom]);

    //아래로 버튼 클릭시 상호작용
    const goBottom = async () => {
        if (lastPage) { //마지막 페이지이고, 80개가 넘지 않으면 다시 불러올 필요 없음.
            scrollToBottom();
        } else {
            fetchInitialMessages();
        }
    }

    //메세지 추가 로딩
    useEffect(() => {
        //스크롤 조정
        const handleScroll = () => {
            if (!containerRef.current) return;
            const container = containerRef.current;

            const topDivRect = topDivRef.current?.getBoundingClientRect();
            const bottomDivRect = bottomDivRef.current?.getBoundingClientRect();
            const endPointDivRect = endPointRef.current?.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            if (topDivRect && topDivRect.bottom >= containerRect.top && hasMoreTop) {
                fetchMoreMessages('older', messages[0]?.chatUUID).then(r => console.log());
            }
            if (bottomDivRect && bottomDivRect.top <= containerRect.bottom && hasMoreBottom) {
                fetchMoreMessages('newer', messages[messages.length - 1]?.chatUUID).then(r => console.log());
            }
            if (lastPage && endPointDivRect && endPointDivRect.top <= containerRect.bottom && !isSendRef.current) {
                isSendRef.current = true; // 중복 호출 방지 플래그 설정

                sendEndPoint(); // lastPage가 true이고 화면이 맨 아래에 닿았을 때 함수 호출

                setTimeout(() => {
                    isSendRef.current = false; // 일정 시간 후 다시 호출 가능하게 설정
                }, 3000);
            }
        };

        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [hasMoreTop, hasMoreBottom, messages]);


    //추가 데이터 받기 및 가공
    const fetchMoreMessages = async (position: 'older' | 'newer', chatUUID?: string) => {
        try {
            if (!chatUUID || isFetchingRef.current) return; // 메시지가 없거나 요청 진행 중이면 반환
            isFetchingRef.current = true; // 요청 시작 플래그 설정

            setTimeout(() => {
                isFetchingRef.current = false; // 3초 후 요청 가능하게 설정
            }, 500);

            const response = await axios.post('/api/ReloadChattingFile', {
                param: param,
                userId: userId,
                chatId: chatUUID,
                newOrOld: position
            });

            setMessages(prevMessages => {
                if (response.data[0].chatUUID === prevMessages[0]?.chatUUID) {
                    return prevMessages; // 동일한 메시지의 중복 방지
                }
                const newMessages = position === 'older'
                    ? [...response.data, ...prevMessages] :
                    [...prevMessages, ...response.data];

                if (newMessages[0].chatUUID === "시작라인") {
                    setIsFirstPage(true);
                }
                if (newMessages[newMessages.length - 1].chatUUID === lastMessage?.chatUUID) {
                    console.log("실행 비우기")
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
                console.log(position);
                scrollToMessage(chatUUID, position === 'newer');
            }, 0);

        } catch (error) {
            console.error(`Error fetching ${position} messages:`, error);
        }
    };

    const sendEndPoint = () => {
        dispatch(requestFile({target: 'groupMsg', param: param, requestFile: "ENDPOINT", nowLine: 0}));
        setAlarm(0);
    };


    const MessageBox = () => {
        console.log(messages);
        return (
            <ScrollableDiv ref={containerRef}>
                {!firstPage && <div className="scrollTop" ref={topDivRef}></div>}
                {messages.map((message: Message, index: number) => (
                    <div key={message.chatUUID}>
                        {(index !== 0 && compareDate(messages[index - 1].sendDate, message.sendDate) && (message.chatUUID !== '엔드포인트')) &&
                            <HR_NewDate
                                data-content={AHMFormat(changeDateForm(message.sendDate.slice(0, 16))).slice(0, 13)}></HR_NewDate>}
                        <MessageBoxContainer className={message.chatUUID}
                                             key={message.chatUUID}
                                             ref={(el) => messageRefs.current[message.chatUUID] = el}
                                             $sameUser={(index !== 0 && messages[index - 1]?.userId === message.userId) &&
                                                 dateOperation(messages[index - 1].sendDate, message.sendDate)}>
                            {message.chatUUID === '엔드포인트' ?
                                <HR_ChatEndPoint data-content={"NEW"}></HR_ChatEndPoint> :
                                ((index && messages[index - 1]?.userId === message.userId) &&
                                dateOperation(messages[index - 1].sendDate, message.sendDate) ? (
                                    <MessageContainer2>
                                        <DateContainer2>{shortAHMFormat(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer2>
                                        <MessageContentContainer2>
                                            {(message.messageType === 'null' || message.messageType === null) && message.message.replace(/\\lineChange/g, '\n').trim()}
                                        </MessageContentContainer2>
                                    </MessageContainer2>
                                ) : (
                                    <RowFlexBox style={{width: 'auto'}}>
                                        <ProfileContainer
                                            $userId={message.userId}>
                                        </ProfileContainer>
                                        <MessageContainer>
                                            <RowFlexBox>
                                                <NickNameContainer>{userNameRegister[message.userId].userName}</NickNameContainer>
                                                <DateContainer>{AHMFormatV2(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer>
                                            </RowFlexBox>
                                            <MessageContentContainer>
                                                <>
                                                    {message.messageType === 'image' && (
                                                        <MessageGridView>
                                                            {message.message.trim().slice(1, -1).split(',').map((image, index) => (
                                                                <ImageWrapper key={index}>
                                                                    <ImageContent $image={image.split('/')[0].trim()}>
                                                                        {image.split('/')[0].trim()}
                                                                    </ImageContent>
                                                                </ImageWrapper>
                                                            ))}
                                                        </MessageGridView>
                                                    )}
                                                    {(message.messageType === 'null' || message.messageType === null) && (
                                                        <div>
                                                            {message.message.replace(/\\lineChange/g, '\n').trim()}
                                                        </div>
                                                    )}
                                                </>
                                            </MessageContentContainer>
                                        </MessageContainer>
                                    </RowFlexBox>
                                ))
                            }
                        </MessageBoxContainer>
                    </div>)
                )}
                {lastPage && newMessages.map((message, index) => {
                    return (
                        <div key={message.chatUUID} ref={(el) => messageRefs.current[message.chatUUID] = el}>
                            {(index === newMessages.length - alarm) && <hr/>}
                            <p>{message.message.replaceAll("\\lineChange", "\n")}</p>
                            <small>{message.sendDate}</small>
                        </div>
                    );
                })}
                {!lastPage ?
                    <div className="scrollBottom" style={{marginTop: '10px'}} ref={bottomDivRef}></div> :
                    <div className="scrollBottom" style={{marginTop: '10px'}} ref={endPointRef}></div>
                }
                <button onClick={goBottom}
                        style={{position: 'fixed', bottom: '70px', right: '10px', backgroundColor: "grey"}}>
                    <p>새로운 알림 : {alarm}</p>
                    <p>맨 아래로</p>
                </button>

            </ScrollableDiv>
        );
    };


    return (
        <MessageScroll_Container $inputSize={inputSize}>
            {MessageBox()}
        </MessageScroll_Container>
    )
}