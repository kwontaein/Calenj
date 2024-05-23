import {useEffect, useMemo, useState} from "react";
import {
    QUERY_NEW_CAHT_KEY,
    useChatFileInfinite,
    useReceiveChatInfinite
} from "../../../../entities/ReactQuery/model/queryModel";
import {useChatFetching} from "../../../../entities/message";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store/store";
import {InfiniteData, UseInfiniteQueryResult, useQueryClient} from "@tanstack/react-query";
import {Message} from '../../../../entities/ReactQuery'
import {endPointMap} from "../../../../store/module/StompMiddleware";
import {updateAppPosition} from "../../../../store/module/StompReducer";

interface useMessageData{
    messageList:Message[],
    newMessageList:Message[],
    chatFile: UseInfiniteQueryResult<InfiniteData<Message[], unknown>, Error>,
}



export const useMessageData = (param:string,target:string, updateReloadScroll:()=>void) :useMessageData=>{
    const [newMsgLength,setNewMsgLength] = useState(0);
    const [fetchData,receiveNewChat]=useChatFetching(param)
    const {stomp} = useSelector((state:RootState)=>state);
    const queryClient = useQueryClient();
    const dispatch = useDispatch()

    const chatFile = useChatFileInfinite(param,newMsgLength,stomp,fetchData)
    const newChat = useReceiveChatInfinite(param,stomp,receiveNewChat)

    useEffect(() => {
        const {state} = stomp.receiveMessage;
        //해당 방의 채팅내용만 받아옴
        if (param !== stomp.receiveMessage.param) return
        //셋팅 이후 send를 받음 =>1.READ한 파일 세팅 이후 처리
        if ((!newChat.isFetching) && state === "SEND") {
            newChat.fetchNextPage();
        }
    }, [stomp.receiveMessage.chatUUID])


    useEffect(() => {
        if(newChat.data){
            setNewMsgLength(newChat.data?.pageParams.length-1)
        }
    }, [newChat.data]);
    //--------------------------------------------------------------------------------------------------------------- 의존성을 활용한 페이지 랜더링 및 업데이트 관리


    useEffect(() => {
        dispatch(updateAppPosition({target: target, param: param}));
        if (endPointMap.get(param) > 0) {
            chatFile.refetch().then(() => {
                //newMessage 비우기
                if (!newChat.data) return
                queryClient.setQueryData([QUERY_NEW_CAHT_KEY, param], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                    pages: data?.pages.slice(0, 1),
                    pageParams: data?.pageParams.slice(0, 1)
                }));
            });
        }
    }, [param])


//반환되는 데이터
    const removeDuplicate = (messageList:Message[]):Message[] =>{
        const removeDuplicatesList = [...new Set(messageList.map((message)=> JSON.stringify(message)))]
            .map((message) => JSON.parse(message)) as Message[];
        if(messageList.length !== removeDuplicatesList.length){
            queryClient.setQueryData([QUERY_NEW_CAHT_KEY, param], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                pages: data?.pages.slice(0, removeDuplicatesList.length),
                pageParams: data?.pageParams.slice(0, removeDuplicatesList.length)
            }));
        }
        return removeDuplicatesList;
    }


    const newMessageList = useMemo(() => {
        if (newChat.data) {
            //중복제거
            return removeDuplicate(newChat.data.pages)
        }
        return [];
    }, [newChat.data])


    const messageList = useMemo(() => {
        if (chatFile.data) {
            return [...chatFile.data.pages.reduce((prev, current) => prev.concat(current))]
        }
        return [];
    }, [chatFile.data])

    useEffect(() => {
        if (stomp.receiveMessage.state === "RELOAD") {
            //메시지 파일을 받은 이후에 스크롤을 업데이트 할수있도록 옵저버를 통한 비동기처리
            updateReloadScroll();
        }
    }, [messageList])


    return {messageList,newMessageList,chatFile}
}