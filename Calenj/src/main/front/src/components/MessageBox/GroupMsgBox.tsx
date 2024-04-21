import {ChangeEvent, useEffect, useState, useRef, useCallback, useMemo,useId} from "react";
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
import {changeDateForm, AHMFormatV2, shortAHMFormat,debounce} from '../../stateFunc/actionFun'
import { useInfiniteQuery } from '@tanstack/react-query';

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
    const [loading, setLoading] = useState<boolean>(false); //첫 파일로드 완료 시 true
    const [messageList, setMessageList] = useState<Message[]>([]);
    const [content, setContent] = useState<string>('');
    const chatRef = useRef<HTMLInputElement>(null);// 채팅 input Ref
    const [beforeUUID, setBeforUUID] = useState<string>('');
    const scrollTimerRef = useRef<NodeJS.Timeout | undefined>(); //채팅스크롤 디바운싱 Ref
    const scrollRef = useRef<HTMLDivElement | null>(null); //채팅스크롤 Ref
    const messageLength = useRef<number>(0);
    const prevScrollHeight = useRef<number>();//메시지 스크롤 증가 전 사이즈
    const [loadAble,setLoadAble] = useState<boolean>(false);

 
    /**param이 바뀌면 다시 세팅*/
    useEffect(()=>{
        setLoading(false);
        setMessageList([]);
        scrollRef.current?.removeEventListener('scroll',handleScroll);
    },[param])

    //메시지 리스트의 길이를 갱신 이후 scroll셋팅
    useEffect(() => {
        messageLength.current = messageList.length;
        // handleScroll();
        if(stomp.receiveMessage.state==="RELOAD"){
            if(scrollRef.current && prevScrollHeight.current){
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight-prevScrollHeight.current;
                setLoadAble(true)
                console.log('로드가능')
            }
        }
    }, [messageList])
    

    //처음 들어갔을 때 스크롤에따른 상태체크
    useEffect(() => {
        if(scrollRef.current){
            scrollRef.current.addEventListener('scroll',handleScroll);
            if(endPointMap.get(param)===0) {
                scrollRef.current.scrollTop=scrollRef.current.scrollHeight;

            }else{
                ///endPoint를 찾아서 해당 위치로 스크롤 셋팅
                const scrollDiv = scrollRef.current;
                const targetElement = scrollDiv.querySelector('.엔드포인트')
                if (targetElement) {
                    const targetElementRect = targetElement.getBoundingClientRect();
                    scrollRef.current.scrollTop= targetElementRect.bottom-300;
                  }
            }
        }
        setLoadAble(true)
        return ()=>{
            if(scrollRef.current){
                scrollRef.current.removeEventListener('scroll',handleScroll);
            }
        }
    }, [loading])


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
            const {scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            //현재위치랑 스크롤의 맨아래 위치에 있으면 (ScrollMinHeight = 현재 스크롤 div의 최소크기)
            if (scrollTop + clientHeight===scrollHeight && endPointMap.get(param) !== 0) {
                endPointMap.set(param,0)
                scrollToBottom();
                updateEndpoint();
                return;
            }
            //최상단에 있을경우 리로드
            if (scrollTop <50 && messageLength.current && loadAble) {
                prevScrollHeight.current = scrollHeight;
                reloadTopMessage(messageLength.current)
            }
        }
    }
    const scrollToBottom = () => {
        setTimeout(()=>{
            if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
            }
        },50) 
    };

    
 
    const updateEndpoint = () => {
        const debouncedRequest = debounce(() => {
            requestFile({target: 'groupMsg', param: param, requestFile: "ENDPOINT", nowLine: 0});
            console.log('앤드포인트 갱신');
        }, 1000);
        debouncedRequest();
    }


    const reloadTopMessage = (nowLine: number) => {
        requestFile({target: 'groupMsg', param: param, requestFile: "RELOAD", nowLine: nowLine})
    }


 
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


    const fetchMessage =()=>{
        if (stomp.receiveMessage.param !== param || stomp.receiveMessage.message === null) {
            return
        }
        const {state}= stomp.receiveMessage
        //로딩까지 딱 1번만 실행하도록
        if (!loading) {
            if (state === "READ") {
                setFileLog();
                setLoading(true);
            }
        } else {
            if (state === "RELOAD" &&loadAble) {
                setFileLog();
                setLoadAble(false);
            } else if (state === "SEND" && beforeUUID !== stomp.receiveMessage.message) {  //재저장을 막기위해 이전 chatUUID를 저장하고 비교함
                const {chatUUID,sendDate,userEmail,nickName,message} = stomp.receiveMessage
                
                const loadMsg: Message = {
                    chatUUID: chatUUID,
                    sendDate: sendDate,
                    userEmail: userEmail,
                    nickName: nickName,
                    message: message as string
                }
                setBeforUUID(stomp.receiveMessage.message as string)
                setMessageList((prev) => {
                    return [...prev, loadMsg]
                })
                updateScroll()
            }
        }
    }
    useEffect(()=>{
        fetchMessage()
    },[stomp])


    //메시지 전송 함수
    const sendMsg = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (content === '') return;
        sendStompMsg({target: 'groupMsg', param: param, message: content})
        setContent('');
        if (chatRef.current) {
            chatRef.current.value = ''
        }
        scrollToBottom();
        updateEndpoint();
    }




    const MessageBox = useMemo(() => {
        if (loading) {
            return (
                    <ScrollableDiv id="ScrollContainerDiv" ref={scrollRef}>
                        <div className="scrollTop"></div>
                        {messageList.map((message: Message, index: number) => (
                            <MessageBoxContainer className={message.chatUUID}
                                                key={message.chatUUID + index} 
                                                $sameUser={index!==0 && messageList[index - 1].userEmail === message.userEmail
                                                }>
                                {message.chatUUID === '엔드포인트' ?
            
                                    <hr data-content={"NEW"}></hr> :
                                        (index && messageList[index - 1].userEmail === message.userEmail ? (
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
                            </MessageBoxContainer>
                        ))}
                        <div className="scrollBottom"style={{marginTop:'10px'}}></div>
                    </ScrollableDiv>
            );
        }
        return null;
    }, [messageList]);


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