import {useEffect, useState} from "react";
import {stateFilter, changeDateForm, AHMFormat} from '../../../stateFunc/actionFun';
import {FullScreen_div, ListView, MiniText, RowFlexBox, TextColor2, TextColor3} from '../../../style/FormStyle'
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale 추가
import MakeVote from "./MakeVote";
import {VoteList} from '../../../store/ReactQuery/queryInterface'
import {useFetchVoteList} from "../../../store/ReactQuery/queryManagement";
import {
    GroupSubScreenList_HR,
    GroupSubScreenTop_Container,
    GroupSubScreenTopIcon_Container
} from "../../../style/Group/GroupSubScreenStyle";
import {
    GroupVoteList_Container,
    GroupVoteListContainer,
    GroupVoteListDivistion,
    GroupVoteListView_Li, GroupVoterListTitle
} from "../../../style/VoteStyle";

import {connect} from 'react-redux'


interface SubScreenProps {
    groupId: string,
    member: number,
    subWidth:number,
}


const Vote: React.FC<SubScreenProps> = ({member, groupId,subWidth}) => {
    const [makeVote, setMakeVote] = useState(false);
    const [voteList, setVoteList] = useState<VoteList[]>([]);
    const [endVoteList, setEndVoteList] = useState<VoteList[]>([]);
    // const location = useLocation();
    // const navigate = useNavigate();
    // const groupInfo = {...location.state};


    const closeModal = () => {
        setMakeVote(false);
    };



    const voteListState = useFetchVoteList(groupId)


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
        const userId = localStorage.getItem('userId')
        const isVoter = countVoter.includes(userId as string);
        return isVoter;
    }
    return (
        <GroupVoteList_Container>
            {makeVote && <MakeVote onClose={closeModal} groupId={groupId} queryState={voteListState}/>}
            {voteListState.isLoading && <div>Loading...</div>}
            {voteListState.data &&
                <GroupVoteListContainer>
                    {voteList.length > 0 &&
                        <div>
                            <GroupVoteListDivistion>
                                진행중인 투표
                            </GroupVoteListDivistion>
                            {voteList.map((vote) => (
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
                                                color: checkMyVoter(vote.countVoter) ? '#007bff' : ''
                                            }}>{`· ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}</MiniText>
                                        </RowFlexBox>
                                        <MiniText>{dayjs(changeDateForm(vote.voteEndDate)).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')} 마감</MiniText>
                                    </div>
                                </GroupVoteListView_Li>
                            ))}
                        </div>
                    }
                    {endVoteList.length !== 0 &&
                        <div>
                            <GroupVoteListDivistion>
                                종료된 투표
                            </GroupVoteListDivistion>
                            {endVoteList.map((vote) => (
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
                        ))}
                    </div>
                    }
                </GroupVoteListContainer>
            }
        </GroupVoteList_Container>
    )
}
export default Vote;