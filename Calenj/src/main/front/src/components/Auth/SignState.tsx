// import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import {useQuery, useMutation, useQueryClient, UseQueryResult} from '@tanstack/react-query';
import {group} from 'console';
import {connect} from "react-redux";
import {sagaMutation} from '../../store/store'

export const QUERY_COOKIE_KEY: string = 'cookie';
import {StompData, mapStateToStompProps} from '../../store/module/StompReducer';
import {GlobalStyles, SIGN_STATE_BUTTON, SIGN_STATE_FORM, SIGN_STATE_TEXT} from "../../style/FormStyle";


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
        <SIGN_STATE_FORM>
            <SIGN_STATE_TEXT>{localStorage.getItem(`userId`)}</SIGN_STATE_TEXT>
            {stomp.isOnline ?
                <SIGN_STATE_BUTTON onClick={() => logout()}>로그아웃</SIGN_STATE_BUTTON>
                : <div>
                    <Link to="/sign" style={{textDecoration: "none"}}>
                        <SIGN_STATE_BUTTON>로그인</SIGN_STATE_BUTTON>
                    </Link>
                    <Link to="/signup" style={{textDecoration: "none"}}>
                        <SIGN_STATE_BUTTON>회원가입</SIGN_STATE_BUTTON>
                    </Link>
                </div>}
        </SIGN_STATE_FORM>
    );

}

export default connect(mapStateToStompProps, null)(SignState);