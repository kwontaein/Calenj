import React from 'react';
import Home from './Home';
import SignUp from './Auth/Sign_up';
import Sign from './Auth/Sign';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MakeGroup from "./Group/MakeGroup";

 const App:React.FC =()=> {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home/>}></Route>
                    <Route path={"/signup"} element={<SignUp/>}></Route>
                    <Route path={"/sign"} element={<Sign/>}></Route>
                    <Route path={"/group/makegroup"} element={<MakeGroup/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;