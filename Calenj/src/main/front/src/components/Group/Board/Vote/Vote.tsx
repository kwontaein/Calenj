import {useEffect, useState} from "react";
import {AHMFormat, changeDateForm} from '../../../../shared/lib';
import {MiniText, RowFlexBox} from '../../../../style/FormStyle'
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale 추가
import MakeVote from "./MakeVote";
import {useFetchVoteList, VoteList} from "../../../../entities/ReactQuery";

import {
    GroupVoteJoin_div,
    GroupVoteList_Container,
    GroupVoteListContainer,
    GroupVoteListDivistion,
    GroupVoteListView_Li,
    GroupVoterListTitle
} from "../../../../style/Group/GroupVoteStyle";
import {
    BoardOptionState,
    DispatchBoardOptionProps,
    mapDispatchToBoardOptionProps,
    mapStateToBoardOptionProps
} from "../../../../store/slice/BoardOptionSlice";
import {connect} from 'react-redux'
import VoteDetail from "./VoteDetail";


interface SubScreenProps {
    groupId: string,
    subWidth:number,
}

type VoteProps = SubScreenProps & BoardOptionState & DispatchBoardOptionProps

const Vote: React.FC<VoteProps> = ({ groupId,subWidth,boardOption,updateClickState,updateBoardParam}) => {
    const [makeVote, setMakeVote] = useState(false);
    const [voteList, setVoteList] = useState<VoteList[]>([]);
    const [endVoteList, setEndVoteList] = useState<VoteList[]>([]);

    const voteListState = useFetchVoteList(groupId)

    useEffect(() => {
        voteListState.refetch();
    }, []);

    useEffect(() => {
        if(boardOption.clickState ==="add"){
            setMakeVote(true);
        }
    }, [boardOption.clickState]);

    const closeModal = () => {
        setMakeVote(false);
        updateClickState({clickState:''});
    };

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
        if(boardOption.voteParam===""){
            voteListState.refetch()
        }
    }, [boardOption.voteParam]);


    function deadlineFilter(list: VoteList[], end: boolean): VoteList[] {
        let nowDate = new Date();
        return list.filter((li) => {
            let endDate = changeDateForm(li.voteEndDate)//Date형식으로
            if (end) { //end :ture => 마감된 거 찾기
                return endDate < nowDate;
            } else {
                return endDate > nowDate;
            }
        });
    }

    const checkMyVoter = (countVoter: string[]): boolean => {
        const userId = localStorage.getItem('userId')||''
        return countVoter.includes(userId);
    }

    const redirectDetail = (param:string) =>{
        updateBoardParam({voteParam:param});
    }

    return (
        <GroupVoteList_Container>
            {boardOption.voteParam!=='' &&  <VoteDetail voteId={boardOption.voteParam}/>}
            {makeVote && <MakeVote onClose={closeModal} groupId={groupId} queryState={voteListState}/>}
            {voteListState.isLoading && <div>Loading...</div>}
            {voteListState.data &&
                <GroupVoteListContainer>
                    {(voteList.length > 0 && !(boardOption.filter_setting.filterA.isCheck && boardOption.filter_setting.filterA.toggleState)) &&
                        <div>
                            <GroupVoteListDivistion>
                                진행중인 투표
                            </GroupVoteListDivistion>
                            {voteList.map((vote) => (
                                ( !(boardOption.filter_setting.filterB.isCheck && (boardOption.filter_setting.filterB.toggleState === checkMyVoter(vote.countVoter)))&&
                                    (boardOption.search_keyWord==='' ?
                                    <GroupVoteListView_Li key={vote.voteId}
                                          onClick={() =>{redirectDetail(vote.voteId)}}>
                                        <GroupVoterListTitle $subScreenWidth={subWidth}>
                                            {vote.voteTitle}
                                        </GroupVoterListTitle>
                                        <RowFlexBox style={{width:"100%"}}>
                                            <GroupVoteJoin_div>
                                                {`${vote.countVoter.length}명 참여 `}
                                            </GroupVoteJoin_div>
                                            <GroupVoteJoin_div style={{marginInline:'5px'}}> · </GroupVoteJoin_div>
                                            <GroupVoteJoin_div $join={checkMyVoter(vote.countVoter)}>
                                                {` ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}
                                            </GroupVoteJoin_div>
                                        </RowFlexBox>
                                        <MiniText>{dayjs(changeDateForm(vote.voteEndDate)).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')} 마감</MiniText>
                                    </GroupVoteListView_Li>
                                   : (vote.voteTitle.includes(boardOption.search_keyWord)) &&
                                    <GroupVoteListView_Li key={vote.voteId}
                                                          onClick={() =>{redirectDetail(vote.voteId)}}>
                                            <GroupVoterListTitle $subScreenWidth={subWidth}>
                                                {vote.voteTitle}
                                            </GroupVoterListTitle>
                                            <RowFlexBox style={{width:"100%"}}>
                                                <GroupVoteJoin_div>
                                                    {`${vote.countVoter.length}명 참여 `}
                                                </GroupVoteJoin_div>
                                                <GroupVoteJoin_div style={{marginInline:'5px'}}> · </GroupVoteJoin_div>
                                                <GroupVoteJoin_div $join={checkMyVoter(vote.countVoter)}>
                                                    {` ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}
                                                </GroupVoteJoin_div>
                                            </RowFlexBox>
                                            <MiniText>{dayjs(changeDateForm(vote.voteEndDate)).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')} 마감</MiniText>
                                    </GroupVoteListView_Li>)
                                )
                            ))}
                        </div>
                    }
                    {(endVoteList.length !== 0 && !(boardOption.filter_setting.filterA.isCheck && !boardOption.filter_setting.filterA.toggleState))&&
                        <div>
                            <GroupVoteListDivistion>
                                종료된 투표
                            </GroupVoteListDivistion>
                            {endVoteList.map((vote) => (
                                ( !(boardOption.filter_setting.filterB.isCheck && (boardOption.filter_setting.filterB.toggleState === checkMyVoter(vote.countVoter)))&&
                                    (boardOption.search_keyWord==='' ?
                                    <GroupVoteListView_Li key={vote.voteId}
                                              onClick={() =>{redirectDetail(vote.voteId)}}>
                                        <RowFlexBox>
                                                {vote.voteTitle}
                                                <RowFlexBox>
                                                    <GroupVoteJoin_div>
                                                        {`${vote.countVoter.length}명 참여 `}
                                                    </GroupVoteJoin_div>
                                                    <GroupVoteJoin_div style={{marginInline:'5px'}}> · </GroupVoteJoin_div>
                                                    <GroupVoteJoin_div $join={checkMyVoter(vote.countVoter)}>
                                                        {` ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}
                                                    </GroupVoteJoin_div>
                                                </RowFlexBox>
                                                <MiniText>{AHMFormat(changeDateForm(vote.voteEndDate))} 마감</MiniText>
                                        </RowFlexBox>
                                    </GroupVoteListView_Li>
                                    : (vote.voteTitle.includes(boardOption.search_keyWord)) &&
                                    <GroupVoteListView_Li key={vote.voteId}
                                           onClick={() =>{redirectDetail(vote.voteId)}}>
                                        <RowFlexBox>
                                                {vote.voteTitle}
                                                <RowFlexBox>
                                                    <GroupVoteJoin_div>
                                                        {`${vote.countVoter.length}명 참여 `}
                                                    </GroupVoteJoin_div>
                                                    <GroupVoteJoin_div style={{marginInline:'5px'}}> · </GroupVoteJoin_div>
                                                    <GroupVoteJoin_div $join={checkMyVoter(vote.countVoter)}>
                                                        {` ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}
                                                    </GroupVoteJoin_div>
                                                </RowFlexBox>
                                                <MiniText>{AHMFormat(changeDateForm(vote.voteEndDate))} 마감</MiniText>
                                        </RowFlexBox>
                                    </GroupVoteListView_Li>
                                    ))
                            ))}
                    </div>
                    }
                </GroupVoteListContainer>
            }

            </GroupVoteList_Container>
        )
}
export default connect(mapStateToBoardOptionProps,mapDispatchToBoardOptionProps) (Vote);