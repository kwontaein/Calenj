import {useEffect, useMemo, useState} from "react";
import {
    QUERY_NEW_CHAT_KEY,
    useChatFileInfinite,
    useReceiveChatInfinite
} from "../../../../entities/reactQuery/model/queryModel";
import {useChatFetching} from "../../../../entities/message";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {InfiniteData, UseInfiniteQueryResult, useQueryClient} from "@tanstack/react-query";
import {Message} from '../../../../entities/reactQuery'
import {endPointMap, scrollPointMap} from "../../../../entities/redux";
import {changeDateForm} from "../../../../shared/lib";

interface useMessageData{
    messageList:Message[],
    newMessageList:Message[],
    chatFile: UseInfiniteQueryResult<InfiniteData<Message[], unknown>, Error>,
    compareDate: (date1:string,date2:string) => boolean,
}



export const useMessageData = (param:string,target:string) :useMessageData=>{
    const [newMsgLength,setNewMsgLength] = useState(0);
    const [fetchData,receiveNewChat] = useChatFetching(param) //데이터 패치함수
    const stomp = useSelector((state:RootState)=>state.stomp);
    const queryClient = useQueryClient();

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


    useEffect(() => {
        if(stomp.param!==param) return
        if (endPointMap.get(param) > 0) {
            scrollPointMap.delete(param)
            chatFile.refetch().then(() => {
                //newMessage 비우기
                if (!newChat.data) return
                queryClient.setQueryData([QUERY_NEW_CHAT_KEY, param], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
                    pages: data?.pages.slice(0, 1),
                    pageParams: data?.pageParams.slice(0, 1)
                }));
            });
        }
    }, [param])

    //--------------------------------------------------------------------------------------------------------------- 의존성을 활용한 페이지 랜더링 및 업데이트 관리

//반환되는 데이터
    const removeDuplicate = (messageList:Message[]):Message[] =>{
        const removeDuplicatesList = [...new Set(messageList.map((message)=> JSON.stringify(message)))]
            .map((message) => JSON.parse(message)) as Message[];
        if(messageList.length !== removeDuplicatesList.length){
            queryClient.setQueryData([QUERY_NEW_CHAT_KEY, param], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
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

    const compareDate = (date1:string, date2:string):boolean =>{
        if(changeDateForm(date1).getDate() !== changeDateForm(date2).getDate()) return true
        if(changeDateForm(date1).getMonth() !== changeDateForm(date2).getMonth()) return true
        return changeDateForm(date1).getFullYear() !== changeDateForm(date2).getFullYear();
    }


    return {messageList,newMessageList,chatFile, compareDate}
}