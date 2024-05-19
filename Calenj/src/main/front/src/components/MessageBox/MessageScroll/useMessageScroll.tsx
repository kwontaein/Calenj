import {endPointMap, scrollPointMap} from "../../../store/module/StompMiddleware";
import {debounce} from "../../../shared/lib";
import {requestFile} from "../../../store/module/StompReducer";
import {useRef} from "react";

export const useMessageScroll = (param:string, newMessageLength:number) =>{
    const scrollTimerRef = useRef<NodeJS.Timeout | undefined>(); //채팅스크롤 디바운싱 Ref
    const scrollRef = useRef<HTMLDivElement | null>(null); //채팅스크롤 Ref
    const berforeScrollTop = useRef<number>(); //이전 스크롤의 위치를 기억
    const beforeScrollHeight = useRef<number>(); //이전 스크롤의 높이를 기억


    const handleScroll = () => {
        if (scrollTimerRef.current) {
            clearTimeout(scrollTimerRef.current);
        }
        scrollTimerRef.current = setTimeout(() => {
            updateScroll()
        }, 50)
    };

    const updateScroll = () => {
        if (!scrollRef.current) return
        const {scrollTop, scrollHeight, clientHeight} = scrollRef.current;
        //스크롤이 존재히면서 해당 스크롤이 맨아래로 내려가 있으면
        if (scrollHeight > clientHeight && scrollTop + clientHeight > clientHeight && scrollTop + clientHeight === scrollHeight && endPointMap.get(param) !== 0) {
            endPointMap.set(param, 0)
            scrollToBottom();
            updateEndpoint();
        }
        if(scrollHeight === clientHeight && endPointMap.get(param)!==0 ){
            endPointMap.set(param, 0)
            updateEndpoint();
        }
        //스크롤이 없는데 메시지가 있으면
        berforeScrollTop.current=scrollRef.current.scrollTop;
        beforeScrollHeight.current=scrollRef.current.scrollHeight;
    }

    //앤드포인트 갱신을 위한 함수
    const updateEndpoint = () => {
        const debouncedRequest = debounce(() => {
            requestFile({target: 'groupMsg', param: param, requestFile: "ENDPOINT", nowLine: 0});
            console.log('엔드포인트 갱신');
        }, 1000);
        debouncedRequest();
    }
    //스크롤을 맨 아래로 내려주는 함수
    const scrollToBottom = () => {
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                berforeScrollTop.current = scrollRef.current.scrollTop
            }
        }, 50)
    };

    return ()=>{
        //isLoading이 falset가 돼야 스크롤 scrollRef가 잡혀서 셋팅됨
        //로딩된 이후엔 스크롤을 안 내려야함
        if (scrollRef.current) {
            scrollRef.current.addEventListener('scroll', handleScroll);

            //infiniteQuery 첫세팅 시에만 체크됨 => scrollPointMap이 등록되지 않은상황
            if (endPointMap.get(param) === 0 && newMessageLength===0 && (!scrollPointMap.get(param))) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                scrollPointMap.set(param, scrollRef.current.scrollHeight)

            } else if(endPointMap.get(param)>0) {
                //들어갔는데 스크롤이 없고 메시지가 있으면 바로 읽은 거로 처리
                const {scrollHeight, clientHeight} = scrollRef.current;
                if(scrollHeight === clientHeight){
                    endPointMap.set(param, 0)
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
    }

}