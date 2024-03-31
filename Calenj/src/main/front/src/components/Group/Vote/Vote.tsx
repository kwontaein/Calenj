import { useEffect, useLayoutEffect, useState } from "react";
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios ,{AxiosResponse, AxiosError}from 'axios';
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {stateFilter} from '../../../stateFunc/actionFun';
import MakeVote from "./MakeVote";
import {ListView, MiniText,RowFlexBox} from '../../../style/FormStyle'
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale 추가


export const QUERY_VOTE_LIST_KEY: string = 'voteList'


interface VoteList{
    voteId : string;
    voteCreater : string;
    voteTitle : string;
    voteItem : string[];
    voteCreated:string;
    voteEndDate:string;
    isMultiple:boolean;
    anonymous:boolean;
}

const Vote :React.FC=()=>{
    const[makeVote,setMakeVote] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const groupInfo = {...location.state};


    const queryClient = useQueryClient();
    
    const closeModal = () => {
        setMakeVote(false);
        voteListState.refetch();
    };

    //투표리스트 불러오기
    const getVoteList = async (): Promise<VoteList[]|null>=> {
        try{
            const response = await axios.post('/api/voteList',{groupId:groupInfo.groupId});
            console.log(response.data);
            return response.data
        }catch(error){
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if(axiosError.response?.data){
                stateFilter((axiosError.response.data) as string);
            }
            return null;
        }
    }

    const voteListState = useQuery<VoteList[]|null, Error>({
        queryKey: [QUERY_VOTE_LIST_KEY],
        queryFn: getVoteList, //HTTP 요청함수 (Promise를 반환하는 함수)
    });

    const redirectDetail = (voteId: string) => {
        navigate("/vote/detail", {state: {voteId: voteId}});
    }

    useEffect(()=>{
        return queryClient.removeQueries({queryKey: [QUERY_VOTE_LIST_KEY]});
    },[])

    const changeDateForm= (date:string)=>{
        let list = date.split(' ');
        let YYMMDD :number[]= list[0].split('.').map((yymmdd)=> Number(yymmdd));

        let hhmm:number[]= list[1].split(':').map((hm)=> Number(hm));


        const newDate = new Date(YYMMDD[0], YYMMDD[1],YYMMDD[2], hhmm[0], hhmm[1]);
        return dayjs(newDate).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')
    }
    return(
        <div>
            <hr></hr>
            <h1>투표</h1>
            <button onClick={()=>setMakeVote(true)}>투표생성하기</button>
            {makeVote && <MakeVote onClose={closeModal} groupId={groupInfo.groupId}/>}

            {voteListState.data && 
                <div>
                <h2>Vote List</h2>
                <ul>
                    {voteListState.data.map((vote) => (
                        <ListView key={vote.voteId}
                        //onClick={() => redirectDetail(vote.voteId as string)}
                        >
                        <RowFlexBox>
                        <div style={{marginLeft:'-20px', marginRight:'20px', paddingTop:'2px',fontWeight:550, letterSpacing:'-2px'}}>Q .</div>
                        <div>
                            {vote.voteTitle}
                            <MiniText>{changeDateForm(vote.voteEndDate)} 마감</MiniText>
                        </div>
                        </RowFlexBox>
                        
                        </ListView>
                        
                    ))}
                </ul>
            </div>}
        </div>
    )
}
export default Vote