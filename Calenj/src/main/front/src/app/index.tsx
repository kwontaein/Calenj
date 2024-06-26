import Home from '../pages/main/ui/Home';
import {SignUpForm} from "../pages/signup";
import {BrowserRouter, Routes, Route,} from 'react-router-dom';
import {InviteGroup} from "../features/group/invite";

import React, {useEffect, useState} from 'react';

import {useSelector} from "react-redux";
import {FullScreen_div} from "../shared/ui/SharedStyled";
import {
    QUERY_FRIEND_LIST_KEY,
    QUERY_REQUEST_FRIEND_LIST,
    QUERY_RESPONSE_FRIEND_LIST,
    useFetchCookie
} from "../entities/reactQuery";
import ImageUploadView from "../shared/ui/ImageUploadView";
import ImagesUploadComponent from "../shared/ui/MultiImageUploadView";
import {LoginFormPages} from "../pages/login/ui";
import {useCheckToken} from "../features/websocket";
import {RootState} from "../entities/redux";
import {sagaRefresh, sagaTask} from "./hoc/store";
import {useQueryClient} from "@tanstack/react-query";


export const App: React.FC = () => {
    const cookieState = useFetchCookie();
    const loading = useSelector((state: RootState) => state.stomp.loading); // 리덕스 상태 구독
    const checkToken = useCheckToken(sagaRefresh);

    const queryClient = useQueryClient();
    const stomp = useSelector((state:RootState) => state.stomp);

    useEffect(() => {
        if (cookieState.data === undefined) return
        checkToken(cookieState.data)
    }, [cookieState.data]);

    useEffect(() => {
        const {param} =stomp.receiveMessage
        if(param ==='친구요청'){
            queryClient.refetchQueries({queryKey:[QUERY_RESPONSE_FRIEND_LIST]})
        }else if(param ==='친구수락'){
            queryClient.refetchQueries({queryKey:[QUERY_REQUEST_FRIEND_LIST]})
            queryClient.refetchQueries({queryKey:[QUERY_FRIEND_LIST_KEY]})
        }else if(param ==='친구거절'){
            queryClient.refetchQueries({queryKey:[QUERY_REQUEST_FRIEND_LIST]})
        }
    }, [stomp]);

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
                        <Route path={"/image"} element={<ImageUploadView/>}/>
                        <Route path={"/images"} element={<ImagesUploadComponent/>}/>
                    </Routes>
                </BrowserRouter>
            }
        </FullScreen_div>
    );
}
