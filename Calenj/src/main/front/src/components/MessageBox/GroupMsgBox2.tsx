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
import {endPointMap,scrollPointMap} from '../../store/module/StompMiddleware';
import {
    changeDateForm,
    AHMFormatV2,
    shortAHMFormat,
    throttleByAnimationFrame,
    throttle,
    debounce
} from '../../stateFunc/actionFun'
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import store from '../../store/store';
import useIntersect from "../../store/module/useIntersect";
import {queryClient} from "../../index";

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


type groupMsgProps = groupDetailProps & DispatchStompProps & StompData
const GroupMsgBox: React.FC<groupMsgProps> = ({param, stomp, sendStompMsg, requestFile}) => {
    const [content, setContent] = useState<string>('');
    const chatRef = useRef<HTMLInputElement>(null);// 채팅 input Ref
    const scrollTimerRef = useRef<NodeJS.Timeout | undefined>(); //채팅스크롤 디바운싱 Ref
    const scrollRef = useRef<HTMLDivElement | null>(null); //채팅스크롤 Ref
    const messageLength = useRef<number>(0);
    const prevScrollHeight = useRef<number>();//메시지 스크롤 증가 전 사이즈
    const berforeScrollTop = useRef<number>(); //이전 스크롤의 위치를 기억
    const beforeScrollHeight = useRef<number>(); //이전 스크롤의 높이를 기억



    const CHATTING_QUERY_KEY: string = "CHATTING_QUERY_KEY";
    const NEW_CAHT_QUERY_KEY: string = "NEW_CAHT_QUERY_KEY";


    //---------------------------------------------------------------------------------------------------------------스크롤(endPoint 업데이트 관련) 및 메시지 SEND
    const handleScroll = () => {
        if (scrollTimerRef.current) {
            clearTimeout(scrollTimerRef.current);
        }
        scrollTimerRef.current = setTimeout(() => {
            updateScroll()
        }, 50)
    };
    const addScrollEvent=()=>{
        //isLoading이 falset가 돼야 스크롤 scrollRef가 잡혀서 셋팅됨
        //로딩된 이후엔 스크롤을 안 내려야함
        if (scrollRef.current) {
            
            scrollRef.current.addEventListener('scroll', handleScroll);
            //첫 로딩에만 세팅 이후엔 위치를 안바꿈
            if (endPointMap.get(param) === 0 && newMessageList.length===0) { 
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                scrollPointMap.set(param, scrollRef.current.scrollTop)
            } else if(endPointMap.get(param)>0) {
                ///endPoint를 찾아서 해당 위치로 스크롤 셋팅
                
                const scrollDiv = scrollRef.current;
                const targetElement = scrollDiv.querySelector('.엔드포인트')
                if (targetElement) {
                    const targetElementRect = targetElement.getBoundingClientRect();
                    //param이 변경되어도 이전 scrollTop을 가지고 있어 그만큼 다시 더해줘야함
                    //만약 이전 스크롤 탑이 300인데 안 더해주면 300만큼 위로 올라감(-300돼서)
                    scrollRef.current.scrollTop += targetElementRect.bottom-300 ;
                    scrollPointMap.set(param, scrollRef.current.scrollTop)
                }
            }else {
                scrollRef.current.scrollTop =  scrollPointMap.get(param)                
                scrollPointMap.set(param, scrollRef.current.scrollTop)
            }

        }
    }


    //스크롤 상태에 따른 endPoint업데이트
    const updateScroll = () => {
        if (!scrollRef.current) return
        const {scrollTop, scrollHeight, clientHeight} = scrollRef.current;
        //현재위치랑 스크롤의 맨아래 위치에 있으면 (ScrollMinHeight = 현재 스크롤 div의 최소크기)
        if (scrollHeight > clientHeight && scrollTop + clientHeight > clientHeight) {
            if (scrollTop + clientHeight === scrollHeight && endPointMap.get(param) !== 0) {
                endPointMap.set(param, 0)
                scrollToBottom();
                updateEndpoint();   
            }
        }
        berforeScrollTop.current=scrollRef.current.scrollTop;
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
        updateEndpoint()
        scrollToBottom()
    }

    const scrollToBottom = () => {
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                berforeScrollTop.current=scrollRef.current.scrollTop
            }
        }, 50)
    };

    //--------------------------------------------------------------------------------------------------------------- 파일 요청 READ/RELOAD 함수
    const requestChatFileRead = () => {
        if (!messageLength.current) {
            requestFile({
                target: 'groupMsg',
                param: param,
                requestFile: "READ",
                nowLine: endPointMap.get(param)
            });
        }
    }
    const requestChatFileReload = () => {
        console.log("messageLength.current", messageLength.current)
        if (messageLength.current) {
            requestFile({
                target: 'groupMsg',
                param: param,
                requestFile: "RELOAD",
                nowLine: messageLength.current
            });
        }
    }
    //--------------------------------------------------------------------------------------------------------------- 비동기식 함수 > WebSocket stomp를 받아 infiniteFetch
    //axios를 대신해서 파일로드를 도움
    const receiveChatFile = (messages: string[]) => {

        const messageEntries = Array.from(messages, (message: string) => {
            const messageData = message.split("$", 5);
            if (!messageData[1]) return null;
            const loadMsg: Message = {
                chatUUID: messageData[0],
                sendDate: messageData[1].slice(1, 17),
                userEmail: messageData[2],
                nickName: messageData[3],
                message: messageData[4],
            };
            return loadMsg;
        }).filter((msg: Message | null) => msg !== null);  // null이 아닌 메시지만 필터링


        return messageEntries
    }

    async function fetchData() {
        try {
            const getFileData = () => {
                //Promise로 비동기식 처리, stomp가 바뀌면 res에 담아서 반환 > await으로 값이 나올때까지
                return new Promise((res, rej) => {
                    if (!isFetching) {
                        requestChatFileReload()
                    }
                    const unsubscribe = store.subscribe(() => {
                        const {receiveMessage} = store.getState().stomp;
                        if (receiveMessage) {
                            res(receiveMessage.message); // 값 반환
                            unsubscribe(); // 구독 취소
                        }
                    });
                }).then((res) => {
                    return [...res as string[]]; // Promise 결과로 받은 값을 배열로 변환하여 반환
                }).catch(() => {
                    return [];
                });
            }
            const message = await getFileData();
            messageLength.current += receiveChatFile(message).length;
            return receiveChatFile(message); // 처리된 결과 출력
        } catch (error) {
            console.error(error); // 오류 처리
            return [];
        }
    }

