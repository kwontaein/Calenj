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
import {
    DispatchStompProps,
    mapDispatchToStompProps,
    StompData,
    mapStateToStompProps
} from './store/module/StompReducer';
import {connect} from "react-redux";
import {sagaRefresh, sagaTask} from './store/store'
import RequestFriend from "./components/Friends/RequestFriend";
import {FullScreen_div} from "./style/FormStyle";
import {useFetchCookie} from "./store/ReactQuery/queryManagement";
import ImageUploadComponent from "./components/User/ImageUploadComponent";
import CalendarComponent from "./components/Calendar/Calendar";

//대표 색 : #  007bff


interface SubScribe {
    groupId: string;
    chattingRoomId: string;
}


const App: React.FC<DispatchStompProps & StompData> = ({
                                                           synchronizationStomp,
                                                           updateOnline,
                                                           stomp,
                                                           updateLoading,
                                                           updateStompState
                                                       }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const cookieState = useFetchCookie();

    useEffect(() => {
        console.log(`실행 ${cookieState.data}`)
        if (cookieState.data !== undefined) {
            checkToken(cookieState.data)
        }
    }, [cookieState.data]);

    const checkToken = (cookie: boolean) => {

        if (stomp.isConnect && !cookie) {//로그인이 아닌데 stomp가 연결되어 있으면
            sagaRefresh()//saga middleware 관리 => 토큰이 유효한지 체크하고 saga refresh
        }
        if (!cookie) {
            // localStorage.removeItem('userId')
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
                    updateStompState({isConnect: true})
                })
                .catch(() => {
                    window.alert('잘못된 접근입니다. 재시작을 해주세요.')
                })
        }
    }

    function subScribeFilter(friendList: string[], groupList: string[], userId: string) {
        let paramsList = [];
        paramsList.push([userId]) //개인이벤트
        paramsList.push(groupList) //그룹채팅
        paramsList.push(friendList) //친구채팅
        return paramsList;
    }

    useEffect(() => {
        setLoading(stomp.loading)
    }, [stomp.loading])


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
                        <Route path={"/c"} element={<CalendarComponent/>}/>
                        <Route path={"/Map"} element={<NaverMap/>}/>
                        <Route path={"/image"} element={<ImageUploadComponent/>}/>
                    </Routes>
                </BrowserRouter>
            }
        </FullScreen_div>
    );
}
export default connect(mapStateToStompProps, mapDispatchToStompProps)(App);