import React from 'react';
import Home from './Home';
import SignUp from './components/Auth/Sign_up';
import Sign from './components/Auth/Sign';
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom';
import GroupDetail from "./components/Group/GroupDetail";
import Chatting from "./Test/Chatting";
import NoticeDetail from './components/Group/Notice/NoticeDetail';
import VoteDetail from './components/Group/Vote/VoteDetail';
import inviteCode from "./Test/InviteCode";
import InviteGroup from "./components/Group/InviteGroup";
import FriendList from "./components/Friends/FriendList";
import RequestFriend from "./components/Friends/RequestFriend";
// import GroupList from "./components/Group/GroupList";

const App: React.FC = () => {

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
export default App;

