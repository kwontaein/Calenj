import React, {useState,useEffect,useRef} from 'react';
import axios, {AxiosResponse} from 'axios';
import {stateFilter} from '../../stateFunc/actionFun'

const Sign: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);

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



    const login = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log(data);
        axios.post('/api/login', data)
            .then((response: AxiosResponse<Object>) => {
                document.location.replace("/");
            })
            .catch(error => {
                stateFilter(error.response.data)
            })
    };


    //페이지 로딩 시 자동으로 id input에 focus
    useEffect(()=>{
        inputRef.current?.focus();
    },[])

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