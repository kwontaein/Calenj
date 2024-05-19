import React, {useEffect, useState} from 'react';
import {useFetchVoteList} from "../../../../../store/ReactQuery/queryManagement";
import VoteListComponent from './VoteList';
import MakeVote from '../MakeVote/MakeVote';
import VoteDetail from '../VoteDetail/VoteDetail';
import {changeDateForm} from '../../../../../shared/lib';
import {
    GroupVoteList_Container
} from '../../../../../style/Group/GroupVoteStyle';
import {
    BoardOptionState,
    DispatchBoardOptionProps,
    mapDispatchToBoardOptionProps,
    mapStateToBoardOptionProps
} from "../../../../../store/slice/BoardOptionSlice";
import {connect} from 'react-redux';
import {VoteList} from "../../../../../store/ReactQuery/queryInterface";
import deadlineFilter from "./deadLineFilter";

interface SubScreenProps {
    groupId: string,
    subWidth: number,
}

type VoteProps = SubScreenProps & BoardOptionState & DispatchBoardOptionProps;

const Vote: React.FC<VoteProps> = ({groupId, subWidth, boardOption, updateClickState, updateBoardParam}) => {
    const [makeVote, setMakeVote] = useState(false);
    const [voteList, setVoteList] = useState<VoteList[]>([]);
    const [endVoteList, setEndVoteList] = useState<VoteList[]>([]);

    const voteListState = useFetchVoteList(groupId);

    useEffect(() => {
        voteListState.refetch();
    }, []);

    useEffect(() => {
        if (boardOption.clickState === "add") {
            setMakeVote(true);
        }
    }, [boardOption.clickState]);

    const closeModal = () => {
        setMakeVote(false);
        updateClickState({clickState: ''});
    };

    useEffect(() => {
        if (voteListState.data) {
            voteListState.refetch();
            setVoteList(deadlineFilter(voteListState.data, false)); // filter()=>진행중인 투표
            setEndVoteList(deadlineFilter(voteListState.data, true)); // filter()=>마감된 투표
        }
    }, [voteListState.data]);

    useEffect(() => {
        if (boardOption.voteParam === "") {
            voteListState.refetch();
        }
    }, [boardOption.voteParam]);

    const checkMyVoter = (countVoter: string[]): boolean => {
        const userId = localStorage.getItem('userId') || '';
        return countVoter.includes(userId);
    };

    const redirectDetail = (param: string) => {
        updateBoardParam({voteParam: param});
    };

    return (
        <GroupVoteList_Container>
            {boardOption.voteParam !== '' && <VoteDetail voteId={boardOption.voteParam}/>}
            {makeVote && <MakeVote onClose={closeModal} groupId={groupId} queryState={voteListState}/>}
            {voteListState.isLoading && <div>Loading...</div>}
            {voteListState.data &&
                <VoteListComponent
                    voteList={voteList}
                    endVoteList={endVoteList}
                    checkMyVoter={checkMyVoter}
                    redirectDetail={redirectDetail}
                    subWidth={subWidth}
                    boardOption={boardOption}
                />
            }
        </GroupVoteList_Container>
    );
};

export default connect(mapStateToBoardOptionProps, mapDispatchToBoardOptionProps)(Vote);
