import {useEffect, useLayoutEffect, useState} from "react";
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {stateFilter, changeDateForm, AHMFormat} from '../../../stateFunc/actionFun';
import {ListView, MiniText, RowFlexBox} from '../../../style/FormStyle'
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale 추가
import MakeVote from "./MakeVote";
import {QUERY_VOTE_LIST_KEY} from "../../../store/ReactQuery/QueryKey";


interface VoteList {
    voteId: string;
    myId: string;
    countVoter: string[];
    voteCreater: string;
    voteTitle: string;
    voteCreated: string;
    voteEndDate: string;
}

interface GroupProps {
    member: number;
}

const Vote: React.FC<GroupProps> = ({member}) => {
    const [makeVote, setMakeVote] = useState(false);
    const [voteList, setVoteList] = useState<VoteList[]>([]);
    const [endVoteList, setEndVoteList] = useState<VoteList[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const groupInfo = {...location.state};


    const closeModal = () => {
        setMakeVote(false);
    };

    //투표리스트 불러오기
    const getVoteList = async (): Promise<VoteList[] | null> => {
        try {
            const response = await axios.post('/api/voteList', {groupId: groupInfo.groupId});

            return response.data
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if (axiosError.response?.data) {
                stateFilter((axiosError.response.data) as string);
            }
            return null;
        }
    }

    //현재 상태 저장
    const voteListState = useQuery<VoteList[] | null, Error>({
        queryKey: [QUERY_VOTE_LIST_KEY, groupInfo.groupId],
        queryFn: getVoteList, //HTTP 요청함수 (Promise를 반환하는 함수)
    });


    //데이터가 바뀌면 다시 세팅
    useEffect(() => {
        if (voteListState.data) {
            voteListState.refetch()
            setVoteList(deadlineFilter(voteListState.data, false))//filter()=>진행중인 투표
            setEndVoteList(deadlineFilter(voteListState.data, true))//filter()=>마감된 투표
        }
    }, [voteListState.data])


    const redirectDetail = (voteId: string, end: boolean) => {
        navigate("/vote/detail", {state: {voteId: voteId, member: member, end: end}});
    }


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
        <div>
            <h1>투표</h1>
            <button onClick={() => setMakeVote(true)} style={{marginBottom: '10px'}}>투표생성하기</button>
            {makeVote && <MakeVote onClose={closeModal} groupId={groupInfo.groupId} queryState={voteListState}/>}
            {voteListState.isLoading && <div>Loading...</div>}
            {voteListState.data &&
                <div>
                    {voteList.length > 0 &&
                        <MiniText style={{border: '0.5px solid #ccc', padding: '5px', marginBottom: '-17px'}}>진행중인
                            투표</MiniText>
                    }
                    <ul>
                        {voteList.map((vote) => (
                            <ListView key={vote.voteId}
                                      onClick={() => redirectDetail(vote.voteId as string, false)}
                            >
                                <RowFlexBox>
                                    <div style={{
                                        marginLeft: '-20px',
                                        marginRight: '20px',
                                        paddingTop: '2px',
                                        fontWeight: 550,
                                        letterSpacing: '-2px'
                                    }}>Q .
                                    </div>
                                    <div>
                                        {vote.voteTitle}
                                        <RowFlexBox>
                                            <MiniText>{`${vote.countVoter.length}명 참여 `}</MiniText>
                                            <MiniText style={{
                                                marginLeft: '3px',
                                                color: checkMyVoter(vote.countVoter) ? '#007bff' : ''
                                            }}>{`· ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}</MiniText>
                                        </RowFlexBox>
                                        <MiniText>{dayjs(changeDateForm(vote.voteEndDate)).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')} 마감</MiniText>
                                    </div>
                                </RowFlexBox>

                            </ListView>
                        ))}
                    </ul>
                    {endVoteList.length !== 0 &&
                        <MiniText style={{
                            border: '0.5px solid #ccc',
                            padding: '5px',
                            marginTop: '-17px',
                            marginBottom: '-17px'
                        }}>종료된 투표</MiniText>}

                    <ul>
                        {endVoteList.map((vote) => (
                            <ListView key={vote.voteId}
                                      onClick={() => redirectDetail(vote.voteId as string, true)}
                            >

                                <RowFlexBox>
                                    <div style={{
                                        marginLeft: '-20px',
                                        marginRight: '20px',
                                        paddingTop: '2px',
                                        fontWeight: 550,
                                        letterSpacing: '-2px'
                                    }}>Q .
                                    </div>
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

                            </ListView>
                        ))}
                    </ul>

                </div>}
        </div>
    )
}
export default Vote