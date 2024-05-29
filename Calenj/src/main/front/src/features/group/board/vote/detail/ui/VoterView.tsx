import {MyVoteIcon, ViewVoter_Container, VoteResult_Hr} from "./VoteDetailStyled";
import {MiniText, RowFlexBox} from "../../../../../../shared/ui/SharedStyled";
import React from "react";
import {VoteChoiceResponse} from "../../../../../../entities/reactQuery";

interface VoterProps{
    isCreator :boolean,
    voted : VoteChoiceResponse[],
}

export const VoterView:React.FC<VoterProps> = ({voted,isCreator}) =>{

    return (
        <ViewVoter_Container>
            {voted.map((result,index)=>(
                <div key={result.voteItem} style={{marginBottom:'20px'}}>
                    {index!=0 && <VoteResult_Hr/> }
                    <MiniText style={{marginBottom:'10px'}}>
                        {result.voteItem} : {result.voter.length}명
                    </MiniText>
                    {result.voter.length===0 &&
                        <div style={{width:'100%', textAlign:'center',fontSize:'12px'}}>
                            투표한 멤버가 없습니다.
                        </div>
                    }
                    {result.voter.map((voterUser, index) => (
                        <RowFlexBox key={index}>
                            {isCreator &&
                                <MyVoteIcon>
                                    나
                                </MyVoteIcon>
                            }
                            <div style={{marginInline:'3px', fontSize:'14px'}}>{voterUser}</div>
                        </RowFlexBox>
                    ))}
                </div>
            ))}
        </ViewVoter_Container>
    )
}