import {requestFile} from "../../redux/module/StompReducer";
import {useDispatch} from "react-redux";
import store from "../../redux/store";


export const useRequestChatFile = (param:string):(pageParam: number) => Promise<string[] | never[]> => {
    const dispatch = useDispatch()

    //페이지에 따라 요청을 함
    const requestChatFile = (page:number) => {
        if(page===0){
            dispatch(
                requestFile({
                    target: 'groupMsg',
                    param: param,
                    requestFile: "READ",
                    nowLine: page,
                })
            );
        }else{
            dispatch(
                requestFile({
                    target: 'groupMsg',
                    param: param,
                    requestFile: "RELOAD",
                    nowLine: page,
                })
            );
        }
    }

    return (pageParam: number) => {
        requestChatFile(pageParam)
        //Promise로 비동기식 처리, stomp가 바뀌면 res에 담아서 반환 > await으로 값이 나올때까지
        return new Promise((res, rej) => {
            const unsubscribe = store.subscribe(() => {
                const {receiveMessage} = store.getState().stomp;
                //아래 조건이 충족되어야만 값을 저장할 수 있음
                if ((receiveMessage.state === "READ" && pageParam === 0) || (receiveMessage.state === "RELOAD" && pageParam > 0)) {
                    res(receiveMessage.message); // 값 반환
                    unsubscribe(); // 구독 취소
                }
            });
        }).then((res) => {
            return [...res as string[]]; // Promise 결과로 받은 값을 배열로 변환하여 반환
        }).catch(() => {
            return [];
        });
    }
}