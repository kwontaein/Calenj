import React, { useEffect, useRef} from 'react';
import {useLoginHandler,requestLoginApi}from '../../../../features/authentication/login';

export const LoginFormPages: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [signHandler, data]=useLoginHandler();

    //페이지 로딩 시 자동으로 id input에 focus
    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    return (
        <div>
            <form onSubmit={(e:React.FormEvent<HTMLFormElement>)=> {
                requestLoginApi(e, data)
            }}>
                <div>id: <input ref={inputRef} onChange={(event) => {
                    signHandler("userEmail", event.target.value)
                }}></input></div>
                <div>pw: <input type="password" onChange={(event) => {
                    signHandler("userPassword", event.target.value)
                }}></input></div>

                <button type="submit">로그인</button>
            </form>
        </div>
    );

}
