import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../entities/redux";
import {useFetchVoteDetail} from "../../../../../../entities/reactQuery";
import {useVoteContent} from "../model/useVoteContent";
import {
    CurrentVotePersentLine,
    CurrentVotePersentLine_BG,
    MyPickCheck_div, MyPickItem_div,
    TrasformButton, Vote_CheckBox,
    VoteContentList_Container,
    VoteDetailItem_Container,
    VoteItem_Label
} from "./VoteDetailStyled";
import {MiniText, RowFlexBox} from "../../../../../../shared/ui/SharedStyled";
import {VoteDetailProps} from "../model/types";

export const VoteDetailContent:React.FC<VoteDetailProps> =({voteItems, isAttend, myVote, voteEnd, pickVote,isCreator, voteParam})=>{
    const {data} = useFetchVoteDetail(voteParam);
    const {voteComplete, updateVote, earlyVoteEnd, checkVoteBefore} = useVoteContent(voteParam,isAttend, myVote)

    return(
        data &&
        <VoteDetailItem_Container>
            <VoteContentList_Container>
                {voteItems?.map((item,index) => (
                    <div  key={item.voteIndex}>
                        <RowFlexBox style={{width:'100%'}}>
                            <VoteItem_Label>
                                {(voteComplete && isAttend)||voteEnd ?
                                    <MyPickCheck_div $isPick={myVote[index]}/>
                                    :
                                    <Vote_CheckBox type='checkbox'
                                                   name='voterList'
                                                   value={index}
                                                   checked={myVote[index]}
                                                   onChange={(e:React.ChangeEvent<HTMLInputElement>)=>pickVote(e, data.isMultiple)}/> }

                                <MyPickItem_div $isPick={myVote[index]}>{item.voteItem}</MyPickItem_div>
                                {(voteComplete||voteEnd) &&<MiniText style={{marginLeft:'auto'}}>{(item.voter.length>0||voteEnd)? `${item.voter.length}명`:''}</MiniText>}
                            </VoteItem_Label>
                        </RowFlexBox>
                        {(voteComplete||voteEnd) &&
                            <CurrentVotePersentLine_BG>
                                <CurrentVotePersentLine $persent={ (item.voter.length / data.countVoter.length)||0 }/>
                            </CurrentVotePersentLine_BG>}
                    </div>

                ))}
            </VoteContentList_Container>

            {!voteEnd &&
                <RowFlexBox>
                    <TrasformButton $isCreator={isCreator&&(data.countVoter.length>0)} $ableClick={checkVoteBefore()} onClick={updateVote}>
                        {isAttend&&voteComplete ? '다시 투표하기':'투표 하기'}
                    </TrasformButton>
                    {isCreator && data.countVoter.length>0 &&
                        <TrasformButton $isCreator={isCreator}
                                        $ableClick={(data.countVoter.length>0)}
                                        style={{marginLeft:'1vw'}}
                                        onClick={earlyVoteEnd}>
                            투표 종료
                        </TrasformButton>}
                </RowFlexBox>
            }
        </VoteDetailItem_Container>
    )
}