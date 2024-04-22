import {useState, useEffect, useCallback, useRef} from 'react';

type IntersectHandler = (
    entry: IntersectionObserverEntry, // Intersection Observer API에서 교차 상태의 변경을 나타내는 객체
    observer: IntersectionObserver // 상태를 관측하는 observer, 대상요소를 지정하고 교차상태를 감지
) => void

const useIntersect = (onIntersect: IntersectHandler, //배열과 관측대상을 담음
                      options?: IntersectionObserverInit) => {
    const isIntersecting = useRef<boolean>(false); // 관찰 중인지 여부를 추적하는 상태 추가
    const ref = useRef<HTMLDivElement>(null)

    //교차 상태가 변경된 요소 중에서 교차 상태에 있는 요소에 대해 지정된 콜백 함수를 실행하는 역할을 합니다.
    const callback = useCallback((entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            //entries : 관측할 객체가 포함된 배열
            //observer: 관측대상
            entries.forEach((entry) => {
                //교차상태가 됐는지 확인 = > 교차상태일 시 지정 onInteresct콜백함수 호출
                if (entry.isIntersecting) { // 중복 실행을 방지하는 로직 추가
                    isIntersecting.current = true;
                    onIntersect(entry, observer);
                    observer.unobserve(entry.target);
                }
            })
        },
        [onIntersect]
    )

    useEffect(() => {
        if (!ref.current) return
        //관측할 타겟 지정
        const observer = new IntersectionObserver(callback, options)
        observer.observe(ref.current as Element) //관측대상 지정
        return () => {
            isIntersecting.current = false;
            observer.disconnect()
        }
    }, [ref, options, callback])

    return ref
}

export default useIntersect;