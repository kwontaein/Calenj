import {useRef} from "react";

interface UseScrollParams {
    scrollRef: React.RefObject<HTMLDivElement>;
    updateEndpoint: (params: any) => void;
    param: string;
}

export const useScroll = ({scrollRef, updateEndpoint, param}: UseScrollParams) => {
    const scrollTimerRef = useRef<NodeJS.Timeout | undefined>();

    const handleScroll = () => {
        if (scrollTimerRef.current) {
            clearTimeout(scrollTimerRef.current);
        }
        scrollTimerRef.current = setTimeout(() => {
            // 스크롤 업데이트 로직
        }, 50);
    };

    const addScrollEvent = () => {
        if (scrollRef.current) {
            scrollRef.current.addEventListener('scroll', handleScroll);
        }
    };

    return {
        handleScroll,
        addScrollEvent
    };
};
