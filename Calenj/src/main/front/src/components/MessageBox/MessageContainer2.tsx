import {ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import {connect} from "react-redux";
import {
    DispatchStompProps,
    mapDispatchToStompProps,
    mapStateToStompProps,
    StompData
} from '../../store/module/StompReducer'
import {
    DateContainer,
    DateContainer2,
    MessageBoxContainer,
    MessageComponent_Container,
    MessageContainer,
    MessageContainer2,
    MessageContentContainer,
    MessageContentContainer2,
    MessageSend_Cotainer,
    MessageSend_Input,
    NickNameContainer,
    ProfileContainer,
    ScrollableDiv,
} from '../../style/ChatBoxStyle'
import {RowFlexBox} from '../../style/FormStyle'
import {endPointMap} from '../../store/module/StompMiddleware';
import {AHMFormatV2, changeDateForm, shortAHMFormat, throttleByAnimationFrame} from '../../shared/lib'
import {InfiniteData, useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {useIntersect} from "../../shared/model";
import {QUERY_CHATTING_KEY, QUERY_NEW_CAHT_KEY} from "../../entities/ReactQuery/model/queryModel";
import {useMessageScroll} from "./useMessageScroll";
import {useChatFetching} from "./useChatFetching";

interface groupDetailProps {
    target: string;
    param: string;
}

interface Message {
    chatUUID: string,
    sendDate: string,
    userEmail: string,
    nickName: string,
    messageType: string,
    message: string,
}


type groupMsgProps = groupDetailProps & DispatchStompProps & StompData
const GroupMsgBox: React.FC<groupMsgProps> = ({target, param, stomp, updateAppPosition, sendStompMsg}) => {
    const [content, setContent] = useState<string>('');
    const chatRef = useRef<HTMLInputElement>(null);// 채팅 input Ref
    const [newMsgLength,setNewMsgLength] = useState(0);
    const {scrollRef,setPrevScrollHeight,updateReloadScroll}=useMessageScroll(param)
    const [fetchData,receiveNewChat]=useChatFetching(param)

    const queryClient = useQueryClient();


    const {data, hasNextPage, isFetching, isLoading, fetchNextPage, refetch} = useInfiniteQuery({
        queryKey: [QUERY_CHATTING_KEY, param],
        queryFn: fetchData,
        getNextPageParam: (lastPage, allPages) => {
            //마지막 채팅문자열을 가져와 시작라인인지 체크
            if(lastPage[lastPage.length-1]){
                const containValue = lastPage[lastPage.length-1].chatUUID ==="시작라인";
                if(containValue){
                    return undefined;
                }
            }
            //받아온 갯수 리턴
            return allPages.reduce((prev, current) => prev.concat(current)).length + newMsgLength;

        }, //data의 값을 받아 처리할 수 있음
        initialPageParam:0,
        enabled: param === stomp.param,
        staleTime: Infinity,
        refetchInterval:false,
        retry:3,
    });

    const receiveNewMessage = useInfiniteQuery({
        queryKey: [QUERY_NEW_CAHT_KEY, param],
        queryFn: receiveNewChat,
        getNextPageParam: (_lastPage, _allPages, _lastPageParam, allPageParams) => {
            return allPageParams.length;
        }, //data의 값을 받아 처리할 수 있음
        initialPageParam: 0,
        enabled: param === stomp.param,
        refetchInterval:false,
        staleTime: Infinity,
    });
    //getNextPageParam : 다음 페이지가 있는지 체크, 현재 data를 인자로 받아 체크할 수 있으며 체크 값에 따라 hasNextPage가 정해짐

    //---------------------------------------------------------------------------------------------------------------옵저버를 활용한 스크롤 관리 > 관측 시 stomp RELOAD 요청

    const loadFile = useMemo(() => {
            return throttleByAnimationFrame(() => {
                if (!scrollRef.current) return
                const {scrollHeight} = scrollRef.current;
                setPrevScrollHeight(scrollHeight)
                fetchNextPage()
            })
    },[param])

    const topRef = useIntersect((entry, observer) => {
        if (hasNextPage && !isFetching) {
            observer.unobserve(entry.target);
            loadFile();
        }
    });

    //--------------------------------------------------------------------------------------------------------------- 새로 받은 메시지를 관리 SEDN 발생 시 infiniteQuery fetch
    //메시지를 받기위한 useEffect  => SEND감지 후 fetch()
    useEffect(() => {
        const {state} = stomp.receiveMessage;
        //해당 방의 채팅내용만 받아옴
        if (param !== stomp.receiveMessage.param) return
        //셋팅 이후 send를 받음 =>1.READ한 파일 세팅 이후 처리
        if ((!receiveNewMessage.isFetching) && state === "SEND") {
            receiveNewMessage.fetchNextPage();
        }
    }, [stomp.receiveMessage.chatUUID])



    //중복제거 함수
    const removeDuplicate = (messageList:Message[]):Message[] =>{
        const removeDuplicatesList = [...new Set(messageList.map((message)=> JSON.stringify(message)))]
            .map((message) => JSON.parse(message)) as Message[];
        if(messageList.length !== removeDuplicatesList.length){
            queryClient.setQueryData([QUERY_NEW_CAHT_KEY, param], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                pages: data?.pages.slice(0, removeDuplicatesList.length),
                pageParams: data?.pageParams.slice(0, removeDuplicatesList.length)
            }));
        }
        return removeDuplicatesList;
    }

    const newMessageList = useMemo(() => {
        if (receiveNewMessage.data) {
            //중복제거
            return removeDuplicate(receiveNewMessage.data.pages)
        }
        return [];
    }, [receiveNewMessage.data])

    const messageList = useMemo(() => {
        if (data) {
            return [...data.pages.reduce((prev, current) => prev.concat(current))]
        }
        return [];
    }, [data])

    useEffect(() => {
        if (stomp.receiveMessage.state === "RELOAD") {
            //처음 들어오자마자 reload하는 걸 방지 prevScrollHeight이 있어야 작동 =>topRef(observer로만 세팅가능)
            updateReloadScroll();
        }
    }, [messageList])


    useEffect(() => {
        if(receiveNewMessage.data){
            setNewMsgLength(receiveNewMessage.data?.pageParams.length-1)
        }
    }, [receiveNewMessage.data]);
    //--------------------------------------------------------------------------------------------------------------- 의존성을 활용한 페이지 랜더링 및 업데이트 관리


    useEffect(() => {
        updateAppPosition({target: target, param: param});
        if (endPointMap.get(param) > 0) {
            refetch().then(() => {
                //newMessage 비우기
                if (!receiveNewMessage.data) return
                queryClient.setQueryData([QUERY_NEW_CAHT_KEY, param], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                    pages: data?.pages.slice(0, 1),
                    pageParams: data?.pageParams.slice(0, 1)
                }));

            });
        }
    }, [param])

    useEffect(() => {
        console.log(isLoading)
    }, [isLoading]);

    //메시지 전송 함수
    const sendMsg = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (content === '') return;
        sendStompMsg({target: 'groupMsg', param: param, message: content, messageType: "message"})
        setContent('');
        if (chatRef.current) {
            chatRef.current.value = ''
        }
    }


        //날짜연산
    const dateOperation = (beforeSendDate : string, AfterSendDate : string) => {
        return ((+changeDateForm(AfterSendDate)) - (+changeDateForm(beforeSendDate)) < 300000)
    }

    const MessageBox = useMemo(() => {
        const connectList = [...[...messageList].reverse(),...newMessageList]
        if (!isLoading) {
            return (
                <ScrollableDiv ref={scrollRef} >
                    <div className="scrollTop" ref={topRef}></div>

                    {connectList.map((message: Message | null, index: number) => (
                        ((message !== null && message.chatUUID !== "시작라인") &&
                            <MessageBoxContainer className={message.chatUUID}
                                                 key={message.chatUUID + index}
                                                 $sameUser={(index !== 0 && connectList[index - 1]?.userEmail === message.userEmail) &&
                                                     dateOperation(connectList[index-1].sendDate, message.sendDate)}>
                                {message.chatUUID === '엔드포인트' ?

                                    <hr data-content={"NEW"}></hr> :
                                    ((index && connectList[index - 1]?.userEmail === message.userEmail) &&
                                    dateOperation(connectList[index-1].sendDate, message.sendDate) ? (
                                        <MessageContainer2>
                                            <DateContainer2>{shortAHMFormat(changeDateForm(message.sendDate.slice(0, 16)))}</DateContainer2>
                                            <MessageContentContainer2>{message.message}</MessageContentContainer2>
                                        </MessageContainer2>
                                    ) : (
                                        <RowFlexBox style={{width: 'auto'}}>
                                            <ProfileContainer
                                                $userEmail={message.userEmail}></ProfileContainer>
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
    }, [messageList, newMessageList]);


    return (
        <MessageComponent_Container>
            {MessageBox}
            <MessageSend_Cotainer onSubmit={sendMsg}>
                <MessageSend_Input type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setContent(e.target.value)
                }} ref={chatRef}>
                </MessageSend_Input>
            </MessageSend_Cotainer>
        </MessageComponent_Container>
    )
}
export default connect(mapStateToStompProps, mapDispatchToStompProps)(GroupMsgBox);