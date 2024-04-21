import {ChangeEvent, useEffect, useState, useRef, useCallback, useMemo, useId} from "react";
import {connect} from "react-redux";
import {
    DispatchStompProps,
    mapDispatchToStompProps,
    StompData,
    mapStateToStompProps
} from '../../store/module/StompReducer'
import {
    MessageBoxContainer,
    MessageContainer,
    MessageContainer2,
    ProfileContainer,
    DateContainer,
    DateContainer2,
    NickNameContainer,
    MessageContentContainer,
    MessageContentContainer2,
    ScrollableDiv,
    HR_ChatEndPoint,
    SEND_INPUT,
    SEND_BUTTON,
    IMG_SIZE,
    FORM_SENDMSG,
} from '../../style/ChatBoxStyle'
import {
    RowFlexBox,

} from '../../style/FormStyle'
import {endPointMap} from '../../store/module/StompMiddleware';
import {
    changeDateForm,
    AHMFormatV2,
    shortAHMFormat,
    throttleByAnimationFrame,
    throttle,
    debounce
} from '../../stateFunc/actionFun'
import {useInfiniteQuery} from '@tanstack/react-query';
import store from '../../store/store';
import useIntersect from "../../store/module/useIntersect";

interface groupDetailProps {
    target: string;
    param: string;
}

interface Message {
    chatUUID: string,
    sendDate: string,
    userEmail: string,
    nickName: string,
    message: string,
}

interface receiveMsg {
    recievedmessage: Message
}

