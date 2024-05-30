import 'dayjs/locale/ko'; // 한국어 locale 추가
import {CreateVote} from "../../create";
import {useFetchVoteList} from "../../../../../../entities/reactQuery";

import {
    GroupVoteList_Container,
    GroupVoteListContainer,
    GroupVoteListDivision,
} from "./VoteStyled";
import {useSelector} from 'react-redux'
import {VoteDetail} from "../../detail";
import {RootState} from "../../../../../../entities/redux";
import VoteListItems from "./VoteListItems";
import {useVoteList} from "../model/useVoteList";
import {checkMyVoter} from "../model/checkMyVoter";


interface SubScreenProps {
    subWidth:number,
}


export const Vote: React.FC<SubScreenProps> = ({subWidth}) => {
    const [voteList,endVoteList] = useVoteList();
    const boardOption = useSelector((state:RootState) => state.boardOption)
    const { param } = useSelector((state:RootState) => state.subNavigateInfo)
    const voteListState = useFetchVoteList(param)


    return (
        <GroupVoteList_Container>
            {boardOption.voteParam!=='' &&  <VoteDetail/>}
            {boardOption.clickState ==="add" && <CreateVote/>}
            {voteListState.isLoading && <div>Loading...</div>}
            {voteListState.data &&
                <GroupVoteListContainer>
                    {(voteList.length > 0 && !(boardOption.filter_setting.filterA.isChecked && boardOption.filter_setting.filterA.toggleState)) &&
                        <div>
                            <GroupVoteListDivision>
                                진행중인 투표
                            </GroupVoteListDivision>
                            {voteList.map((vote) => (
                                //참여 미참여 여부
                                (!(boardOption.filter_setting.filterB.isChecked && (boardOption.filter_setting.filterB.toggleState === checkMyVoter(vote.countVoter)))&&
                                    (boardOption.search_keyWord==='' ?
                                        <VoteListItems
                                            key={vote.voteId}
                                            vote={vote}
                                            subWidth={subWidth}
                                            checkMyVoter={checkMyVoter}
                                        />
                                   : (vote.voteTitle.includes(boardOption.search_keyWord)) &&
                                        <VoteListItems
                                            key={vote.voteId}
                                            vote={vote}
                                            subWidth={subWidth}
                                            checkMyVoter={checkMyVoter}
                                        />
                                    )
                                )
                            ))}
                        </div>
                    }
                    {(endVoteList.length !== 0 && !(boardOption.filter_setting.filterA.isChecked && !boardOption.filter_setting.filterA.toggleState))&&
                        <div>
                            <GroupVoteListDivision>
                                종료된 투표
                            </GroupVoteListDivision>
                            {endVoteList.map((vote) => (
                                //참여 미참여 여부
                                (!(boardOption.filter_setting.filterB.isChecked && (boardOption.filter_setting.filterB.toggleState === checkMyVoter(vote.countVoter)))&&
                                    (boardOption.search_keyWord==='' ?
                                        <VoteListItems
                                            key={vote.voteId}
                                            vote={vote}
                                            subWidth={subWidth}
                                            checkMyVoter={checkMyVoter}
                                        />
                                    : (vote.voteTitle.includes(boardOption.search_keyWord)) &&
                                        <VoteListItems
                                            key={vote.voteId}
                                            vote={vote}
                                            subWidth={subWidth}
                                            checkMyVoter={checkMyVoter}
                                        />
                                    ))
                            ))}
                    </div>
                    }
                </GroupVoteListContainer>
            }

            </GroupVoteList_Container>
        )
}
