import { useEffect, useLayoutEffect, useState } from "react";
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios ,{AxiosResponse, AxiosError}from 'axios';
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {stateFilter} from '../stateFunc/actionFun';
import MakeVote from "./MakeVote";


const Vote :React.FC=()=>{
    const[makeVote,setMakeVote] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const groupInfo = {...location.state};


    const queryClient = useQueryClient();
    
    const closeModal = () => {
        setMakeVote(false);
    };

    //vote의 경로설정을 위한 코드
    const redirectDetail = (noticeId: string) => {
        navigate("/vote/detail", {state: {noticeId: noticeId}});
    }

    return(
        <div>
            <hr></hr>
            <h1>투표</h1>
            <button onClick={()=>setMakeVote(true)}>투표생성하기</button>
            {makeVote && <MakeVote onClose={closeModal} groupId={'임시'}/>}
        </div>
    )
}
export default Vote