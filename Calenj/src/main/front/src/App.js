import React from 'react';
import Home from './Home';
import SignUp from './Auth/Sign_up';
import Sign from './Auth/Sign';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MakeGroup from "./Group/MakeGroup";

export default function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home/>}></Route>
                    <Route path={"/SignUp"} element={<SignUp/>}></Route>
                    <Route path={"/Sign"} element={<Sign/>}></Route>
                    <Route path={"/Group/MakeGroup"} element={<MakeGroup/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}