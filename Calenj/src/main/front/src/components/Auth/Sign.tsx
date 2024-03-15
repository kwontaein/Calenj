import React, {useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {stateFilter} from '../../stateFunc/filter'

const Sign: React.FC = () => {


    interface MyData {
        userEmail: string;
        userPassword: string;
    }

    const [data, setData] = useState<MyData>({
        userEmail: '',
        userPassword: '',
    });


    const SignHandeler = (key: string, event: string): void => {
        setData((prevState: MyData) => {
            return {...prevState, [key]: event}
        })
    };


    const login = (): void => {
        console.log(data);
        axios.post('/api/login', data)
            .then((response: AxiosResponse<Object>) => document.location.replace("/"))
            .catch(error => {
                stateFilter(error.response.data)
            })
    };


    // git 연동 테스트3
    return (
        <div>
            <div>id: <input onChange={(event) => {
                SignHandeler("userEmail", event.target.value)
            }}></input></div>
            <div>pw: <input type="password" onChange={(event) => {
                SignHandeler("userPassword", event.target.value)
            }}></input></div>

            <button onClick={login}>로그인</button>

        </div>
    );

}
export default Sign;