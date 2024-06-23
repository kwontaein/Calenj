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
import {useEffect} from "react";
import {useFetchUserInfo} from "../../../entities/reactQuery";


export const useCheckToken = (sagaRefresh:()=>void):(cookie:boolean)=>void =>{
    const dispatch = useDispatch()
    const stomp = useSelector((state: RootState) => state.stomp); // 리덕스 상태 구독

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