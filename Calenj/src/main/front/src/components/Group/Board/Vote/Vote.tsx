import {useEffect, useState} from "react";
import {stateFilter, changeDateForm, AHMFormat} from '../../../../stateFunc/actionFun';
import {FullScreen_div, ListView, MiniText, RowFlexBox} from '../../../../style/FormStyle'
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale 추가
import MakeVote from "./MakeVote";
import {VoteList} from '../../../../store/ReactQuery/queryInterface'
import {useFetchVoteList} from "../../../../store/ReactQuery/queryManagement";

import {
    GroupVoteList_Container,
    GroupVoteListContainer,
    GroupVoteListDivistion,
    GroupVoteListView_Li, GroupVoterListTitle
} from "../../../../style/VoteStyle";
import {
    BoardOptionState,
    DispatchBoardOptionProps,
    mapDispatchToBoardOptionProps,
    mapStateToBoardOptionProps
} from "../../../../store/slice/BoardOptionSlice";

import {connect} from 'react-redux'


interface SubScreenProps {
    groupId: string,
    member: number,
    subWidth:number,
}

type VoteProps = SubScreenProps & BoardOptionState & DispatchBoardOptionProps

const Vote: React.FC<VoteProps> = ({member, groupId,subWidth,boardOption,updateClickState}) => {
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

    //필터 적용 시
    useEffect(() => {
        console.log()
    }, [boardOption.filter_setting]);

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




    function deadlineFilter(list: VoteList[], end: boolean): VoteList[] {
        let nowDate = new Date();
        const newList = list.filter((li) => {
            let endDate = changeDateForm(li.voteEndDate)//Date형식으로
            if (end) { //end :ture => 마감된 거 찾기
                return endDate < nowDate;
            } else {
                return endDate > nowDate;
            }
        })

        return newList;
    }

    const checkMyVoter = (countVoter: string[]): boolean => {
        const userId = localStorage.getItem('userId')||''
        return countVoter.includes(userId);
    }
    return (
        <GroupVoteList_Container>
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
                                          onClick={() =>{}}>
                                    <div style={{width:"100%"}}>
                                        <GroupVoterListTitle $subScreenWidth={subWidth}>
                                            {vote.voteTitle}
                                        </GroupVoterListTitle>
                                        <RowFlexBox style={{width:"100%"}}>
                                            <MiniText>{`${vote.countVoter.length}명 참여 `}</MiniText>
                                            <MiniText style={{
                                                marginLeft: '3px',
                                                color: checkMyVoter(vote.countVoter) ? '#0070E8' : ''
                                            }}>{`· ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}</MiniText>
                                        </RowFlexBox>
                                        <MiniText>{dayjs(changeDateForm(vote.voteEndDate)).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')} 마감</MiniText>
                                    </div>
                                </GroupVoteListView_Li>
                                   : (vote.voteTitle.includes(boardOption.search_keyWord)) &&
                                    <GroupVoteListView_Li key={vote.voteId}
                                                          onClick={() =>{}}>
                                        <div style={{width:"100%"}}>
                                            <GroupVoterListTitle $subScreenWidth={subWidth}>
                                                {vote.voteTitle}
                                            </GroupVoterListTitle>
                                            <RowFlexBox style={{width:"100%"}}>
                                                <MiniText>{`${vote.countVoter.length}명 참여 `}</MiniText>
                                                <MiniText style={{
                                                    marginLeft: '3px',
                                                    color: checkMyVoter(vote.countVoter) ? '#0070E8' : ''
                                                }}>{`· ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}</MiniText>
                                            </RowFlexBox>
                                            <MiniText>{dayjs(changeDateForm(vote.voteEndDate)).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')} 마감</MiniText>
                                        </div>
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
                                              onClick={() => {}}>
                                        <RowFlexBox>
                                            <div>
                                                {vote.voteTitle}
                                                <RowFlexBox>
                                                    <MiniText>{`${vote.countVoter.length}명 참여 `}</MiniText>
                                                    <MiniText
                                                        style={{marginLeft: '3px'}}>{`· ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}</MiniText>
                                                </RowFlexBox>
                                                <MiniText>{AHMFormat(changeDateForm(vote.voteEndDate))} 마감</MiniText>
                                            </div>
                                        </RowFlexBox>
                                </GroupVoteListView_Li>
                                : (vote.voteTitle.includes(boardOption.search_keyWord)) &&
                                <GroupVoteListView_Li key={vote.voteId}
                                           onClick={() => {}}>
                                        <RowFlexBox>
                                            <div>
                                                {vote.voteTitle}
                                                <RowFlexBox>
                                                    <MiniText>{`${vote.countVoter.length}명 참여 `}</MiniText>
                                                    <MiniText
                                                        style={{marginLeft: '3px'}}>{`· ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}</MiniText>
                                                </RowFlexBox>
                                                <MiniText>{AHMFormat(changeDateForm(vote.voteEndDate))} 마감</MiniText>
                                            </div>
                                        </RowFlexBox>
                                    </GroupVoteListView_Li>
                                    )
                                )
                            ))}
                        </div>
                        }
                    </GroupVoteListContainer>
                }
            </GroupVoteList_Container>
        )
}
export default connect(mapStateToBoardOptionProps,mapDispatchToBoardOptionProps) (Vote);