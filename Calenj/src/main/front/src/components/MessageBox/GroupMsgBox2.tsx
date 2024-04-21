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
import {changeDateForm, AHMFormatV2, shortAHMFormat,throttleByAnimationFrame,throttle,debounce} from '../../stateFunc/actionFun'
import { array, date } from "yup";
import { useInfiniteQuery} from '@tanstack/react-query';
import { prependListener } from "process";


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

interface receiveMsg{
    recievedmessage:Message
}

type groupMsgProps = groupDetailProps & DispatchStompProps & StompData
const GroupMsgBox: React.FC<groupMsgProps> = ({param, stomp, sendStompMsg, requestFile}) => {
    const [content, setContent] = useState<string>('');
    const chatRef = useRef<HTMLInputElement>(null);// 채팅 input Ref
    const scrollTimerRef = useRef<NodeJS.Timeout | undefined>(); //채팅스크롤 디바운싱 Ref
    const scrollRef = useRef<HTMLDivElement | null>(null); //채팅스크롤 Ref
    const messageLength = useRef<number>(0);
    const prevScrollHeight = useRef<number>();//메시지 스크롤 증가 전 사이즈


 
    const CHATTING_QUERY_KEY:string = "CHATTING_QUERY_KEY";

type IntersectHandler = (
    entry: IntersectionObserverEntry, // Intersection Observer API에서 교차 상태의 변경을 나타내는 객체
    observer: IntersectionObserver // 상태를 관측하는 observer, 대상요소를 지정하고 교차상태를 감지
    ) => void
    

    
   const useIntersect = (
    onIntersect: IntersectHandler, //배열과 관측대상을 담음
    options?: IntersectionObserverInit
   ) => {
    const ref = useRef<HTMLDivElement>(null)

    //교차 상태가 변경된 요소 중에서 교차 상태에 있는 요소에 대해 지정된 콜백 함수를 실행하는 역할을 합니다.
    const callback = useCallback(
        //entries : 관측할 객체가 포함된 배열
        //observer: 관측대상
      (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach((entry) => {
            //교차상태가 됐는지 확인 = > 교차상태일 시 지정 onInteresct콜백함수 호출
          if (entry.isIntersecting) onIntersect(entry, observer)
        })
      },
      [onIntersect]
    )
    
    useEffect(() => {
      if (!ref.current) return
      //관측할 타겟 지정
      const observer = new IntersectionObserver(callback, options)
      observer.observe(ref.current) //관측대상 지정
      return () => observer.disconnect()
    }, [ref, options, callback])
    
    return ref
   }

   const requestChatFile =()=>{
    // console.log(messageLength.current);
    if(!messageLength.current){
        requestFile({
            target: 'groupMsg',
            param: param,
            requestFile: "READ",
            nowLine: endPointMap.get(param)
        });
    }else{
        requestFile({
            target: 'groupMsg',
            param: param,
            requestFile: "RELOAD",
            nowLine: messageLength.current
        });
    }
   }


   //axios를 대신해서 파일로드를 도움
   const receiveChatFile=() =>{
        const getFileData = ()=>{
            const {message} = stomp.receiveMessage
            if(message){
                return [...message] 
            }
            return [];
        }
        if(messageLength.current && stomp.receiveMessage.state==='READ') return [];
        const messageEntries =Array.from(getFileData(), (message: string) => {
            const messageData = message.split("$",5)
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

   const { data, hasNextPage, isFetching, isLoading ,fetchNextPage, isError } = useInfiniteQuery({
        queryKey: [CHATTING_QUERY_KEY, param],
        queryFn: fetchData,
        getNextPageParam: (messageList) => {   
        const containsValue =messageList.some((item)=>item?.chatUUID!=="시작라인")
        console.log(containsValue)
         return containsValue;
    }, //data의 값을 받아 처리할 수 있음
        initialPageParam: null,
        enabled: stomp.receiveMessage.message!==null
   });
    //getNextPageParam : 다음 페이지가 있는지 체크, 현재 data를 인자로 받아 체크할 수 있으며 체크 값에 따라 hasNextPage가 정해짐
    
    const topRef = useIntersect(async (entry, observer) => {
        observer.unobserve(entry.target)
        if (hasNextPage && !isFetching) {
            if(scrollRef.current){
                const {scrollHeight} = scrollRef.current;
                prevScrollHeight.current = scrollHeight;
                requestChatFile()
                // requestChatFile()
                const refetchFile =throttleByAnimationFrame(()=>{
                    fetchNextPage()
                })
                refetchFile();
            }
        }
    })

    useEffect(()=>{
        requestChatFile();
        scrollRef.current?.removeEventListener('scroll',handleScroll);
    },[param])

    const messageList = useMemo(()=>{
        if(data){
            return data.pages.reduce((prev,current)=>prev.concat(current)).reverse()
        }
        return [];
    },[data])

    useEffect(()=>{
        messageLength.current=messageList.length;//길이 세팅
        console.log(messageLength.current)
        if(stomp.receiveMessage.state==="RELOAD"){
            if(scrollRef.current && prevScrollHeight.current){
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight-prevScrollHeight.current;
            }
        }
    },[messageList])

  

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
        return ()=>{
            if(scrollRef.current){
                scrollRef.current.removeEventListener('scroll',handleScroll);
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
            const {scrollTop, scrollHeight, clientHeight } = scrollRef.current;
            //현재위치랑 스크롤의 맨아래 위치에 있으면 (ScrollMinHeight = 현재 스크롤 div의 최소크기)
            if (scrollTop + clientHeight===scrollHeight && endPointMap.get(param) !== 0) {
                endPointMap.set(param,0)
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
        setTimeout(()=>{
            if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
            }
        },50) 
    };


    const MessageBox = useMemo(() => {
        if (!isLoading) {
            return (
                    <ScrollableDiv id="ScrollContainerDiv" ref={scrollRef}>
                        <div className="scrollTop" ref ={topRef}></div>
                    
                        {messageList!==undefined&&
                        messageList.map((message: Message|undefined, index: number) => (
                            message!==undefined&&
                            <MessageBoxContainer className={message?.chatUUID}
                                                key={message.chatUUID + index} 
                                                $sameUser={index!==0 && messageList[index - 1]?.userEmail === message.userEmail
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