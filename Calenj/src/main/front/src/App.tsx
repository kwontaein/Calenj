import Home from './Home';
import SignUp from './components/Auth/Sign_up';
import Sign from './components/Auth/Sign';
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom';
import GroupDetail from "./components/Group/GroupDetail";
import NoticeDetail from './components/Group/Notice/NoticeDetail';
import VoteDetail from './components/Group/Vote/VoteDetail';
import InviteGroup from "./components/Group/InviteGroup";
import FriendList from "./components/Friends/FriendList";
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import stompReducer, {DispatchStompProps,mapDispatchToStompProps,StompData,mapStateToStompProps} from './store/module/StompReducer';
import {connect} from "react-redux";
import {useQuery, useMutation, useQueryClient, UseQueryResult} from '@tanstack/react-query';
import {sagaMutation} from './store/store'
import RequestFriend from "./components/Friends/RequestFriend";
import {subscribeDirection} from './store/module/StompMiddleware'


export const QUERY_COOKIE_KEY: string = 'cookie';

// import GroupList from "./components/Group/GroupList";

interface SubScribe {
    groupId: string;
    chattingRoomId: string;
}


const App: React.FC<DispatchStompProps & StompData> = ({updateDestination, updateOnline, sendStompMsg, stomp}) => {
    const queryClient = useQueryClient();


    //api를 통하여 쿠키를 post하여 boolean값을 return 받는다.
    //accessToken 만료 시 refreshToken 체크 후 재발급, 모든 토큰 만료 시 재로그인 필요
    const checkCookie = async (): Promise<boolean> => {
        const response = await axios.post('/api/postCookie');

        sagaMutation(response.data)//saga middleware 관리 => 토큰이 유효한지 체크하고 saga refresh
        if (!response.data) {
            localStorage.removeItem('userId')
            updateOnline({isOnline: false});
        } else {

            axios.get(`/api/subscribeCheck`)
                .then((res) => {
                    let arr = res.data
                    let friendArr = Array.from(arr.friendList, (value: SubScribe) => {
                        return value.chattingRoomId;
                    })
                    let groupArr = Array.from(arr.groupList, (value: SubScribe) => {
                        return value.groupId;
                    })
                    let subScribe = subScribeFilter(friendArr, groupArr, arr.userId)

                    updateDestination({destination: subScribe});
                    updateOnline({isOnline: true});
                })
                .catch(() => {
                })
        }
        return response.data;
    }


    function subScribeFilter(friendList: string[], groupList: string[], userId: string) {
        let parmasList = [];
        parmasList.push([userId]) //친구요청
        parmasList.push(groupList) //그룹채팅
        parmasList.push(friendList) //친구채팅
        return parmasList;
    }

    // //v5이후로 인자를 객체 형태로 전달해야함
    const logState = useQuery<boolean, Error>({
        queryKey: [QUERY_COOKIE_KEY],
        queryFn: checkCookie, //HTTP 요청함수 (Promise를 반환하는 함수)
    });

    // useEffect(()=>{
    //     console.log('ㅎㅇ')
    //     return ()=>{console.log('ㅂㅇ')}
    // },[])

    // useQuery는 실시간 데이터 갱신(위치, 그래프 등)에 더욱 적합하다함

    return (
        <div className="App">

            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/signup"} element={<SignUp/>}/>
                    <Route path={"/sign"} element={<Sign/>}/>
                    <Route path={"/details"} element={<GroupDetail/>}/>
                    <Route path={"/notice/detail"} element={<NoticeDetail/>}/>
                    <Route path={"/vote/detail"} element={<VoteDetail/>}/>
                    <Route path={"/inviteGroup/"}>
                        <Route path={":inviteCode"} element={<InviteGroup/>}/>
                    </Route>
                    <Route path={"/friend"} element={<FriendList/>}/>
                    <Route path={"/requestFriend"} element={<RequestFriend/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default connect(mapStateToStompProps, mapDispatchToStompProps)(App);