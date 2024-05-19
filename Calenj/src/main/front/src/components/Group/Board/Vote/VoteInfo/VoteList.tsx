import React from 'react';
import {VoteList} from '../../../../../store/ReactQuery/queryInterface';
import {
    GroupVoteListContainer,
    GroupVoteListDivistion,
    GroupVoteListView_Li,
    GroupVoterListTitle,
    GroupVoteJoin_div,
} from '../../../../../style/Group/GroupVoteStyle';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale 추가
import {changeDateForm} from '../../../../../shared/lib';
import {MiniText, RowFlexBox} from "../../../../../style/FormStyle";

interface VoteListProps {
    voteList: VoteList[];
    endVoteList: VoteList[];
    checkMyVoter: (countVoter: string[]) => boolean;
    redirectDetail: (param: string) => void;
    subWidth: number;
    boardOption: any; // 적절한 타입으로 변경
}

const VoteListComponent: React.FC<VoteListProps> = ({
                                                        voteList,
                                                        endVoteList,
                                                        checkMyVoter,
                                                        redirectDetail,
                                                        subWidth,
                                                        boardOption
                                                    }) => {
    return (
        <GroupVoteListContainer>
            {voteList.length > 0 && !(boardOption.filter_setting.filterA.isCheck && boardOption.filter_setting.filterA.toggleState) &&
                <div>
                    <GroupVoteListDivistion>
                        진행중인 투표
                    </GroupVoteListDivistion>
                    {voteList.map((vote) => (
                        !(boardOption.filter_setting.filterB.isCheck && (boardOption.filter_setting.filterB.toggleState === checkMyVoter(vote.countVoter))) &&
                        (boardOption.search_keyWord === '' ?
                                <GroupVoteListView_Li key={vote.voteId} onClick={() => redirectDetail(vote.voteId)}>
                                    <div style={{width: "100%"}}>
                                        <GroupVoterListTitle $subScreenWidth={subWidth}>
                                            {vote.voteTitle}
                                        </GroupVoterListTitle>
                                        <RowFlexBox style={{width: "100%"}}>
                                            <GroupVoteJoin_div>
                                                {`${vote.countVoter.length}명 참여 `}
                                            </GroupVoteJoin_div>
                                            <GroupVoteJoin_div style={{marginInline: '5px'}}> · </GroupVoteJoin_div>
                                            <GroupVoteJoin_div $join={checkMyVoter(vote.countVoter)}>
                                                {` ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}
                                            </GroupVoteJoin_div>
                                        </RowFlexBox>
                                        <MiniText>{dayjs(changeDateForm(vote.voteEndDate)).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')} 마감</MiniText>
                                    </div>
                                </GroupVoteListView_Li> :
                                (vote.voteTitle.includes(boardOption.search_keyWord)) &&
                                <GroupVoteListView_Li key={vote.voteId} onClick={() => redirectDetail(vote.voteId)}>
                                    <div style={{width: "100%"}}>
                                        <GroupVoterListTitle $subScreenWidth={subWidth}>
                                            {vote.voteTitle}
                                        </GroupVoterListTitle>
                                        <RowFlexBox style={{width: "100%"}}>
                                            <GroupVoteJoin_div>
                                                {`${vote.countVoter.length}명 참여 `}
                                            </GroupVoteJoin_div>
                                            <GroupVoteJoin_div style={{marginInline: '5px'}}> · </GroupVoteJoin_div>
                                            <GroupVoteJoin_div $join={checkMyVoter(vote.countVoter)}>
                                                {` ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}
                                            </GroupVoteJoin_div>
                                        </RowFlexBox>
                                        <MiniText>{dayjs(changeDateForm(vote.voteEndDate)).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')} 마감</MiniText>
                                    </div>
                                </GroupVoteListView_Li>
                        )
                    ))}
                </div>
            }
            {endVoteList.length !== 0 && !(boardOption.filter_setting.filterA.isCheck && !boardOption.filter_setting.filterA.toggleState) &&
                <div>
                    <GroupVoteListDivistion>
                        종료된 투표
                    </GroupVoteListDivistion>
                    {endVoteList.map((vote) => (
                        !(boardOption.filter_setting.filterB.isCheck && (boardOption.filter_setting.filterB.toggleState === checkMyVoter(vote.countVoter))) &&
                        (boardOption.search_keyWord === '' ?
                                <GroupVoteListView_Li key={vote.voteId} onClick={() => redirectDetail(vote.voteId)}>
                                    <RowFlexBox>
                                        <div>
                                            {vote.voteTitle}
                                            <RowFlexBox>
                                                <GroupVoteJoin_div>
                                                    {`${vote.countVoter.length}명 참여 `}
                                                </GroupVoteJoin_div>
                                                <GroupVoteJoin_div style={{marginInline: '5px'}}> · </GroupVoteJoin_div>
                                                <GroupVoteJoin_div $join={checkMyVoter(vote.countVoter)}>
                                                    {` ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}
                                                </GroupVoteJoin_div>
                                            </RowFlexBox>
                                            <MiniText>{dayjs(changeDateForm(vote.voteEndDate)).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')} 마감</MiniText>
                                        </div>
                                    </RowFlexBox>
                                </GroupVoteListView_Li> :
                                (vote.voteTitle.includes(boardOption.search_keyWord)) &&
                                <GroupVoteListView_Li key={vote.voteId} onClick={() => redirectDetail(vote.voteId)}>
                                    <RowFlexBox>
                                        <div>
                                            {vote.voteTitle}
                                            <RowFlexBox>
                                                <GroupVoteJoin_div>
                                                    {`${vote.countVoter.length}명 참여 `}
                                                </GroupVoteJoin_div>
                                                <GroupVoteJoin_div style={{marginInline: '5px'}}> · </GroupVoteJoin_div>
                                                <GroupVoteJoin_div $join={checkMyVoter(vote.countVoter)}>
                                                    {` ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}
                                                </GroupVoteJoin_div>
                                            </RowFlexBox>
                                            <MiniText>{dayjs(changeDateForm(vote.voteEndDate)).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')} 마감</MiniText>
                                        </div>
                                    </RowFlexBox>
                                </GroupVoteListView_Li>
                        )
                    ))}
                </div>
            }
        </GroupVoteListContainer>
    );
};

export default VoteListComponent;
