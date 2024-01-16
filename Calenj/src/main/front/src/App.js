import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Test from './Test2/Test'
import {Routes,
        Route,
        Link} from "react-router-dom";

function App() {
   const [hello, setHello] = useState('')

    useEffect(() => {
        axios.get('/api/demo-web')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
    }, []);

    return (
        <div>
            백엔드에서 가져온 데이터입니다 : {hello}
            <Routes>
            <Route path="/api/login" element={<Test/>}></Route>
            </Routes>
            <br></br>
            <Link to="/api/login">로그인 레츠고</Link>
        </div>

    );
}

export default App;