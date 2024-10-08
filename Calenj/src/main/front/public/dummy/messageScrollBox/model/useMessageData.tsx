// import {useEffect, useMemo, useState} from "react";
// import {
//     QUERY_CHATTING_KEY,
//     QUERY_NEW_CHAT_KEY,
//     useChatFileInfinite,
//     useReceiveChatInfinite
// } from "../../../../src/entities/reactQuery/model/queryModel";
// import {useChatFetching} from "../../../../src/entities/message";
// import {useDispatch, useSelector} from "react-redux";
// import {RootState} from "../../../../src/entities/redux";
// import {InfiniteData, UseInfiniteQueryResult, useQueryClient} from "@tanstack/react-query";
// import {Message} from '../../../../src/entities/reactQuery'
// import {endPointMap, scrollPointMap} from "../../../../src/entities/redux";
// import {changeDateForm} from "../../../../src/shared/lib";
//
// interface useMessageData {
//     messageList: Message[],
//     newMessageList: Message[],
//     chatFile: UseInfiniteQueryResult<InfiniteData<Message[], unknown>, Error>,
//     compareDate: (date1:string,date2:string) => boolean,
//     isFetching:boolean,
// }
//
//
// export const useMessageData = (param: string): useMessageData => {
//     const [newMsgLength, setNewMsgLength] = useState(0);
//     const {requestFile,receiveNewChat} = useChatFetching() //데이터 패치함수
//     const stomp = useSelector((state: RootState) => state.stomp);
//     const queryClient = useQueryClient();
//     const chatFile = useChatFileInfinite(param, newMsgLength ,requestFile)
//     const newChat = useReceiveChatInfinite(param, receiveNewChat)
//     const [isFetching,setIsFetching] = useState<boolean>(endPointMap.get(param)>0)
//
//     useEffect(() => {
//         setIsFetching(chatFile.isRefetching)
//         if(chatFile.isRefetching) {
//             scrollPointMap.delete(param)
//         }
//     }, [chatFile.isRefetching]);
//
//
//     useEffect(() => {
//
//         const {state} = stomp.receiveMessage;
//         //해당 방의 채팅내용만 받아옴
//         if (param !== stomp.receiveMessage.param) return
//         //셋팅 이후 send를 받음 =>1.READ한 파일 세팅 이후 처리
//         if ((!newChat.isFetching) && state === "SEND") {
//             newChat.fetchNextPage();
//         }
//     }, [stomp.receiveMessage.receivedUUID])
//
//
//     useEffect(() => {
//         if (newChat.data) {
//             setNewMsgLength(newChat.data?.pageParams.length - 1)
//         }
//     }, [newChat.data]);
//
//
//     useEffect(() => {
//         if (endPointMap.get(param) > 0) {
//             if(chatFile.data){
//                 queryClient.setQueryData([QUERY_CHATTING_KEY, param], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
//                     pages: data?.pages.slice(0, 1),
//                     pageParams: data?.pageParams.slice(0, 1)
//                 }));
//             }
//             chatFile.refetch().then(() => {
//                 //newMessage 비우기
//                 if (!newChat.data) return
//                 queryClient.setQueryData([QUERY_NEW_CHAT_KEY, param], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
//                     pages: data?.pages.slice(0, 1),
//                     pageParams: data?.pageParams.slice(0, 1)
//                 }));
//             });
//         }
//         setIsFetching(false)
//
//     }, [param])
//
//     //--------------------------------------------------------------------------------------------------------------- 의존성을 활용한 페이지 랜더링 및 업데이트 관리
//
// //반환되는 데이터
//     const removeDuplicate = (messageList: Message[]): Message[] => {
//         const removeDuplicatesList = [...new Set(messageList.map((message) => JSON.stringify(message)))]
//             .map((message) => JSON.parse(message)) as Message[];
//         if (messageList.length !== removeDuplicatesList.length) {
//             queryClient.setQueryData([QUERY_NEW_CHAT_KEY, param], (data: InfiniteData<(Message | null)[], unknown> | undefined) => ({
//                 pages: data?.pages.slice(0, removeDuplicatesList.length),
//                 pageParams: data?.pageParams.slice(0, removeDuplicatesList.length)
//             }));
//         }
//         return removeDuplicatesList;
//     }
//
//
//     const newMessageList = useMemo(() => {
//         if (newChat.data) {
//             // setNewMsgLength(newChat.data.pageParams.length - 1)
//             //중복제거
//             return removeDuplicate(newChat.data.pages)
//         }
//         return [];
//     }, [newChat.data])
//
//
//     const messageList = useMemo(() => {
//         if (chatFile.data && !isFetching) {
//             return [...chatFile.data.pages.reduce((prev, current) => prev.concat(current))]
//         }
//         return [];
//     }, [chatFile.data, isFetching])
//
//
//     const compareDate = (date1:string, date2:string):boolean =>{
//         if(changeDateForm(date1).getDate() !== changeDateForm(date2).getDate()) return true
//         if(changeDateForm(date1).getMonth() !== changeDateForm(date2).getMonth()) return true
//         return changeDateForm(date1).getFullYear() !== changeDateForm(date2).getFullYear();
//     }
//
//
//     return {messageList,newMessageList,chatFile, compareDate, isFetching}
// }