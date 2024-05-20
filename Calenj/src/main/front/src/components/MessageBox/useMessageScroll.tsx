import {useEffect, useMemo, useRef, useState} from "react";
import {debounce} from "../../shared/lib";
import {endPointMap, scrollPointMap} from "../../store/module/StompMiddleware";
import stompReducer, {requestFile} from "../../store/module/StompReducer";
import {useDispatch, useSelector} from "react-redux";
import {useIntersect} from "../../shared/model";
import {RootState} from '../../store/store'
interface MessageScroll{
    scrollRef:React.MutableRefObject<HTMLDivElement|null>,
    updateReloadScroll:()=>void,
    setPrevScrollHeight: React.Dispatch<React.SetStateAction<number | null>>
}

export const useMessageScroll = (param:string, newMessageLength:number) : MessageScroll =>{
    const scrollRef = useRef<HTMLDivElement | null>(null); //채팅스크롤 Ref
    const [prevScrollHeight , setPrevScrollHeight] = useState<number|null>(null);
    const [socketEvent,setSocketEvent] = useState<boolean>(false);

    const beforeScrollTop = useRef<number>(); //이전 스크롤의 위치를 기억
    const beforeScrollHeight = useRef<number>(); //이전 스크롤의 높이를 기억

    const dispatch = useDispatch();
    const stomp = useSelector((state:RootState)=>state.stomp); // 리덕스 상태 구독

    useEffect(() => {
        addScrollEvent()
        return () => {
            if (scrollRef.current) {
                scrollRef.current.removeEventListener('scroll', handleScroll);
            }
            if(!beforeScrollHeight.current) return
            //스크롤이 존재했는지 체크
            scrollPointMap.set(param,beforeScrollTop.current);
        }
    }, [param])



    const updateScroll_debouncing = useMemo(() => {
        return debounce(() => {
            updateScroll()
        }, 50);
    }, [param]);

    const handleScroll = () => {
        if(socketEvent) setSocketEvent(false)
        updateScroll_debouncing();
    };

    //컴포넌트 랜더링과 상관없이 인스턴스를 유지하게 memo
    const debouncedEndPoint = useMemo(() => {
        return debounce(() => {
            endPointMap.set(param, 0)
            dispatch(requestFile({ target: 'groupMsg', param: param, requestFile: "ENDPOINT", nowLine: 0 }));
            console.log('엔드포인트 갱신');
        }, 1000);
    }, [param]);

    const updateEndpoint = () => {
        debouncedEndPoint();
    }

    const scrollToBottom = () => {
        debouncedEndPoint()
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
            scrollRef.current.addEventListener('scroll', handleScroll);

        //infiniteQuery 첫세팅 시에만 체크됨 => scrollPointMap이 등록되지 않은상황
        if (endPointMap.get(param) === 0 && newMessageLength===0 && (!scrollPointMap.get(param))) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            scrollPointMap.set(param, scrollRef.current.scrollHeight)

        } else if(endPointMap.get(param)>0) {
            //들어갔는데 스크롤이 없고 메시지가 있으면 바로 읽은 거로 처리
            const {scrollHeight, clientHeight} = scrollRef.current;
            if(scrollHeight === clientHeight){
                updateEndpoint();
            }
            ///endPoint를 찾아서 해당 위치로 스크롤 셋팅
            const scrollDiv = scrollRef.current;
            const targetElement = scrollDiv.querySelector('.엔드포인트')
            if (targetElement) {
                const targetElementRect = targetElement.getBoundingClientRect();
                //param이 변경되어도 이전 scrollTop을 가지고 있어 그만큼 다시 더해줘야함
                //만약 이전 스크롤 탑이 300인데 안 더해주면 300만큼 위로 올라감(-300돼서)
                scrollRef.current.scrollTop += targetElementRect.bottom-300 ;
                scrollPointMap.set(param, targetElementRect.bottom-300)
            }
            //메시지가 쌓인 상태로 들어오면 newList를 비우기 다시 1개는 채워야함
        }else {
            scrollRef.current.scrollTop =  scrollPointMap.get(param)
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
        const {userEmail} = stomp.receiveMessage
        if((userEmail===localStorage.getItem('userId')) && socketEvent){
            scrollToBottom();
        }

        //스크롤이 존재히면서 해당 스크롤이 맨아래로 내려가 있으면
        if (scrollHeight > clientHeight && scrollTop + clientHeight > clientHeight && scrollTop + clientHeight === scrollHeight && endPointMap.get(param) !== 0) {
            scrollToBottom();
        }
        if(scrollHeight === clientHeight && endPointMap.get(param)!==0 ){
            updateEndpoint();
        }
        //스크롤이 없는데 메시지가 있으면
        beforeScrollTop.current=scrollRef.current.scrollTop;
        beforeScrollHeight.current=scrollRef.current.scrollHeight;
    }



    const updateReloadScroll = () =>{
        //처음 들어오자마자 RELOAD하는 걸 방지 prevScrollHeight이 있어야 작동 =>topRef(observer로만 세팅가능)
        if (scrollRef.current && prevScrollHeight) {
            //저장한 이전높이인 prev만큼 빼줌
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight - prevScrollHeight
        }else if(scrollRef.current && endPointMap.get(param)>0 ){
            //알람이 있으면서 처음 들어올 때 위치 세팅(infiniteQuery는 기존 캐싱(read + reload)만큼 다시 읽어오기 때문에 전부 읽어온 후 엔드포인트를 찾아 세팅하는 것임)
            const scrollDiv = scrollRef.current;
            const targetElement = scrollDiv.querySelector('.엔드포인트')
            if (targetElement) {
                const targetElementRect = targetElement.getBoundingClientRect();
                scrollRef.current.scrollTop += targetElementRect.bottom-300 ;
                scrollPointMap.set(param, scrollRef.current.scrollTop)
            }
        }
    }

    return {scrollRef:scrollRef, updateReloadScroll:updateReloadScroll , setPrevScrollHeight:setPrevScrollHeight}

}