import {useEffect, useState} from "react";
import {useFetchVoteList, VoteList} from "../../../../../../entities/reactQuery";
import { useSelector} from "react-redux";
import {RootState} from "../../../../../../entities/redux";
import {deadlineFilter} from "./deadLineFilter";

export const useVoteList = ():[VoteList[],VoteList[]] =>{
    const [voteList, setVoteList] = useState<VoteList[]>([]);
    const [endVoteList, setEndVoteList] = useState<VoteList[]>([]);

    const boardOption = useSelector((state:RootState) => state.boardOption)
    const { param } = useSelector((state:RootState) => state.group_subNavState)
    const voteListState = useFetchVoteList(param)

    useEffect(() => {
        voteListState.refetch();
    }, []);


    //데이터가 바뀌면 다시 세팅
    useEffect(() => {
        if (voteListState.data) {
            voteListState.refetch()
            setVoteList(deadlineFilter(voteListState.data, false))//filter()=>진행중인 투표
            setEndVoteList(deadlineFilter(voteListState.data, true))//filter()=>마감된 투표
        }
    }, [voteListState.data])

    //투표참여 이후에 바로 갱신
    useEffect(() => {
        if(boardOption.voteParam==="" && voteListState.data){
            voteListState.refetch()
        }
    }, [boardOption.voteParam]);


    return [voteList,endVoteList]
}