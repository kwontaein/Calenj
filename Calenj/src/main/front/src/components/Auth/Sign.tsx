import React, {useState, useEffect, useRef} from 'react';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {stateFilter, loginFilter} from '../../stateFunc/actionFun'
import {Frame, IMessage, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface OnlineState {
    nickName: string;
    isOnline: boolean;
}

interface MyData {
    userEmail: string;
    userPassword: string;
}


const Sign: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [online, setOnline] = useState<OnlineState[]>([]); // 수신된 메시지 배열


    const [data, setData] = useState<MyData>({
        userEmail: '',
        userPassword: '',
    });

    const SignHandeler = (key: string, event: string): void => {
        setData((prevState: MyData) => {
            return {...prevState, [key]: event}
        })
    };

    const login = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        axios.post('/api/login', data)
            .then(() => {
                localStorage.setItem('userId', data.userEmail);
                document.location.replace("/");

            })

            .catch(error => {
                loginFilter(error.response?.data || "An unexpected error occurred");
                stateFilter(error.response?.data || "An unexpected error occurred");
            })
    };


    //페이지 로딩 시 자동으로 id input에 focus
    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    return (
        <div>
            <form onSubmit={login}>
                <div>id: <input ref={inputRef} onChange={(event) => {
                    SignHandeler("userEmail", event.target.value)
                }}></input></div>
                <div>pw: <input type="password" onChange={(event) => {
                    SignHandeler("userPassword", event.target.value)
                }}></input></div>

                <button type="submit">로그인</button>
            </form>
        </div>
    );

}
export default Sign