type groupMsgProps = groupDetailProps & DispatchStompProps & StompData
const GroupMsgBox: React.FC<groupMsgProps> = ({param, stomp, sendStompMsg, requestFile}) => {
    const [content, setContent] = useState<string>('');
    const chatRef = useRef<HTMLInputElement>(null);// 채팅 input Ref
    const scrollTimerRef = useRef<NodeJS.Timeout | undefined>(); //채팅스크롤 디바운싱 Ref
    const scrollRef = useRef<HTMLDivElement | null>(null); //채팅스크롤 Ref
    const messageLength = useRef<number>(0);
    const prevScrollHeight = useRef<number>();//메시지 스크롤 증가 전 사이즈

    const CHATTING_QUERY_KEY: string = "CHATTING_QUERY_KEY";

    const requestChatFile = () => {
        // console.log(messageLength.current);
        if (!messageLength.current) {
            requestFile({
                target: 'groupMsg',
                param: param,
                requestFile: "READ",
                nowLine: endPointMap.get(param)
            });
            console.log("실행")
        } else {
            requestFile({
                target: 'groupMsg',
                param: param,
                requestFile: "RELOAD",
                nowLine: messageLength.current
            });
            console.log("실행2")
        }
    }

    //axios를 대신해서 파일로드를 도움
    const receiveChatFile = () => {
        const {message, state} = stomp.receiveMessage

        if (state === "RELOAD" && !hasNextPage) return []
        const getFileData = () => {
            if (message) {
                return [...message]
            }
            return [];
        }
        const messageEntries = Array.from(getFileData(), (message: string) => {
            const messageData = message.split("$", 5)
            if (!messageData[1]) return
            const loadMsg: Message = {
                chatUUID: messageData[0],
                sendDate: messageData[1].slice(1, 17),
                userEmail: messageData[2],
                nickName: messageData[3],
                message: messageData[4],
            }
            return loadMsg
        })

        return messageEntries
    }

    async function fetchData() {
        try {
            const result = await receiveChatFile();
            return result; // 처리된 결과 출력
        } catch (error) {
            console.error(error); // 오류 처리
            return [];
        }
    }

    const {data, hasNextPage, isFetching, isLoading, fetchNextPage, isError} = useInfiniteQuery({
        queryKey: [CHATTING_QUERY_KEY, param],
        queryFn: fetchData,
        getNextPageParam: (messageList) => {
            const containsValue = messageList.some((item) => item?.chatUUID !== "시작라인")
            return containsValue ? true : undefined;
        }, //data의 값을 받아 처리할 수 있음
        initialPageParam: null,
        enabled: param === stomp.receiveMessage.param,
    });
    //getNextPageParam : 다음 페이지가 있는지 체크, 현재 data를 인자로 받아 체크할 수 있으며 체크 값에 따라 hasNextPage가 정해짐

    const topRef = useIntersect((entry, observer) => {
        console.log("실행?")
        if (hasNextPage && !isFetching) {
            observer.unobserve(entry.target);
            requestChatFile();

            const unsubscribe = store.subscribe(() => {
                const currentStore = store.getState();
                if (currentStore.stomp.receiveMessage.state === "RELOAD") {
                    if (scrollRef.current) {
                        const {scrollHeight} = scrollRef.current;
                        prevScrollHeight.current = scrollHeight;

                        const refetchFile = throttleByAnimationFrame(() => {
                            fetchNextPage();
                        });
                        refetchFile();

                        // 구독 즉시 취소
                        unsubscribe();
                    }
                }
            });
        }
    });

    useEffect(() => {
        scrollRef.current?.removeEventListener('scroll', handleScroll);
    }, [param])

    const messageList = useMemo(() => {
        if (data && !isFetching) {
            return [...data.pages.reduce((prev, current) => prev.concat(current))]
        }
        return [];
    }, [data])

    useEffect(() => {
        messageLength.current = messageList.length;//길이 세팅
        console.log(messageLength.current)
        if (stomp.receiveMessage.state === "RELOAD") {
            if (scrollRef.current && prevScrollHeight.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight - prevScrollHeight.current;
            }
        }
    }, [messageList])


    //처음 들어갔을 때 스크롤에따른 상태체크
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.addEventListener('scroll', handleScroll);
            if (endPointMap.get(param) === 0) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

            } else {
                ///endPoint를 찾아서 해당 위치로 스크롤 셋팅
                const scrollDiv = scrollRef.current;
                const targetElement = scrollDiv.querySelector('.엔드포인트')
                if (targetElement) {
                    const targetElementRect = targetElement.getBoundingClientRect();
                    scrollRef.current.scrollTop = targetElementRect.bottom - 300;
                }
            }
        }
        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener('scroll', handleScroll);
            }
        }
    }, [isLoading])


    const handleScroll = () => {
        if (scrollTimerRef.current) {
            clearTimeout(scrollTimerRef.current);
        }
        scrollTimerRef.current = setTimeout(() => {
            updateScroll()
        }, 50)
    };


    //스크롤 상태에 따른 endPoint업데이트
    const updateScroll = () => {
        if (scrollRef.current) {
            const {scrollTop, scrollHeight, clientHeight} = scrollRef.current;
            //현재위치랑 스크롤의 맨아래 위치에 있으면 (ScrollMinHeight = 현재 스크롤 div의 최소크기)
            if (scrollTop + clientHeight === scrollHeight && endPointMap.get(param) !== 0) {
                endPointMap.set(param, 0)
                scrollToBottom();
                updateEndpoint();
                return;
            }
        }
    }

    const updateEndpoint = () => {
        const debouncedRequest = debounce(() => {
            requestFile({target: 'groupMsg', param: param, requestFile: "ENDPOINT", nowLine: 0});
            console.log('앤드포인트 갱신');
        }, 1000);
        debouncedRequest();
    }


    //메시지 전송 함수
    const sendMsg = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (content === '') return;
        sendStompMsg({target: 'groupMsg', param: param, message: content})
        setContent('');
        if (chatRef.current) {
            chatRef.current.value = ''
        }
        scrollToBottom()
    }

    const scrollToBottom = () => {
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight
            }
        }, 50)
    };


    const MessageBox = useMemo(() => {

        if (!isLoading) {
            return (
                <ScrollableDiv id="ScrollContainerDiv" ref={scrollRef}>
                    {!isLoading && <div className="scrollTop" ref={topRef}></div>}

                    {messageList !== undefined &&
                        messageList.reverse().map((message: Message | undefined, index: number) => (
                            ((message !== undefined && message.chatUUID !== "시작라인") &&
                                <MessageBoxContainer className={message.chatUUID}
                                                     key={message.chatUUID + index}
                                                     $sameUser={index !== 0 && messageList[index - 1]?.userEmail === message.userEmail
                                                     }>
                                    {message.chatUUID === '엔드포인트' ?

                                        <hr data-content={"NEW"}></hr> :
                                        (index && messageList[index - 1]?.userEmail === message.userEmail ? (
                                            <MessageContainer2>
                                                <DateContainer2>{shortAHMFormat(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer2>
                                                <MessageContentContainer2>{message.message}</MessageContentContainer2>
                                            </MessageContainer2>
                                        ) : (
                                            <RowFlexBox style={{width: 'auto'}}>
                                                <ProfileContainer>{message.userEmail.slice(0, 1)}</ProfileContainer>
                                                <MessageContainer>
                                                    <RowFlexBox>
                                                        <NickNameContainer>{message.nickName}</NickNameContainer>
                                                        <DateContainer>{AHMFormatV2(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer>
                                                    </RowFlexBox>
                                                    <MessageContentContainer>{message.message}</MessageContentContainer>
                                                </MessageContainer>
                                            </RowFlexBox>
                                        ))
                                    }
                                </MessageBoxContainer>)
                        ))}
                    <div className="scrollBottom" style={{marginTop: '10px'}}></div>
                </ScrollableDiv>
            );
        }
        return null;
    }, [messageList, data]);


    return (
        <div>
            {MessageBox}
            <div>
                <FORM_SENDMSG onSubmit={sendMsg}>
                    <SEND_INPUT type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setContent(e.target.value)
                    }} ref={chatRef}></SEND_INPUT>
                    <SEND_BUTTON>
                        <IMG_SIZE src={"/image/send.png"} alt={"send"}/>
                    </SEND_BUTTON>
                </FORM_SENDMSG>
            </div>
        </div>
    )
}
export default connect(mapStateToStompProps, mapDispatchToStompProps)(GroupMsgBox);