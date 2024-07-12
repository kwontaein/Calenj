import {requestFile} from "../../redux";
import {useDispatch} from "react-redux";
import store from "../../../app/hoc/store";
import {Message} from "../../reactQuery";
import {useState} from "react";
import {ReturnRequestFile} from "./types";



export const useRequestChatFile = (requestParam:string): (pageParam: number) => Promise<Message[] | never[]>=> {
    const dispatch = useDispatch()
    const [beforeUUID,setBeforeUUID] = useState<string>()

    //페이지에 따라 요청을 함
    const requestChatFile = (page:number) => {
        if(page===0){
            dispatch(
                requestFile({
                    target: 'groupMsg',
                    param: requestParam,
                    requestFile: "READ",
                    nowLine: page,
                })
            );
        }else{
            dispatch(
                requestFile({
                    target: 'groupMsg',
                    param: requestParam,
                    requestFile: "RELOAD",
                    nowLine: page,
                })
            );
        }
    }

    return (pageParam: number) => {

        //Promise로 비동기식 처리, stomp가 바뀌면 res에 담아서 반환 > await으로 값이 나올때까지
        return new Promise((res, rej) => {
            requestChatFile(pageParam)

            const unsubscribe = store.subscribe(() => {
                const {state, message, param, receivedUUID} = store.getState().stomp?.receiveMessage;
                //아래 조건이 충족되어야만 값을 저장할 수 있음
                if ((state === "READ" && pageParam === 0) || (state === "RELOAD" && pageParam > 0) && (requestParam===param && receivedUUID !== beforeUUID)){
                    console.log('자 드가자~')
                    setBeforeUUID(receivedUUID)
                    res(message); // 값 반환
                    unsubscribe(); // 구독 취소
                }
            });

        }).then((res) => {
            return res as Message[]; // Promise 결과로 받은 값을 배열로 변환하여 반환
        }).catch(() => {
            return [];
        });
    }

}