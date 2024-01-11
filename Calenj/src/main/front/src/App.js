import React from 'react';
import TestGet from './Test/TestGet';
import TestPost from './Test/TestPost';
import TestPost2 from './Test/TestPost2';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={"/Test/TestGet"} element={<TestGet />}></Route>
                    <Route path={"/Test/TestPost"} element={<TestPost />}></Route>
                    <Route path={"/Test/TestPost2"} element={<TestPost2 />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}