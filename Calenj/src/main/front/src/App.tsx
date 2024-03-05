import React from 'react';
import Home from './Home';
import Rooms from './Test/Rooms';
import SignUp from './components/Auth/Sign_up';
import Sign from './components/Auth/Sign';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MakeGroup from "./components/Group/MakeGroup";

 const App:React.FC =()=> {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home/>}></Route>
                    <Route path={"/signup"} element={<SignUp/>}></Route>
                    <Route path={"/sign"} element={<Sign/>}></Route>
                    <Route path={"/group/makegroup"} element={<MakeGroup/>}></Route>
                    <Route path={"/example"} element={<Rooms/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;