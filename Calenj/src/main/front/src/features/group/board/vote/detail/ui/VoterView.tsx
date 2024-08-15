import {MyVoteIcon, ViewVoter_Container, VoteResult_Hr} from "./VoteDetailStyled";
import {MiniText, RowFlexBox} from "../../../../../../shared/ui/SharedStyled";
import React, {useEffect} from "react";
import {VoteChoiceResponse} from "../../../../../../entities/reactQuery";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../entities/redux";

interface VoterProps{
    voted : VoteChoiceResponse[],
}

export const VoterView:React.FC<VoterProps> = ({voted}) =>{
    const {userNameStorage} = useSelector((state:RootState)=> state.userNameStorage)
    const userId = localStorage.getItem('userId')


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
                            {voterUser === userId ?
                                <MyVoteIcon>
                                    나
                                </MyVoteIcon> :
                                <MyVoteIcon style={{backgroundColor:'transparent', width:'8px'}}/>
                            }
                            <div style={{marginInline:'3px', fontSize:'14px'}}>{userNameStorage[voterUser].userName}</div>
                        </RowFlexBox>
                    ))}
                </div>
            ))}
        </ViewVoter_Container>
    )
}