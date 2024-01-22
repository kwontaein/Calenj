import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"


export default function SignState(){


    const [result, setResult] = useState('');
    const [logstate, setLogstate] = useState('');


    const logout = () => {
        axios.post('/api/logout')
            .then(response => setResult(response.data), setLogstate("logout"))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        axios.post('/api/postCookie')
            .then(response => {
                // 서버에서의 응답 처리
                if (response.data) {
                    setLogstate("login");
                } else {
                    setLogstate("logout");
                }
            })
            .catch(error => console.log(error));
    }, [])

    return (
        <div>
            {logstate === "logout" ?
                <Link to="/Sign" style={{ textDecoration: "none" }}><button>로그인</button></Link> :
                <button onClick={logout}>로그아웃</button>}
        </div>
    );
    
}