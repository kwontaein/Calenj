import React from 'react';
import Home from './Home';
import SignUp from './components/Auth/Sign_up';
import Sign from './components/Auth/Sign';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import GroupList from "./components/Group/GroupList";

 const App:React.FC =()=> {

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Home/>}></Route>
                    <Route path={"/signup"} element={<SignUp/>}></Route>
                    <Route path={"/sign"} element={<Sign/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;