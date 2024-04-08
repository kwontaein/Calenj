// import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useQuery, useMutation, useQueryClient, UseQueryResult} from '@tanstack/react-query';
import {group} from 'console';
import {connect} from "react-redux";
import {sagaMutation} from '../../store/store'

export const QUERY_COOKIE_KEY: string = 'cookie';
import {StompData, mapStateToStompProps} from '../../store/module/StompReducer';


const SignState: React.FC<StompData> = ({stomp}) => {

    const queryClient = useQueryClient();

    const logout = async (): Promise<boolean> => {
        try {
            const response = await axios.post('/api/logout');
            console.log(response.data);
            document.location.replace('/')
            queryClient.clear();
            return response.data;
        } catch (error) {
            document.location.replace('/')
            return false;
        }
    };


    return (
        <div>
            {stomp.isOnline ?
                <button onClick={() => logout()}>로그아웃</button>
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

export default connect(mapStateToStompProps, null)(SignState);