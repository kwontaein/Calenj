// import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useQuery, useMutation, useQueryClient, UseQueryResult} from '@tanstack/react-query';
import { useEffect, useState } from 'react';


export const QUERY_COOKIE_KEY: string = 'cookie';



const SignState: React.FC = () => {

    const queryClient = useQueryClient();

    const logout = async (): Promise<boolean> => {
        const resopnse = await axios.post('/api/logout');
        console.log("로그아웃");
        document.location.replace("/");
        return resopnse.data;
    };

    //query Mutation 을 통한 refetch 수행 => invalidatae 
    const mutation = useMutation({
        mutationFn: logout,
        onSettled: async () => {
            return await queryClient.invalidateQueries({
                queryKey: [QUERY_COOKIE_KEY],
            });
        },
    }); 
    


    //api를 통하여 쿠키를 post하여 boolean값을 return 받는다.
    //accessToken 만료 시 refreshToken 체크 후 재발급, 모든 토큰 만료 시 재로그인 필요  
    const checkCookie = async (): Promise<boolean> => {
        const response = await axios.post('/api/postCookie');
        console.log(`cookie값 ${response.data}`);
        return response.data;
    }


    //v5이후로 인자를 객체 형태로 전달해야함
    const logState = useQuery<boolean, Error>({
        queryKey: [QUERY_COOKIE_KEY],
        queryFn: checkCookie, //HTTP 요청함수 (Promise를 반환하는 함수)
    });



    // useQuery를 사용하여 쿠키를 체크하기보단 setInterval을 사용하여 하는 것이 좋음
    // useQuery는 실시간 데이터 갱신(위치, 그래프 등)에 더욱 적합하다함


    return (
        <div>
            {logState.data === true ?
                <button onClick={() => mutation.mutate()}>로그아웃</button>
                : <div>
                    <Link to="/sign" style={{textDecoration: "none"}}>
                        <button>로그인</button>
                    </Link>
                    <Link to="/signup" style={{textDecoration: "none"}}>
                        <button>회원가입</button>
                    </Link>
                </div>}
        </div>
    );

}
export default SignState;