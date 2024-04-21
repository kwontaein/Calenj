import {useState, useEffect, useCallback, useRef} from 'react';
//  옵션 값을 지정한다.
const defaultOption = {
    root: null,
    threshold: 0.5,
    rootMargin: '0px'
};
//  커스텀 훅 부분
// 관찰 대상을 지정할 수 있도록 ref값을 useState 훅을 이용해 state로 관리해준다.
// 관찰자를 만들어준다.

type IntersectHandler = (
    entry: IntersectionObserverEntry, // Intersection Observer API에서 교차 상태의 변경을 나타내는 객체
    observer: IntersectionObserver // 상태를 관측하는 observer, 대상요소를 지정하고 교차상태를 감지
) => void

const useIntersect = (onIntersect: IntersectHandler, //배열과 관측대상을 담음
                      options?: IntersectionObserverInit) => {
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

export default useIntersect;