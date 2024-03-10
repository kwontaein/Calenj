import { QueryClient, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState,useRef } from 'react'
import SignState,{QUERY_COOKIE_KEY} from "./components/Auth/SignState";
import GroupList from './components/Group/GroupList';


const Home:React.FC=()=>{
    const [isLoding,setLoding] = useState<boolean>(true);
    const queryClient = useQueryClient();
    const [cookie, setCookie] = useState<boolean>(false);
    const isLogin = useRef<boolean>();

    useEffect(()=>{
        

        setTimeout(()=>{
            const cookieState:boolean = queryClient.getQueryData([QUERY_COOKIE_KEY]) as boolean;
        
            let cookie = isLogin.current;
            cookie =cookieState;

            setCookie(cookie as boolean);
            setLoding(false);
            console.log(cookie)
        },500)
    },[])




    return(
        
        <div style={{display:"flex", flexDirection:"column"}} >
            <SignState/>
            <h1>여기는 초기 페이지임</h1>
            {!isLoding && 
            <div key={String(isLogin.current)}>
                {cookie &&<GroupList cookie={cookie}/>}
            </div>}
        </div>

    )
}
export default Home;