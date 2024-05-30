import {useSelector} from "react-redux";
import {RootState} from "../../../../../../entities/redux";
import React, {useEffect, useState} from "react";
import {useFetchVoteDetail, VoteChoiceResponse, VoteDetail} from "../../../../../../entities/reactQuery";
import {useQueryClient} from "@tanstack/react-query";
import {QUERY_VOTE_DETAIL_KEY} from "../../../../../../entities/reactQuery";
import {changeDateForm} from "../../../../../../shared/lib";
import {checkVoteEnd} from "../lib/checkVoteEnd";

interface ReturnDetail{
    voteItems:VoteChoiceResponse[]|null,
    myVote : boolean[],
    isAttend : boolean,
    voteEnd : boolean,
    loading : boolean,
    pickVoteItem : (e:React.ChangeEvent<HTMLInputElement>) =>void,
    data :  VoteDetail | null | undefined
}

export const useVoteDetailData = () =>{
    const {voteParam} = useSelector((state:RootState) => state.boardOption)
    const [voteItems, setVoteItems] = useState<VoteChoiceResponse[]|null>(null); //정렬된 각각의 항목 (N)
    const [myVote,setMyVote] = useState<boolean[]>(); //내가 투표한 항목순번에 true
    const [isAttend,setAttend] =useState<boolean>(false); //내가 투표한 전적이 있는지
    const [voteEnd,setVoteEnd] = useState<boolean>();//투표가 종료됐는지 체크
    const [loading,setLoading] =useState<boolean>(false);
    let userEmail = localStorage.getItem('userId')

    const {data} = useFetchVoteDetail(voteParam);
    const queryClient = useQueryClient()

    useEffect(() => {
        return () =>{
            queryClient.invalidateQueries({queryKey: [QUERY_VOTE_DETAIL_KEY]});
        }
    }, []);

    useEffect(()=>{
        if(!data) return
        beforeCheckVoter(data.voteChoiceResponse)
        setVoteEnd(checkVoteEnd(data.voteEndDate))
        setLoading(true);
    },[data])


    const beforeCheckVoter=(voteList:VoteChoiceResponse[])=>{
        let newList = voteList.sort((a,b)=> a.voteIndex-b.voteIndex)
        if (typeof userEmail === "string") {
            let userVoter = newList.map(item => item.voter.includes(userEmail));
            setMyVote(userVoter); // 각 항목별 내 투표결과
            setAttend(userVoter.includes(true)) //내가 투표한게 있는지 있으면 true
        }
        setVoteItems(newList) //각각의 항목
    }


    //보내기 전에 체크
    const pickVoteItem = (e:React.ChangeEvent<HTMLInputElement>)=>{
        let newVoter
        //checked상태 변화 > state 반영 > checked 반영
        if(!data || !myVote) return

        if(data.isMultiple){
            newVoter = [...myVote];
            newVoter[+e.target.value] = e.target.checked
        }else{
            newVoter =Array.from({length:myVote.length},(_,i)=>
                e.target.checked && i===+e.target.value
            )//check상태변화 true && index번호가 같으면
        }
        setMyVote(newVoter)
    }

    return { voteItems, myVote, isAttend, voteEnd, loading, pickVoteItem ,data}
}