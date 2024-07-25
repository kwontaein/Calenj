import {GroupVoteJoin_div, GroupVoteListView_Li, GroupVoterListTitle} from "./VoteListItemsStyled";
import {VoteList} from "../../../../../../entities/reactQuery";
import {MiniText, RowFlexBox} from "../../../../../../shared/ui/SharedStyled";
import dayjs from "dayjs";
import {changeDateForm} from "../../../../../../shared/lib";
import {useDispatch} from "react-redux";
import {updateBoardParam} from "../../../../../../entities/redux/model/slice/BoardOptionSlice";

interface VoteItemProps {
    vote: VoteList;
    checkMyVoter: (countVoter: string[]) => boolean;
}

const VoteListItems: React.FC<VoteItemProps> = ({ vote, checkMyVoter }) => {
    const dispatch = useDispatch();

    return (
        <GroupVoteListView_Li key={vote.voteId} onClick={() => dispatch(updateBoardParam({voteParam:vote.voteId}))}>
            <div>
                <GroupVoterListTitle>{vote.voteTitle}</GroupVoterListTitle>
                <RowFlexBox style={{ width: '100%' }}>
                    <GroupVoteJoin_div>{`${vote.countVoter.length}명 참여 `}</GroupVoteJoin_div>
                    <GroupVoteJoin_div style={{ marginInline: '5px' }}> · </GroupVoteJoin_div>
                    <GroupVoteJoin_div $join={checkMyVoter(vote.countVoter)}>
                        {` ${checkMyVoter(vote.countVoter) ? '참여완료' : '미참여'}`}
                    </GroupVoteJoin_div>
                </RowFlexBox>
                <MiniText>
                    {dayjs(changeDateForm(vote.voteEndDate)).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')} 마감
                </MiniText>
            </div>
        </GroupVoteListView_Li>
    );
};

export default VoteListItems;