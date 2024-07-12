import {useEffect, useMemo, useRef, useState} from "react";
import {debounce, throttleByAnimationFrame} from "../../../../shared/lib";
import {endPointMap, scrollPointMap} from "../../../../entities/redux";
import {requestFile} from "../../../../entities/redux";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from '../../../../entities/redux'
import {Message} from "../../../../entities/reactQuery";


export const useMessageScroll = (param:string, messageList:Message[],) : React.MutableRefObject<HTMLDivElement|null> =>{
    const scrollRef = useRef<HTMLDivElement | null>(null); //채팅스크롤 Ref
    const [prevScrollHeight , setPrevScrollHeight] = useState<number|null>(null);//RELOAD 시 이전 높이를 저장하는데 사용
    const beforeScrollTop = useRef<number>(); //이전 스크롤의 위치를 기억
    const [socketEvent,setSocketEvent] = useState<boolean>(false); //내가 socketEvent를 발생시킨 여부 (식별하기 위해 사용)
    const dispatch = useDispatch();
    const stomp = useSelector((state:RootState)=>state.stomp); // 리덕스 상태 구독
    const {screenHeightSize,mode, clickState} = useSelector((state:RootState)=>state.subNavigation.group_subNavState)
    const {inputSize} = useSelector((state:RootState) => state.messageInputSize);
    const beforeInputSize = useRef(inputSize);

    const updateScroll_throttling = useMemo(() => {
        if(socketEvent) setSocketEvent(false)
        return throttleByAnimationFrame(() => {
            updateScroll()
        });
    }, [param]);
    
    useEffect(() => {
        addScrollEvent()
        return () => {
            if(beforeScrollTop.current===undefined) return
            //스크롤이 존재했는지 체크
            scrollPointMap.set(param,beforeScrollTop.current);
        }
    }, [param,messageList])

    useEffect(() => {
      const {state} = stomp.receiveMessage
        if(state==="RELOAD"){
            addScrollEvent()
        }
    }, [stomp.receiveMessage]);


    useEffect(() => {
        if(!scrollRef.current || !beforeScrollTop.current) return
        const {scrollTop, scrollHeight, clientHeight} = scrollRef.current
        if(clientHeight + scrollTop===scrollHeight) { //맨아래에 위치해 있으면 위치조정 필요 X
            beforeInputSize.current = inputSize;//return 전 input 사이즈 저장
            return
        };
        scrollRef.current.scrollTop -=(beforeInputSize.current- inputSize)
        beforeScrollTop.current = scrollRef.current.scrollTop
        beforeInputSize.current = inputSize;

    }, [inputSize]);




    //컴포넌트 랜더링과 상관없이 인스턴스를 유지하게 memo
    const debouncing_EndPoint = useMemo(() => {
        return debounce(() => {
            endPointMap.set(param, 0)
            dispatch(requestFile({ target: 'groupMsg', param: param, requestFile: "ENDPOINT", nowLine: 0 }));
            console.log('엔드포인트 갱신');
        }, 1000);
    }, [param]);

    const updateEndpoint = () => {
        debouncing_EndPoint();
    }

    const scrollToBottom = () => {
        debouncing_EndPoint()
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                beforeScrollTop.current = scrollRef.current.scrollTop
            }
        }, 50)
    };


    const addScrollEvent=()=>{
        //isLoading이 falset가 돼야 스크롤 scrollRef가 잡혀서 셋팅됨
        //로딩된 이후엔 스크롤을 안 내려야함
        if (!scrollRef.current) return
        scrollRef.current.addEventListener('scroll', updateScroll_throttling);

        //infiniteQuery 첫세팅 시에만 체크됨 => scrollPointMap이 등록되지 않은상황
        if(scrollPointMap.get(param) === undefined){
            if (endPointMap.get(param) === 0){
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                scrollPointMap.set(param, scrollRef.current.scrollHeight)
            }else{
                const scrollDiv = scrollRef.current;
                const targetElement = scrollDiv.querySelector('.엔드포인트')
                if (targetElement) {
                    const {bottom} = targetElement.getBoundingClientRect();
                    scrollRef.current.scrollTop = bottom - 300;
                    scrollPointMap.set(param, bottom - 300)
                }
            }
        }
        //저장된 스크롤 포인트가 있으면 세팅
        else {
            scrollRef.current.scrollTop = (scrollPointMap.get(param) + (clickState!=="" && mode==="column"? Math.round(screenHeightSize) : 0)); //반올림돼서 올라가는 것으로 추측 +1 로 오차 줄이기
        }

        const {scrollHeight, clientHeight} = scrollRef.current;
        //메시지가 와있는데 스크롤이 없다면 앤드포인트 갱신
        if(endPointMap.get(param) !== 0 && scrollHeight === clientHeight){
            updateEndpoint();
        }
    }


    //stomp의 chatUUID를 감지하여 소켓 이벤트 활성화 => updateScroll이후 다시 비활성화 => 불필요한 스크롤 업데이트 방지
    useEffect(() => {
        setSocketEvent(true);
        const {state} = stomp.receiveMessage;
        if (param !== stomp.receiveMessage.param || state!=="SEND") return
        updateScroll()
    }, [stomp.receiveMessage.chatUUID]);

    //스크롤 상태에 따른 endPoint업데이트
    const updateScroll = () => {
        if (!scrollRef.current) return
        const {scrollTop, scrollHeight, clientHeight} = scrollRef.current;
        const {userId} = stomp.receiveMessage

        beforeScrollTop.current = scrollTop - (clickState!=="" && mode==="column"? Math.round(screenHeightSize) : 0);

        if(userId === localStorage.getItem('userId') && socketEvent){
            scrollToBottom();
        }
        if(endPointMap.get(param) ===0) return;

        //스크롤이 존재하지 않으면
        if(scrollHeight === clientHeight){
            updateEndpoint();
        }else if (scrollHeight > clientHeight && scrollTop + clientHeight === scrollHeight){
            scrollToBottom();
        }
    }

    useEffect(() => {
        const {requestFile} = stomp
        if(!scrollRef.current || requestFile !=="RELOAD") return
        setPrevScrollHeight(scrollRef.current.scrollHeight)
    }, [stomp.nowLine]);



    useEffect(()=>{
        const {state} =stomp.receiveMessage
        if(state!=="RELOAD") return
        // //저장한 이전높이인 prev만큼 빼줌
        if(!scrollRef.current || !prevScrollHeight) return;
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight - prevScrollHeight
            setPrevScrollHeight(null)
    },[messageList])
    //원하는 타이밍에 정확히 세팅하려면 메시지가 세팅이 완료된 후 함수를 호출해야함


    return scrollRef
}