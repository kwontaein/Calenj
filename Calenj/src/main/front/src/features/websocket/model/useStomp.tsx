import {RootState} from "../../../entities/redux";
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
import {sagaRefresh} from "../../../app/hoc/store";
import {useEffect, useState} from "react";
import {
    QUERY_FRIEND_LIST_KEY,
    QUERY_REQUEST_FRIEND_LIST,
    QUERY_RESPONSE_FRIEND_LIST,
    useFetchUserInfo
} from "../../../entities/reactQuery";
import {
    createFriendOnline,
    updateFriendOnline,
    updateGroupOnline
} from "../../../entities/redux/model/slice/OnlineUserStorageSlice";
import {useQueryClient} from "@tanstack/react-query";


export const useStomp = (sagaRefresh:()=>void):(cookie:boolean)=>void =>{
    const dispatch = useDispatch()
    const stomp = useSelector((state: RootState) => state.stomp); // 리덕스 상태 구독
    const queryClient = useQueryClient();
    const [userId,setUserId] = useState<string>();


    useEffect(() => {
        if(!userId) return

        const {param,state,target, onlineUserList} =stomp.receiveMessage

        //온라인 리스트 처리
        if(state==="ALARM"){
            if(target ==="friendMsg" && onlineUserList.length > 1){ //1번배열 = 친구 id
                onlineUserList.forEach((userParam, index)=>{
                    if(userParam!==userId){
                        dispatch(updateFriendOnline({personalKey:userId, userParam: onlineUserList[index]}))
                    }
                })
            }else if(target ==="groupMsg"){
                dispatch(updateGroupOnline({groupKey:param, onlineList: onlineUserList}))
            }
        }
        //친구요청 처리
        if(param ==='친구요청'){
            queryClient.refetchQueries({queryKey:[QUERY_RESPONSE_FRIEND_LIST]})
        }else if(param ==='친구수락'){
            queryClient.refetchQueries({queryKey:[QUERY_REQUEST_FRIEND_LIST]})
            queryClient.refetchQueries({queryKey:[QUERY_FRIEND_LIST_KEY]})
        }else if(param ==='친구거절'){
            queryClient.refetchQueries({queryKey:[QUERY_REQUEST_FRIEND_LIST]})
        }


    }, [stomp]);



    return  (cookie: boolean) => {
        if (stomp.isConnect && !cookie) {//로그인이 아닌데 stomp가 연결되어 있으면
            sagaRefresh()//saga middleware 관리 => 토큰이 유효한지 체크하고 saga refresh
        }
        if (!cookie) {
            // localStorage.removeItem('userId')
            localStorage.removeItem('nowPosition');
            dispatch(updateOnline({isOnline: "OFFLINE"}));
            dispatch(updateLoading({loading: true}));
        } else {
            // features/websocket/api
            subscribeCheckApi()
                .then((res) => {
                    dispatch(updateOnline({isOnline: "ONLINE"}))
                    let arr = res.data

                    setUserId(arr.userId)//사용자 id 세팅
                    dispatch(createFriendOnline({personalKey:arr.userId})) //친구 온라인 리스트를 담는 배열생성

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