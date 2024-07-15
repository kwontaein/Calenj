
import {Message} from "../../../../entities/reactQuery";
import {MutableRefObject, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {endPointMap, requestFile, RootState, scrollPointMap} from "../../../../entities/redux";
import axios from "axios";
import {debounce, throttleByAnimationFrame} from "../../../../shared/lib";
import {bool} from "yup";

interface ReturnScroll{
    containerRef:React.MutableRefObject<HTMLDivElement | null>,
    messageRefs : React.MutableRefObject<{[key: string]: HTMLDivElement | null; }>,
    scrollToMessage: (chatUUID: string, alignToBottom?: boolean) => void,
}

export const useMessageScroll = (connectMessages:Message[], firstPage:boolean, lastPage:boolean) :ReturnScroll =>{

    const dispatch = useDispatch();
    const stomp = useSelector((state:RootState)=>state.stomp)
    const {screenHeightSize,mode, clickState} = useSelector((state:RootState)=>state.subNavigation.group_subNavState)
    const {inputSize} = useSelector((state:RootState) => state.messageInputSize);
    const stompParam = useSelector((state: RootState) => state.stomp.param)
    const beforeInputSize = useRef(inputSize);
    const userId = localStorage.getItem("userId");
    //높이 관련
    const containerRef = useRef<HTMLDivElement | null>(null);
    const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const isRender = useRef<boolean>();
    
    useEffect(() => {
        if(!containerRef.current) return
        const {scrollTop, scrollHeight, clientHeight} = containerRef.current
        if(clientHeight + scrollTop===scrollHeight) { //맨아래에 위치해 있으면 위치조정 필요 X
            beforeInputSize.current = inputSize;//return 전 input 사이즈 저장
            return
        }
        containerRef.current.scrollTop -=(beforeInputSize.current- inputSize)
        beforeInputSize.current = inputSize;

    }, [inputSize]);
    //맨 마지막 페이지인지

    //아래로 내려가기 버튼
    const [showDown, setShowDown] = useState<boolean>(true);
    // //위로 내용 불러오기
    // const [hasMoreTop, setHasMoreTop] = useState(true);
    // //아래로 내용 불러오기
    // const [hasMoreBottom, setHasMoreBottom] = useState(true);



    //컴포넌트 랜더링과 상관없이 인스턴스를 유지하게 memo
    const debouncing_EndPoint = useMemo(() => {
        return debounce(() => {
            endPointMap.set(stompParam, 0)
            dispatch(requestFile({ target: 'groupMsg', param: stompParam, requestFile: "ENDPOINT", nowLine: 0 }));
        }, 1000);
    }, [stompParam]);

    const updateEndpoint = () => {
        debouncing_EndPoint();
    }


    //높이 관련(엔드포인트 찍기 위한 div)
    //높이 관련(메세지 uuid 위치로 이동)





    // 스크롤 => chatUUID로 div를 조회하고 높이설정 => 메시지 fetchMoreMessages 이후 세팅
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


    //스크롤 => 맨 밑으로 이동
    const scrollToBottom = useCallback(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
            updateEndpoint()
        }
    }, []);



    useEffect(() => {
        if(clickState==='' || !containerRef.current) return;
        containerRef.current.scrollTop += (clickState!=="" && mode==="column"? Math.round(screenHeightSize) : 0);
    }, [clickState]);



    const updateScroll = () => {
        if (!containerRef.current) return
        const {scrollTop, scrollHeight, clientHeight} = containerRef.current;
        const sendUser = stomp.receiveMessage.userId
        if(endPointMap.get(stompParam) ===0) return;

        //스크롤에 따른 표시
        if (scrollHeight > clientHeight && scrollTop + clientHeight === scrollHeight){
            scrollToBottom();
        }
        if(userId ===sendUser){
            scrollToBottom();
        }
    }




    const updateScroll_throttling = useMemo(() => {
        return throttleByAnimationFrame(() => {
            updateScroll()
        });
    }, [stompParam]);


    const addScrollEvent=()=>{
        //isLoading이 falset가 돼야 스크롤 scrollRef가 잡혀서 셋팅됨
        //로딩된 이후엔 스크롤을 안 내려야함
        if (!containerRef.current || connectMessages.length===0) return
        containerRef.current.addEventListener('scroll', updateScroll_throttling);
        //메시지가 없으면 스크롤 세팅필요 X

        if(!isRender.current){ //첫 랜더링에만 적용
            const hasEndPoint = connectMessages.some((message: Message) => message.chatUUID === "엔드포인트");
            if (hasEndPoint) {
                scrollToMessage("엔드포인트");
            } else {
                scrollToBottom();
            }
            isRender.current =true;
        }
        
    }





    useEffect(()=>{
        const {param, state} = stomp.receiveMessage
        if(stompParam !== param || state!=='SEND' || connectMessages.length === 0 || !containerRef.current) return
        const {scrollTop, scrollHeight, clientHeight} = containerRef.current;

        if (scrollHeight > clientHeight && scrollTop + clientHeight === scrollHeight) {
            scrollToBottom();
        } else {
            setShowDown(true);
        }
    },[stomp.receiveMessage.receivedUUID])


    //데이터 => 아래로 버튼 클릭시 상호작용
    const goBottom = async () => {
        if (lastPage) { //마지막 페이지이고, 80개가 넘지 않으면 다시 불러올 필요 없음.
            scrollToBottom();
        } else {
            // getInitialMessages();
        }
    }

    //메세지 추가 로딩
    useEffect(() => {
        //스크롤 조정
        if(connectMessages.length===0){
            isRender.current = false;
        }
        addScrollEvent()
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll',  updateScroll_throttling);
            }
        };
    }, [connectMessages]);


    return {containerRef, messageRefs, scrollToMessage};
}