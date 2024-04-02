import {useEffect, useLayoutEffect, useState} from "react";
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {useLocation} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {stateFilter} from '../../../stateFunc/actionFun';
import MakeVote from "./MakeVote";
import {ListView, MiniText, RowFlexBox} from '../../../style/FormStyle'
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale 추가


export const QUERY_VOTE_LIST_KEY: string = 'voteList'


interface VoteList {
    voteId: string;
    voteCreater: string;
    voteTitle: string;
    voteCreated: string;
    voteEndDate: string;
}

const Vote: React.FC = () => {
    const [makeVote, setMakeVote] = useState(false);
    const [voteList, setVoteList] = useState<VoteList[]>([]);
    const [endVoteList, setEndVoteList] = useState<VoteList[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const groupInfo = {...location.state};


    const queryClient = useQueryClient();

    const closeModal = () => {
        setMakeVote(false);
        voteListState.refetch();
    };

    //투표리스트 불러오기
    const getVoteList = async (): Promise<VoteList[] | null> => {
        try {
            const response = await axios.post('/api/voteList', {groupId: groupInfo.groupId});

            setVoteList(deadlineFilter(response.data, false))//filter()=>진행중인 투표
            setEndVoteList(deadlineFilter(response.data, true))//filter()=>마감된 투표
            return response.data
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if (axiosError.response?.status) {
                console.log(axiosError.response.status);
                stateFilter((axiosError.response.status).toString());
            }
            return null;
        }
    }
    //현재 상태 저장
    const voteListState = useQuery<VoteList[] | null, Error>({
        queryKey: [QUERY_VOTE_LIST_KEY],
        queryFn: getVoteList, //HTTP 요청함수 (Promise를 반환하는 함수)
    });


    //종료 시 삭제
    useEffect(() => {
        return queryClient.removeQueries({queryKey: [QUERY_VOTE_LIST_KEY]});
    }, [])


    const redirectDetail = (voteId: string) => {
        navigate("/vote/detail", {state: {voteId: voteId}});
    }


    const changeDateForm = (date: string) => {
        let list = date.split(' ');
        let YYMMDD: number[] = list[0].split('.').map((yymmdd) => Number(yymmdd));

        let hhmm: number[] = list[1].split(':').map((hm) => Number(hm));
        const newDate = new Date(YYMMDD[0], YYMMDD[1] - 1, YYMMDD[2], hhmm[0], hhmm[1]);
        return newDate;
    }

    function deadlineFilter(list: VoteList[], end: boolean): VoteList[] {
        const newList = list.filter((li) => {
            let endDate = changeDateForm(li.voteEndDate)//Date형식으로
            let nowDate = new Date();
            if (end) { //end :ture => 마감된 거 찾기
                return endDate < nowDate;
            } else {
                return endDate > nowDate;
            }
        })

        return newList;

    }

    return (
        <div>
            <hr></hr>
            <h1>투표</h1>
            <button onClick={() => setMakeVote(true)}>투표생성하기</button>
            {makeVote && <MakeVote onClose={closeModal} groupId={groupInfo.groupId}/>}

            {voteListState.data &&
                <div>
                    {voteList.length > 0 &&
                        <MiniText style={{border: '0.5px solid #ccc', padding: '5px', marginBottom: '-17px'}}>진행중인
                            투표</MiniText>
                    }

                    <ul>
                        {voteList.map((vote) => (
                            <ListView key={vote.voteId}
                                      onClick={() => redirectDetail(vote.voteId as string)}
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
                                      onClick={() => redirectDetail(vote.voteId as string)}
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
                                        <MiniText>{dayjs(changeDateForm(vote.voteEndDate)).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')} 마감</MiniText>
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