//--------------------------------------------------------------------------------------------------------------- 새로 받은 메시지 관련

    const fetchNewChat = () => {
        //초기 세팅
        if (!receiveNewMessage.data) {
            const loadMsg: Message = {
                chatUUID: "시작라인",
                sendDate: "",
                userEmail: "",
                nickName: "",
                message: "",
            };
            return loadMsg
        }
        const {chatUUID, sendDate, userEmail, nickName, message} = stomp.receiveMessage
        const loadMsg: Message = {
            chatUUID: chatUUID,
            sendDate: sendDate,
            userEmail: userEmail,
            nickName: nickName,
            message: message.toString(),
        };
        return loadMsg;
    }
//---------------------------------------------------------------------------------------------------------------
    const {data, hasNextPage, isFetching, isLoading, fetchNextPage, refetch} = useInfiniteQuery({
        queryKey: [CHATTING_QUERY_KEY, param],
        queryFn: fetchData,
        getNextPageParam: (messageList) => {
            const containsValue = messageList[messageList.length - 1]?.chatUUID === "시작라인"
            return containsValue ? undefined : true;
        }, //data의 값을 받아 처리할 수 있음
        initialPageParam: null,
        enabled: param === stomp.receiveMessage.param,
    });

    const receiveNewMessage = useInfiniteQuery({
        queryKey: [NEW_CAHT_QUERY_KEY, param],
        queryFn: fetchNewChat,
        getNextPageParam: () => {
            return true;
        }, //data의 값을 받아 처리할 수 있음
        initialPageParam: null,
        enabled: param === stomp.receiveMessage.param && !isFetching,
    });
    //getNextPageParam : 다음 페이지가 있는지 체크, 현재 data를 인자로 받아 체크할 수 있으며 체크 값에 따라 hasNextPage가 정해짐

    //---------------------------------------------------------------------------------------------------------------옵저버를 활용한 스크롤 관리 > 관측 시 stomp RELOAD 요청

    const topRef = useIntersect((entry, observer) => {
        if (hasNextPage && !isFetching) {
            observer.unobserve(entry.target);

            if (scrollRef.current) {
                const {scrollHeight} = scrollRef.current;
                prevScrollHeight.current = scrollHeight;

                const refetchFile = throttleByAnimationFrame(() => {
                    fetchNextPage();
                });
                refetchFile();
            }
        }
    });

    const messageList = useMemo(() => {
        if (data) {
            return [...data.pages.reduce((prev, current) => prev.concat(current))]
        }
        return [];
    }, [data])
    //--------------------------------------------------------------------------------------------------------------- 새로 받은 메시지를 관리 SEDN 발생 시 infiniteQuery fetch
    //메시지를 받기위한 useEffect  => SEND감지 후 fetch()
    useEffect(() => {
        const {state} = stomp.receiveMessage;
        //해당 방의 채팅내용만 받아옴
        if (param !== stomp.receiveMessage.param) return
        //셋팅 이후 send를 받음 =>1.READ한 파일 세팅 이후 처리

        if ((!receiveNewMessage.isFetching) && state === "SEND") {
            receiveNewMessage.fetchNextPage();
            updateScroll()
        }
    }, [stomp.receiveMessage.chatUUID])


    const newMessageList = useMemo(() => {
        
        if (receiveNewMessage.data) {
            return receiveNewMessage.data.pages
        }
        return [];
    }, [receiveNewMessage.data])

    //--------------------------------------------------------------------------------------------------------------- 의존성을 활용한 페이지 랜더링 및 업데이트 관리

    
    useEffect(() => {

        if (endPointMap.get(param) === 0) {
            requestChatFileRead();
        }
        if (endPointMap.get(param) > 0) {
            messageLength.current = 0;
            requestChatFileRead();
            refetch().then(() => {
                newMessageList.length = 0;
               
            });
        }
        return ()=>{
            if(!beforeScrollHeight.current) return 
            if(!scrollRef.current) return
            if(scrollRef.current.clientHeight < beforeScrollHeight.current){
                scrollPointMap.set(param,berforeScrollTop.current);
            }
            
            console.log(`param: ${param}\n beforeScrollHeight : ${beforeScrollHeight.current} \n beforeScrollTop : ${berforeScrollTop.current}`)

        }
        
    }, [param])


    useEffect(() => {
        //messageLength.current = messageList.length;//길이 세팅
        if (stomp.receiveMessage.state === "RELOAD") {
            if (scrollRef.current && prevScrollHeight.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight - prevScrollHeight.current;
            }
        }
    }, [messageList])


    //처음 들어갔을 때 스크롤에따른 상태체크
    useEffect(() => {
        addScrollEvent()
        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener('scroll', handleScroll);
            }
        }
    }, [isLoading,param])


    const MessageBox = useMemo(() => {
        const connectList = [...[...newMessageList].reverse(), ...messageList].reverse() //얕은 복사를 활용한 복사 //최신 -> 오래된 방향을 reverse해서 스크롤에 띄움
        beforeScrollHeight.current = scrollRef.current?.scrollHeight; //랜더링마다 높이 재저장
        if (!isLoading) {
            return (
                <ScrollableDiv id="ScrollContainerDiv" ref={scrollRef}>
                    <div className="scrollTop" ref={topRef}></div>

                    {connectList.map((message: Message | null, index: number) => (
                        ((message !== null && message.chatUUID !== "시작라인") &&
                            <MessageBoxContainer className={message.chatUUID}
                                                 key={message.chatUUID + index}
                                                 $sameUser={index !== 0 && connectList[index - 1]?.userEmail === message.userEmail
                                                 }>
                                {message.chatUUID === '엔드포인트' ?

                                    <hr data-content={"NEW"}></hr> :
                                    (index && connectList[index - 1]?.userEmail === message.userEmail ? (
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
    }, [messageList, data, newMessageList]);


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