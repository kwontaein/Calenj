// import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useQuery , useMutation, useQueryClient} from '@tanstack/react-query';;


 const SignState:React.FC=()=>{

    const queryClient = useQueryClient();
    
    const QUERY_COOKIE_KEY:string = 'cookie';


    const logout = async():Promise<string> => {
        const resopnse = await axios.post('/api/logout');
        console.log("로그아웃");
        return resopnse.data;
    };

    //query Mutation 을 통한 refetch 수행 => invalidatae 
    const mutation = useMutation({
        mutationFn : logout,
        onSettled:async ()=>{
            return await queryClient.invalidateQueries({
                queryKey: [QUERY_COOKIE_KEY],
            });
        },
    });
    
    //api를 통하여 쿠키를 post하여 boolean값을 return 받는다. 
    const checkCookie = async ():Promise<boolean>=>{
        const response = await axios.post('/api/postCookie');
        console.log(`cookie정보 ${response.data}`);
        return response.data;
    } 


    //ev5이후로 인자를 객체 형태로 전달해야함
    const logState = useQuery<boolean,Error>({
        queryKey :[QUERY_COOKIE_KEY],
        queryFn : checkCookie //HTTP 요청함수 (Promise를 반환하는 함수)
    });





  

    return (
        <div>
            {logState.isLoading && '로딩중'}
            {logState.data ===true ?
            <button onClick={()=>mutation.mutate()}>로그아웃</button>
            :<div>
            <Link to="/sign" style={{ textDecoration: "none" }}><button>로그인</button></Link>
            <Link to="/signup" style={{textDecoration: "none"}}><button>회원가입</button></Link>
        </div>}
        </div>
    );
    
}
export default SignState;