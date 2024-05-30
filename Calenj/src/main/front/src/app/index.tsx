import Home from '../pages/main/ui/Home';
import {SignUpForm} from "../pages/signup";
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import {InviteGroup} from "../features/group/invite";
import FriendList from "../features/evnet/friend/ui/FriendList";

import React, {useEffect, useState} from 'react';

import {useSelector} from "react-redux";
import RequestFriend from "../features/evnet/friend/ui/RequestFriend";
import {FullScreen_div} from "../shared/ui/SharedStyled";
import {useFetchCookie} from "../entities/reactQuery";
import ImageUploadView from "../shared/ui/ImageUploadView";
import {Calendar} from "../features/calendar";
import ImagesUploadComponent from "../shared/ui/MultiImageUploadView";
import {LoginFormPages} from "../pages/login/ui";
import {useCheckToken} from "../features/websocket";
import {RootState} from "../entities/redux";
import {sagaRefresh, sagaTask} from "./hoc/store";


export const App: React.FC =() => {
    const cookieState = useFetchCookie();
    const loading = useSelector((state: RootState) => state.stomp.loading); // 리덕스 상태 구독
    const checkToken = useCheckToken (sagaRefresh);


    useEffect(() => {
        if (cookieState.data === undefined) return
        checkToken(cookieState.data)
    }, [cookieState.data]);


    return (
        <FullScreen_div>
            {loading &&
                <BrowserRouter>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/signup"} element={<SignUpForm/>}/>
                        <Route path={"/sign"} element={<LoginFormPages/>}/>
                        <Route path={"/inviteGroup/"}>
                            <Route path={":inviteCode"} element={<InviteGroup/>}/>
                        </Route>
                        <Route path={"/friend"} element={<FriendList/>}/>
                        <Route path={"/requestFriend"} element={<RequestFriend/>}/>
                        <Route path={"/c"} element={<Calendar/>}/>
                        <Route path={"/image"} element={<ImageUploadView/>}/>
                        <Route path={"/images"} element={<ImagesUploadComponent/>}/>
                    </Routes>
                </BrowserRouter>
            }
        </FullScreen_div>
    );
}
