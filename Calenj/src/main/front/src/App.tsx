import Home from './Home';
import SignUp from './components/Auth/Sign_up';
import Sign from './components/Auth/Sign';
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import NoticeDetail from './components/Group/Notice/NoticeDetail';
import VoteDetail from './components/Group/Vote/VoteDetail';
import InviteGroup from "./components/Group/Invite/InviteGroup";
import FriendList from "./components/Friends/FriendList";
import NaverMap from "./components/Group/Map/NaverMap"
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {QUERY_COOKIE_KEY} from './store/ReactQuery/QueryKey'
import {
    DispatchStompProps,
    mapDispatchToStompProps,
    StompData,
    mapStateToStompProps
} from './store/module/StompReducer';
import {connect} from "react-redux";
import {useQuery,} from '@tanstack/react-query';
import {sagaMutation} from './store/store'
import RequestFriend from "./components/Friends/RequestFriend";
import {FullScreen_div} from "./style/FormStyle";

//대표 색 : #  007bff


interface SubScribe {
    groupId: string;
    chattingRoomId: string;
}


const App: React.FC<DispatchStompProps & StompData> = ({synchronizationStomp, updateOnline, stomp, updateLoading}) => {
    const [loading, setLoading] = useState<boolean>(false);

    //api 를 통하여 쿠키를 post 하여 boolean 값을 return 받는다.
    //accessToken 만료 시 refreshToken 체크 후 재발급, 모든 토큰 만료 시 재로그인 필요
    const checkCookie = async (): Promise<boolean> => {
        const response = await axios.post('/api/postCookie');
        sagaMutation(response.data)//saga middleware 관리 => 토큰이 유효한지 체크하고 saga refresh
        if (!response.data) {
            console.log('ㅎㅇ')
            localStorage.removeItem('userId')
            localStorage.removeItem('nowPosition');
            updateOnline({isOnline: "OFFLINE"});
            updateLoading({loading: true});
        } else {

            axios.get(`/api/subscribeCheck`)
                .then((res) => {
                    updateOnline({isOnline: "ONLINE"})
                    let arr = res.data
                    let friendArr = Array.from(arr.friendList, (value: SubScribe) => {
                        return value.chattingRoomId;
                    })
                    let groupArr = Array.from(arr.groupList, (value: SubScribe) => {
                        return value.groupId;
                    })
                    let subScribe = subScribeFilter(friendArr, groupArr, arr.userId)
                    synchronizationStomp({destination: subScribe});
                })
                .catch(() => {
                    window.alert('잘못된 접근입니다. 재시작을 해주세요.')
                })
        }
        return response.data;
    }

    useEffect(() => {
        setLoading(stomp.loading)
    }, [stomp.loading])

    function subScribeFilter(friendList: string[], groupList: string[], userId: string) {
        let paramsList = [];
        paramsList.push(groupList) //그룹채팅
        paramsList.push(friendList) //친구채팅
        paramsList.push([userId]) //개인이벤트
        return paramsList;
    }

    // //v5이후로 인자를 객체 형태로 전달해야함
    useQuery<boolean, Error>({
        queryKey: [QUERY_COOKIE_KEY],
        queryFn: checkCookie, //HTTP 요청함수 (Promise 를 반환하는 함수)
    });

    return (
        <FullScreen_div>
            {loading &&
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/signup"} element={<SignUp/>}/>
                        <Route path={"/sign"} element={<Sign/>}/>
                        <Route path={"/notice/detail"} element={<NoticeDetail/>}/>
                        <Route path={"/vote/detail"} element={<VoteDetail/>}/>
                        <Route path={"/inviteGroup/"}>
                            <Route path={":inviteCode"} element={<InviteGroup/>}/>
                        </Route>
                        <Route path={"/friend"} element={<FriendList/>}/>
                        <Route path={"/requestFriend"} element={<RequestFriend/>}/>
                        <Route path={"/Map"} element={<NaverMap/>}/>
                    </Routes>
                </BrowserRouter>
            }
        </FullScreen_div>
    );
}
export default connect(mapStateToStompProps, mapDispatchToStompProps)(App);