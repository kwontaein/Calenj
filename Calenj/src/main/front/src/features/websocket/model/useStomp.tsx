import {addSubScribe, EndPointParamMap, groupEndPointMap, RootState} from "../../../entities/redux";
import {subscribeCheckApi} from "../api/subscirbeCheckApi";
import {
    synchronizationStomp,
    updateLoading,
    updateOnline,
    updateStompState
} from "../../../entities/redux/model/slice/StompReducer";
import {useDispatch, useSelector} from "react-redux";
import {subscribeFilter} from "../utils/subscribeFilter";
import {SubScribeType} from "./types";
import {useEffect, useState} from "react";
import {
    QUERY_CHATTING_KEY,
    QUERY_FRIEND_LIST_KEY,
    QUERY_REQUEST_FRIEND_LIST,
    QUERY_RESPONSE_FRIEND_LIST, useReceiveChatInfinite,
} from "../../../entities/reactQuery";
import {
    createFriendOnline, updateFriendOffline,
    updateFriendOnline, updateGroupOnlineUserList,
} from "../../../entities/redux/model/slice/OnlineUserStorageSlice";
import {useQueryClient} from "@tanstack/react-query";
import {receivedMessage} from "../../../entities/message";
import {friendEndPointMap} from "../../../entities/redux/model/module/StompMiddleware";

export const useStomp = (sagaRefresh: () => void): (cookie: boolean) => void => {
    const dispatch = useDispatch()
    const stomp = useSelector((state: RootState) => state.stomp); // 리덕스 상태 구독
    const queryClient = useQueryClient();
    const [myId, setMyId] = useState<string>();
    const receivedNewMessage = receivedMessage();
    const {fetchNextPage} =  useReceiveChatInfinite(stomp.receiveMessage.param, receivedNewMessage)
    const [chatRoomId, setChatRoomId] = useState<string|null>();

    useEffect(() => {
        if (!myId) return
        const {param, state, target, onlineUserList, message} = stomp.receiveMessage

        //온라인 리스트 처리
        if (!message) {
            if (target === "friendMsg") { //내 id는 필수로 들어가기 때문
                if (state === 'ONLINE') {

                    const friendIdList = onlineUserList.filter((friendId) => friendId != myId) // 내 id 제거
                    
                    if (friendIdList.length > 0) {
                        friendIdList.map((friendId) => {
                            dispatch(updateFriendOnline({personalKey: myId, userParam: friendId}))
                        })
                    }
                } else if (state === 'OFFLINE') {
                    dispatch(updateFriendOffline({personalKey: myId, offlineUser: onlineUserList.toString()}))
                }

            } else if (target === "groupMsg") {
                dispatch(updateGroupOnlineUserList({groupKey: param, onlineList: onlineUserList}))
            }
        }
        //친구요청 처리
        if (param === '친구요청') {
            queryClient.refetchQueries({queryKey: [QUERY_RESPONSE_FRIEND_LIST,myId]})
        } else if (param === '친구수락') {
            let chatRoomId = message[0].message
            setChatRoomId(chatRoomId)
            queryClient.refetchQueries({queryKey: [QUERY_REQUEST_FRIEND_LIST,myId]})
            queryClient.refetchQueries({queryKey: [QUERY_FRIEND_LIST_KEY,myId]})
        } else if (param === '친구거절') {
            queryClient.refetchQueries({queryKey: [QUERY_REQUEST_FRIEND_LIST,myId]})
        }
    }, [stomp]);

    useEffect(() => {
        if (stomp.receiveMessage.state === "SEND") {
            const {param, target, userId, message} = stomp.receiveMessage
            const chatData = queryClient.getQueryData([QUERY_CHATTING_KEY,param])
            if(chatData){
                if(userId!==myId){
                    if(target ==="groupMsg" && groupEndPointMap.get(param)===0){
                        EndPointParamMap.set(param, message[0].chatUUID)
                    }else if(target ==="friendMsg" && friendEndPointMap.get(param)===0){
                        EndPointParamMap.set(param, message[0].chatUUID)
                    }
                }else{
                    EndPointParamMap.set(param,"NONE")
                }
                fetchNextPage()
            }
            target ==="groupMsg" ?
                groupEndPointMap.set(param, (groupEndPointMap.get(param)||0) + 1) :
                target ==="friendMsg" && friendEndPointMap.set(param,(friendEndPointMap.get(param)||0) +1)
        }
    }, [stomp.receiveMessage.receivedUUID]);

    //친구요청 처리 이후 추가구독
    useEffect(()=>{
        if(!chatRoomId) return
        dispatch(addSubScribe({subScribeParam:chatRoomId}))
    },[chatRoomId])


    return (cookie: boolean) => {
        if (stomp.isConnect && !cookie) {//로그인이 아닌데 stomp가 연결되어 있으면
            sagaRefresh()//saga middleware 관리 => 토큰이 유효한지 체크하고 saga refresh
        }
        if (!cookie) {
            localStorage.removeItem('userId')
            localStorage.removeItem('nowPosition');
            dispatch(updateOnline({isOnline: "OFFLINE"}));
            dispatch(updateLoading({loading: true}));
        } else {
            // features/websocket/api
            subscribeCheckApi()
                .then((res) => {
                    dispatch(updateOnline({isOnline: "ONLINE"}))
                    let arr = res.data

                    setMyId(arr.userId)//사용자 id 세팅
                    dispatch(createFriendOnline({personalKey: arr.userId})) //친구 온라인 리스트를 담는 배열생성

                    let friendArr = Array.from(arr.friendList, (value: SubScribeType) => {
                        return value.chattingRoomId;
                    })
                    let groupArr = Array.from(arr.groupList, (value: SubScribeType) => {
                        return value.groupId;
                    })
                    let subScribe = subscribeFilter(friendArr, groupArr, arr.userId)

                    localStorage.setItem('userId', arr.userId); // Id 저장
                    //stomp 연결시작 => dispatch synchronizationStomp >> Saga.Next()
                    dispatch(synchronizationStomp({destination: subScribe}));
                    dispatch(updateStompState({isConnect: true}))
                })
                .catch(() => {
                    window.alert('잘못된 접근입니다. 재시작을 해주세요.')
                })
        }
    }

}