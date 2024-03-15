import React from 'react';
import Home from './Home';
import SignUp from './components/Auth/Sign_up';
import Sign from './components/Auth/Sign';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import GroupList from "./components/Group/GroupList";

const App: React.FC = () => {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/signup"} element={<SignUp/>}/>
                    <Route path={"/sign"} element={<Sign/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;

export function dofilter (error:string){
    if (error === "ALL_TOKEN_EXPIRED") {
        window.alert("모든 토큰이 만료되었습니다. 재로그인하세요.")
    } else if (error === "UNKNOWN_EXCEPTION") {
        window.alert("모든 토큰이 만료되었습니다. 재로그인하세요.")
    }
}