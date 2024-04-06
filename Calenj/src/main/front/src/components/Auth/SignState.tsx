// import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useQuery, useMutation, useQueryClient, UseQueryResult} from '@tanstack/react-query';
import { group } from 'console';
import{ DispatchProps,mapDispatchToProps}  from '../../store/module/StompReducer';
import {connect} from "react-redux";
import {sagaMutation} from '../../store/store'

export const QUERY_COOKIE_KEY: string = 'cookie';



const SignState: React.FC<DispatchProps> = ({updateDestination}) => {

    const queryClient = useQueryClient();

    const logout = async (): Promise<boolean> => {
        try{
            const response = await axios.post('/api/logout');
            console.log(response.data);
            document.location.replace('/')
            queryClient.clear();
            return response.data;
        }catch(error){ 
            document.location.replace('/')
            return false;
        }
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
    
   

    interface SubScribe{
        groupId:number;
        friendId:number;
    }
    //api를 통하여 쿠키를 post하여 boolean값을 return 받는다.
    //accessToken 만료 시 refreshToken 체크 후 재발급, 모든 토큰 만료 시 재로그인 필요  
    const checkCookie = async (): Promise<boolean> => {
        const response = await axios.post('/api/postCookie');
        console.log(`cookie값 ${response.data}`);
        sagaMutation(response.data)//saga middleware 관리
        if(!response.data){
            sessionStorage.removeItem('userId')

        }else{
            axios.get(`/api/subscribeCheck`)
            .then((res)=>{
                let arr = res.data
                let friendArr = Array.from(arr.friendList,(value:SubScribe)=>{return value.friendId})
                let groupArr = Array.from(arr.groupList,(value:SubScribe)=>{return value.groupId;})
                let subScribe = subScribeFilter(friendArr,groupArr,arr.userId)
                updateDestination({destination:subScribe});
            })
        }
        return response.data;
    }

    function subScribeFilter(friendList:number[],groupList:number[],userId:string){
        let parmasList =[];
        parmasList.push([userId])
        parmasList.push([userId])
        parmasList.push(groupList)
        parmasList.push(friendList)
        return parmasList;
    }

    //v5이후로 인자를 객체 형태로 전달해야함
    const logState = useQuery<boolean, Error>({
        queryKey: [QUERY_COOKIE_KEY],
        queryFn: checkCookie, //HTTP 요청함수 (Promise를 반환하는 함수)
    });

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
                {sessionStorage.getItem(`userId`)}
        </div>
    );

}

export default connect(null,mapDispatchToProps)(SignState);