import {useEffect, useMemo, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";

export const useValidCountDown =(onClose:()=>void):[minutes:number,seconds:number]=>{
    const validateTime = useMemo(()=>Date.now()+180000,[])
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const interval = useRef<boolean>();

    /*토큰의 남은 시간을 계산하여 반환하는 함수 */
    const updateTimer = (): boolean => {
        const currentTime = Date.now();

        //남은 시간 계산 (밀리초 단위)
        setRemainingTime(validateTime - currentTime);

        // 남은 시간을 시분초로 변환
        setSeconds(Math.floor((remainingTime / 1000) % 60));
        setMinutes(Math.floor((remainingTime / 1000 / 60) % 60));

        return remainingTime < 0;
    }

    // remember function result
    useEffect(() => {
        interval.current = updateTimer();
    }, [updateTimer]);


    //랜더링 시 카운트 다운, 만약 함수가 반환하는 값이 true면 멈춤
    useEffect(() => {
        const id = setInterval(updateTimer, 1000);

        //이메일 토큰 유효시간이 지나면
        if (interval.current) {
            clearInterval(id);
            setSeconds(0);
            setMinutes(0);
            console.log('꺼짐요')
            onClose();
        }
        return () => clearInterval(id);
    });

    return [minutes,seconds]
}