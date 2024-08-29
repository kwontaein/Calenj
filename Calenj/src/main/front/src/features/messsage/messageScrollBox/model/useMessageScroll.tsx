import {Message, QUERY_NEW_CHAT_KEY, useChatFileInfinite} from "../../../../entities/reactQuery";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {EndPointParamMap, groupEndPointMap, requestFile, RootState, scrollPointMap} from "../../../../entities/redux";
import {debounce, throttleByAnimationFrame} from "../../../../shared/lib";
import {friendEndPointMap} from "../../../../entities/redux/model/module/StompMiddleware";
import {v4 as uuidv4} from "uuid";

interface ReturnScroll {
    scrollRef: React.MutableRefObject<HTMLDivElement | null>,
    messageRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null; }>,
    readEndPoint: string,
}

export const useMessageScroll = (connectMessages: Message[], chatUUID: string, position: string): ReturnScroll => {
    const dispatch = useDispatch();
    const stomp = useSelector((state: RootState) => state.stomp)
    const {
        screenHeightSize,
        mode,
        clickState
    } = useSelector((state: RootState) => state.subNavigation.group_subNavState)
    const {inputSize} = useSelector((state: RootState) => state.messageInputSize);
    const {param, target} = useSelector((state: RootState) => state.stomp)
    const beforeInputSize = useRef(inputSize);
    const userId = localStorage.getItem("userId");
    //높이 관련
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const isRender = useRef<boolean>();
    const [isReceive, setIsReceive] = useState<boolean>(false);
    const beforeScrollTop = useRef<number>(); //이전 스크롤의 위치를 기억
    const [readEndPoint, setReadEndPoint] = useState<string>('')

    useEffect(() => {
        // 포커스 이벤트 핸들러
        const handleFocus = () => {
            if((target ==="group" && groupEndPointMap.get(param) !== 0) || (target==="main" && friendEndPointMap.get(param) !== 0)) return
            if(scrollRef.current){
                const {scrollHeight, clientHeight, scrollTop} = scrollRef.current;
                if (scrollHeight === clientHeight) {
                    debouncing_EndPoint();
                }else if(scrollTop + clientHeight === scrollHeight){
                    debouncing_EndPoint();
                }
            }
        };
        // 포커스 이벤트 등록
        window.addEventListener('focus', handleFocus);

        // 클린업 함수: 컴포넌트가 언마운트되거나 리렌더링 될 때 리스너 제거
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [connectMessages]); // 메시지가 온


    useEffect(() => {
        if (!scrollRef.current) return
        const {scrollTop, scrollHeight, clientHeight} = scrollRef.current
        if (clientHeight + scrollTop === scrollHeight) { //맨아래에 위치해 있으면 위치조정 필요 X
            beforeInputSize.current = inputSize;//return 전 input 사이즈 저장
            return
        }
        scrollRef.current.scrollTop -= (beforeInputSize.current - inputSize)
        beforeInputSize.current = inputSize;
        beforeScrollTop.current = scrollRef.current?.scrollTop;

    }, [inputSize]);


    useEffect(() => {
        return () => {
            if (beforeScrollTop.current === undefined) return
            //스크롤이 존재했는지 체크
            scrollPointMap.set(param, beforeScrollTop.current);
        }
    }, [param]);


    useEffect(() => {
        if (!scrollRef.current || connectMessages.length === 0 || mode !== "column") return;
        const {scrollTop, scrollHeight, clientHeight} = scrollRef.current
        if (scrollTop + clientHeight === scrollHeight) return
        if (clickState === '' && scrollHeight < scrollTop + screenHeightSize) {
            scrollRef.current.scrollTop -= Math.round(screenHeightSize)
        } else {
            if(clickState === '') {
                scrollRef.current.scrollTop -= Math.round(screenHeightSize);
            }else{
                scrollRef.current.scrollTop += Math.round(screenHeightSize);
            }
        }
    }, [clickState]);

    // 스크롤 => chatUUID로 div를 조회하고 높이설정 => 메시지 fetchMoreMessages 이후 세팅
    const scrollToMessage = useCallback((chatUUID: string, alignToBottom: boolean = false) => {
        const messageDiv = messageRefs.current[chatUUID];
        if (messageDiv && scrollRef.current) {
            const subScreenHeight = (clickState !== '' && mode === 'column') ? screenHeightSize : 0
            if (alignToBottom) { //아래로
                scrollRef.current.scrollTop = messageDiv.offsetTop - scrollRef.current.clientHeight + messageDiv.clientHeight - subScreenHeight - 40;
            } else { //위로
                scrollRef.current.scrollTop = messageDiv.offsetTop - 90 - subScreenHeight;
            }
            scrollPointMap.set(param, scrollRef.current.scrollTop)

        }
    }, [clickState, mode, param, screenHeightSize]);


    const [showDown, setShowDown] = useState<boolean>(true);

    //컴포넌트 랜더링과 상관없이 인스턴스를 유지하게 memo
    const debouncing_EndPoint = useMemo(() => {
        return debounce(() => {
            let currentTarget = target ==='main' ? 'friendMsg' :'groupMsg'
            target ==='main' ? friendEndPointMap.set(param,0) : groupEndPointMap.set(param, 0)
            const UUid = uuidv4();
            setReadEndPoint(UUid)
            EndPointParamMap.set(param, "NONE")
            dispatch(requestFile({target: currentTarget, param: param, requestFile: "ENDPOINT"}));
        }, 2000);
    }, [param]);


    //스크롤 => 맨 밑으로 이동
    const scrollToBottom = () => {
        if(document.hasFocus()){
            debouncing_EndPoint()
        }
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                beforeScrollTop.current = scrollRef.current.scrollTop
            }
        }, 5)
    };


    const updateScroll = () => {
        if (!scrollRef.current) return
        const {scrollTop, scrollHeight, clientHeight} = scrollRef.current;
        beforeScrollTop.current = scrollTop - (clickState !== "" && mode === "column" ? Math.round(screenHeightSize) : 0);
        
        if ((target ==='group' && groupEndPointMap.get(param) === 0 )|| (target ==='main' && friendEndPointMap.get(param) ===0)) return;
        //스크롤에 따른 표시
        if (scrollHeight > clientHeight && scrollTop + clientHeight === scrollHeight) {
            console.log("맨아래로")
            scrollToBottom();
        }
    }

    const updateScroll_throttling = useMemo(() => {
        return throttleByAnimationFrame(() => {
            updateScroll()
        });
    }, [param]);


    const addScrollEvent = () => {
        //isLoading이 falset가 돼야 스크롤 scrollRef가 잡혀서 셋팅됨
        //로딩된 이후엔 스크롤을 안 내려야함
        if (!scrollRef.current || connectMessages.length === 0) return
        scrollRef.current.addEventListener('scroll', updateScroll_throttling);
        //메시지가 없으면 스크롤 세팅필요 X
        if (scrollPointMap.get(param) === undefined) {
            if ((target ==="group" && groupEndPointMap.get(param) === 0)|| (target==="main" && friendEndPointMap.get(param) === 0)) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                scrollPointMap.set(param, scrollRef.current.scrollHeight)
            } else {
                const hasEndPoint = connectMessages.some((message: Message) => message.chatUUID === "엔드포인트");
                if (hasEndPoint) {
                    scrollToMessage("엔드포인트");
                } else {
                    scrollToBottom();
                }
            }
        } else {
            scrollRef.current.scrollTop = (scrollPointMap.get(param) + (clickState !== "" && mode === "column" ? Math.round(screenHeightSize) : 0)); //반올림돼서 올라가는 것으로 추측 +1 로 오차 줄이기
        }

        const {scrollHeight, clientHeight} = scrollRef.current;
        //메시지가 와있는데 스크롤이 없다면 앤드포인트 갱신
        if ((target ==="group" && groupEndPointMap.get(param) !== 0)|| (target==="main" && friendEndPointMap.get(param) !== 0) && scrollHeight === clientHeight) {
            debouncing_EndPoint();
        }

    }


    useEffect(() => {
        const {state} = stomp.receiveMessage
        const messageParam = stomp.receiveMessage.param
        if (param !== messageParam || state !== 'SEND' || connectMessages.length === 0 || !scrollRef.current) return
        setIsReceive(true);
        const {scrollTop, scrollHeight, clientHeight} = scrollRef.current;
        const sendUser = stomp.receiveMessage.userId

        if (userId === sendUser) {
            return
        }
        if (scrollHeight > clientHeight && scrollTop + clientHeight === scrollHeight) {
            scrollToBottom();
        } else {
            setShowDown(true);
        }
    }, [stomp.receiveMessage.receivedUUID])



    //메세지 추가 로딩
    useEffect(() => {
        //스크롤 조정
        if (connectMessages.length === 0) {
            isRender.current = false;
            return
        }

        const sendUser = stomp.receiveMessage.userId
        const state = stomp.receiveMessage.state

        if (userId === sendUser && state === 'SEND' && isReceive) {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener('scroll', updateScroll_throttling);
            }
            scrollToBottom();
            setIsReceive(false);
        } else {
            addScrollEvent();
        }

        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener('scroll', updateScroll_throttling);
            }
        };
    }, [connectMessages]);




    useEffect(() => {
        if (chatUUID === '') return
        scrollToMessage(chatUUID, position === "newer");
    }, [connectMessages, chatUUID])

    return {scrollRef, messageRefs,readEndPoint};
}