import React, {useState, useEffect, useRef} from 'react';
import axios, {AxiosResponse} from 'axios';
import {personalTopic, stateFilter} from '../../stateFunc/actionFun'
import {Frame, IMessage, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface MyData {
    userEmail: string;
    userPassword: string;
}

interface OnlineState {
    nickName: string;
    isOnline: boolean;
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
        console.log(data);
        axios.post('/api/login', data)
            .then((response: AxiosResponse<Object>) => {

                const stompClient = Stomp.over(() => {
                    return new SockJS("http://localhost:8080/ws-stomp");
                });

                stompClient.activate();//로그인 시 자동 활성화

                // 연결 성공시 처리
                stompClient.onConnect = (frame: Frame) => {
                    console.log('Connected: ' + frame);
                    stompClient.subscribe(`/topic/personalTopic/${data.userEmail}`, (online: IMessage) => {
                        setOnline(JSON.parse(online.body));
                        console.log(online);
                    })
                    stompClient.send('/app/personalTopic', {}, JSON.stringify({
                        userName: data.userEmail,
                        alarmContent: "로그인!!"
                    }));
                };

                // WebSocket 에러 처리
                stompClient.onWebSocketError = (error: Error) => {
                    console.error('Error with websocket', error);
                };

                // Stomp 에러 처리
                stompClient.onStompError = (frame: Frame) => {
                    console.error('Broker reported error: ' + frame.headers['message']);
                    console.error('Additional details: ' + frame.body);
                };

                document.location.replace("/");
            })
            .catch(error => {
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
export default Sign;