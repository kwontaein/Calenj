import {ChangeEvent, useEffect, useState, useRef, useLayoutEffect, useMemo} from "react";
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
import {changeDateForm, AHMFormatV2, shortAHMFormat} from '../../stateFunc/actionFun'

interface groupDetailProps {
    target: string;
    param: string;
    updateEndpoint: () => void;
    reloadTopMessage: (nowLine: number) => void;
}

interface Message {
    chatUUID: string,
    sendDate: string,
    userEmail: string,
    nickName: string,
    message: string,
}

type groupMsgProps = groupDetailProps & DispatchStompProps & StompData
const GroupMsgBox: React.FC<groupMsgProps> = ({param, stomp, sendStompMsg, updateEndpoint,reloadTopMessage}) => {
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [beforeUUID, setBeforUUID] = useState<string>('');
    const scrollTimerRef = useRef<NodeJS.Timeout | undefined>(); //채팅스크롤 디바운싱 Ref
    const chatRef = useRef<HTMLInputElement>(null);// 채팅 input Ref
    const scrollRef = useRef<HTMLDivElement | null>(null); //채팅스크롤 Ref
    const [reload, setReload] = useState<boolean>(true);
    const messageLength = useRef<number>();


    /**param이 바뀌면 다시 세팅*/
    useEffect(()=>{
        setLoading(false);
        setReload(false);
        setMessageList([]);
    },[param])

    const sendMsg = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (content === '') return;
        sendStompMsg({target: 'groupMsg', param: param, message: content})
        setContent('');
        if (chatRef.current) {
            chatRef.current.value = ''
        }
        updateEndpoint();
        scrollToBottom();
    }

    //처음 들어갔을 때 스크롤에따른 상태체크
    useLayoutEffect(() => {
        updateScroll();
        if (endPointMap.get(param) === 0) scrollToBottom();
    }, [loading])

    //스크롤 위치 디바운싱
    useEffect(() => {
        const handleScroll = () => {
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current);
            }
            scrollTimerRef.current = setTimeout(() => {
                updateScroll()
            }, 500)
        };

        if (scrollRef.current) {
            scrollRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener('scroll', handleScroll);
            }
        };

    }, [scrollRef, loading]);


    //스크롤 상태에 따른 endPoint업데이트
    const updateScroll = (updateScrollTop?: () => void) => {
        if (scrollRef.current) {
            const {scrollTop, scrollHeight} = scrollRef.current;
            //만약 스크롤이 없는데 받은 메시지가 있다면
            if (scrollHeight < 400 && endPointMap.get(param) != 0) {
                updateEndpoint();
                return;
            }
            //현재위치랑 스크롤의 맨아래 위치에 있으면
            if (scrollTop + 300 === scrollHeight && endPointMap.get(param) !== 0) {
                if (updateScrollTop) {
                    updateScrollTop();
                }
                updateEndpoint();
                return;
            }
            //최상단에 있을경우 리로드
            if (scrollTop === 0 && messageLength.current) {
                setReload(true);
                reloadTopMessage(messageLength.current)
            }
        }
    }

    const scrollToBottom = () => {
        setTimeout(() => {
            if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }, 50)
    };


    //메시지 리스트의 길이를 갱신
    useEffect(() => {
        messageLength.current = messageList.length;
    }, [messageList])


    const setFileLog =()=>{
        let file = stomp.receiveMessage.message as string[]
        file.map((fileMessage) => {

        let msgInfo = fileMessage.split("$", 5)
        if (!msgInfo[1]) return
            const loadMsg: Message = {
                chatUUID: msgInfo[0],
                sendDate: msgInfo[1].slice(1, 17),
                userEmail: msgInfo[2],
                nickName: msgInfo[3],
                message: msgInfo[4],
            }

            if(!loading){
                setMessageList((prev) => {
                    return [...prev, loadMsg]
                })
            }else{
                setMessageList((prev) => {
                    return [loadMsg, ...prev,]
                })
            }
        })
    }

    const settingMessage = () => {
        if (stomp.receiveMessage.param !== param || stomp.receiveMessage.message === null) {
            return
        }
        //로딩까지 딱 1번만 실행하도록
        if (!loading) {
            if (stomp.receiveMessage.state === "READ") {
                let file = stomp.receiveMessage.message as string[]
                setFileLog();
                setLoading(true);
            }
        } else {
            if (stomp.receiveMessage.state === "RELOAD" && reload) {
                setFileLog();
                setReload(false);
            } else if (stomp.receiveMessage.state === "SEND" && beforeUUID !== stomp.receiveMessage.message) {  //재저장을 막기위해 이전 chatUUID를 저장하고 비교함

                const loadMsg: Message = {
                    chatUUID: stomp.receiveMessage.chatUUID,
                    sendDate: stomp.receiveMessage.sendDate,
                    userEmail: stomp.receiveMessage.userEmail,
                    nickName: stomp.receiveMessage.nickName,
                    message: stomp.receiveMessage.message as string
                }
                setBeforUUID(stomp.receiveMessage.message as string)
                setMessageList((prev) => {
                    return [...prev, loadMsg]
                })
                updateScroll(scrollToBottom)
            }
        }
    }


    useEffect(() => {
        settingMessage()
    }, [stomp])


    const MessageBox = useMemo(() => {
        if (loading) {
            return (
                <div style={{height: '300px'}}>
                    <ScrollableDiv ref={scrollRef}>
                        {messageList.map((message: Message, index: number) => (
                            <MessageBoxContainer key={message.chatUUID + index}>
                                {message.chatUUID === '엔드포인트' ?
                                    <hr data-content={"NEW"}></hr> :
                                    (message.nickName &&
                                        (index && messageList[index - 1].userEmail === message.userEmail ? (
                                            <MessageContainer2>
                                                <DateContainer2>{shortAHMFormat(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer2>
                                                <div>{message.message}</div>
                                            </MessageContainer2>
                                        ) : (
                                            <RowFlexBox style={{width: 'auto'}}>
                                                <ProfileContainer>{message.userEmail.slice(0, 1)}</ProfileContainer>
                                                <div>
                                                    <RowFlexBox style={{marginLeft: '10px'}}>
                                                        <NickNameContainer>{message.nickName}</NickNameContainer>
                                                        <DateContainer>{AHMFormatV2(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer>
                                                    </RowFlexBox>
                                                    <MessageContainer>{message.message}</MessageContainer>
                                                </div>
                                            </RowFlexBox>
                                        )))
                                }
                            </MessageBoxContainer>
                        ))}
                    </ScrollableDiv>
                </div>
            );
        }
        return null;
    }, [messageList, loading]);


    return (
        <div>
            {MessageBox}
            <div>
                <FORM_SENDMSG onSubmit={sendMsg}>
                    <SEND_INPUT type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setContent(e.target.value)
                    }} ref={chatRef}></SEND_INPUT>
                    <SEND_BUTTON>
                        <IMG_SIZE src={"/image/send.png"} alt={"?"}/>
                    </SEND_BUTTON>
                </FORM_SENDMSG>
            </div>
        </div>
    )
}
export default connect(mapStateToStompProps, mapDispatchToStompProps)(GroupMsgBox);