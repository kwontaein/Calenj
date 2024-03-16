import React, {useState,useEffect,useRef} from 'react';
import axios, {AxiosResponse} from 'axios';
import {stateFilter} from '../../stateFunc/actionFun'
import {useForm, SubmitHandler, SubmitErrorHandler, FieldErrors} from 'react-hook-form';

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



    const login = (): void => {
        console.log(data);
        axios.post('/api/login', data)
            .then((response: AxiosResponse<Object>) => document.location.replace("/"))
            .catch(error => {
                stateFilter(error.response.data)
            })
    };


    //페이지 로딩 시 자동으로 id input에 focus
    useEffect(() => {
        if(inputRef.current!=null){
            inputRef.current.focus();
        }
    }, []);

    return (
        <div>
            <form> 
                <div>id: <input ref={inputRef} onChange={(event) => {
                    SignHandeler("userEmail", event.target.value)
                }}></input></div>
                <div>pw: <input type="password" onChange={(event) => {
                    SignHandeler("userPassword", event.target.value)
                }}></input></div>

                <button onClick={login}>로그인</button>
            </form>
        </div>
    );

}
export default Sign;