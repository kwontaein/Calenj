import React, {useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {stateFilter} from '../../stateFunc/actionFun'
import {useForm, SubmitHandler, SubmitErrorHandler, FieldErrors} from 'react-hook-form';

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

    const {register, handleSubmit, formState: {errors}} = useForm<MyData>({
        mode: 'onTouched' //실시간 유효성 검사를 위한 설정
    });

     //성공 시
     const onValid: SubmitHandler<MyData> = (data: MyData): Promise<Object|void> => {
       
        window.location.replace("/");

        return  axios.post('/api/login', data)
        .then((response: AxiosResponse<Object>) => {
            response.data
        })
        .catch(error => {
            stateFilter(error.response.data)
        })
           
    };

    //실패 시
    const onInvalid: SubmitErrorHandler<MyData> = (errors: FieldErrors): void => {
        console.log(errors)
    }



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
            <form> 
                <div>id: <input onChange={(event) => {
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