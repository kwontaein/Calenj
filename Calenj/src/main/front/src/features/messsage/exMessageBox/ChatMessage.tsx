import React, {useState, useEffect, useRef, useCallback} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from "react-redux";
import {endPointMap, requestFile, RootState, sendStompMsg} from "../../../entities/redux";
import {Message} from "../../../entities/reactQuery";

const ChatComponent: React.FC = () => {
    const dispatch = useDispatch();
    const stomp = useSelector((state: RootState) => state.stomp);
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

    //위로 내용 불러오기
    const [hasMoreTop, setHasMoreTop] = useState(true);
    //아래로 내용 불러오기
    const [hasMoreBottom, setHasMoreBottom] = useState(true);

    //보낼 채팅 내용
    const [inputMessage, setInputMessage] = useState("");

    //api 중복 호출 방지
    const isFetchingRef = useRef(false); // 요청 진행 여부를 추적하는 ref

    //높이 관련
    const containerRef = useRef<HTMLDivElement | null>(null);
    const topDivRef = useRef<HTMLDivElement | null>(null);
    const bottomDivRef = useRef<HTMLDivElement | null>(null);


    //높이 관련(엔드포인트 찍기 위한 div)
    const endPointRef = useRef<HTMLDivElement | null>(null);
    //높이 관련(메세지 uuid 위치로 이동)
    const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    //그룹아이디 임의로 넣은거
    const groupId = "ed957f84-6e3e-432c-963e-cbe073f647a4";

    const userId = localStorage.getItem("userId");

    const {param} = useSelector((state: RootState) => state.subNavigation.group_subNavState)

    //웹소켓 메세지 받기
    useEffect(() => {
        const {state} = stomp.receiveMessage;
        if (groupId !== stomp.receiveMessage.param) return;
        if (stomp.receiveMessage.message) {
            setNewMessages([...newMessages, ...stomp.receiveMessage.message]);
            setLastMessage(stomp.receiveMessage.message[stomp.receiveMessage.message.length - 1]);
            setTimeout(() => {
                scrollToBottom();
            }, 50);
        }
    }, [stomp.receiveMessage.message]);

    //uuid로 스크롤 이동
    const scrollToMessage = useCallback((chatUUID: string) => {
        const messageDiv = messageRefs.current[chatUUID];
        if (messageDiv && containerRef.current) {
            containerRef.current.scrollTop = messageDiv.offsetTop;
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
            param: groupId,
            userId: userId,
        });
        setMessages(response.data);
        setLastMessage(response.data[response.data.length - 1])
        setIsLastPage(true);
        setTimeout(() => {
            scrollToBottom();
        }, 50);
    };

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
            if (lastPage && endPointDivRect && endPointDivRect.top <= containerRect.bottom) {
                sendEndPoint(); // lastPage가 true이고 화면이 맨 아래에 닿았을 때 함수 호출
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
                param: groupId,
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
                    setNewMessages([]);
                    setIsLastPage(true);
                }

                if (newMessages.length >= 80) {
                    if (position === 'older') {
                        setIsLastPage(false);
                        return newMessages.slice(0, 40);
                    } else {
                        setIsFirstPage(false);
                        return newMessages.slice(newMessages.length - 40);
                    }
                }
                return newMessages;
            });

            setTimeout(() => {
                scrollToMessage(chatUUID);
            }, 0);

        } catch (error) {
            console.error(`Error fetching ${position} messages:`, error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessage = () => {
        dispatch(sendStompMsg({target: 'groupMsg', param: groupId, message: inputMessage, messageType: "message"}))
        setInputMessage(""); // 입력 필드 초기화
        setTimeout(() => {
            scrollToBottom();
        }, 0);
    };

    const sendEndPoint = () => {
        dispatch(requestFile({target: 'groupMsg', param: groupId, requestFile: "ENDPOINT", nowLine: 0}));
    };

    return (
        <div>
            <div ref={containerRef} style={{height: '500px', overflowY: 'scroll'}}>
                {!firstPage && <div ref={topDivRef}></div>}
                {messages && messages.map((message) => {
                    const isEndPoint = message.chatUUID === "엔드포인트";
                    return (
                        <div key={message.chatUUID}
                             ref={(el) => messageRefs.current[message.chatUUID] = el}>

                            <p>{message.message.replaceAll("\\lineChange", "\n")}</p>
                            {!isEndPoint && <small>{message.sendDate}</small>}
                        </div>
                    );
                })}
                {lastPage && newMessages.map((message) => (
                    <div key={message.chatUUID} ref={(el) => messageRefs.current[message.chatUUID] = el}>
                        <p>{message.message.replaceAll("\\lineChange", "\n")}</p>
                        <small>{message.sendDate}</small>
                    </div>
                ))}
                {!lastPage ?
                    <div ref={bottomDivRef}></div> :
                    <div ref={endPointRef}></div>
                }
                <button onClick={goBottom} style={{position: 'fixed', bottom: '10px', right: '10px'}}>
                    맨 아래로
                </button>
            </div>
            <div>
                <input type="text" value={inputMessage} onChange={handleInputChange}/>
                <button onClick={handleSendMessage}>전송</button>
            </div>
        </div>
    );
};

export default ChatComponent;
