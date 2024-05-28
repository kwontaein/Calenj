import React, {useState} from 'react';
import {timeOperation} from '../../../../../../shared/lib';
import DetailTop from '../../../../../../components/Group/Board/DetailTop'
import { RowFlexBox } from '../../../../../../style/FormStyle';
import {
    TransVoteContainer,
    VoteDetail_Container,
    VoteCondition_Item,
    VoteContent_Container,
    VoteConditionItem_Container,

} from './VoteDetailStyled'
import { Modal_Background } from '../../../../../../style/FormStyle'
import {VoterView} from "./VoterView";
import {useVoteDetailData} from "../model/useVoteDetailData";
import {VoterViewButton} from "./VoterViewButton";
import {VoteDetailContent} from "./VoteDetailContent";

export const VoteDetail:React.FC = () => {
    const {voteItems, myVote, isAttend, voteEnd, loading, pickVoteItem ,data} =useVoteDetailData();
    let userEmail = localStorage.getItem('userId')
    const [viewVoter, setViewVoter] = useState<boolean>(false); //투표인원 보기

    return(
        <Modal_Background>
            {(data &&loading)&&
               <VoteDetail_Container>
                <TransVoteContainer $end={voteEnd||false}>
                    <DetailTop state={"vote"} title={data.voteTitle} created={data.voteCreated} watcher={data.voteWatcher}/>
                    {data &&
                    <VoteContent_Container>
                        <VoteConditionItem_Container>
                            <VoteCondition_Item>{timeOperation(data.voteEndDate)}</VoteCondition_Item>
                            <RowFlexBox style={{height:'20px'}}>
                                {data.anonymous &&<VoteCondition_Item style={{marginRight:'5px'}}>익명투표</VoteCondition_Item>}
                                {(data.isMultiple && data.anonymous) && <VoteCondition_Item> • </VoteCondition_Item>}
                                {data.isMultiple && <VoteCondition_Item>복수선택</VoteCondition_Item>}
                            </RowFlexBox>
                        </VoteConditionItem_Container>
                        {(viewVoter && voteItems) ?
                            <VoterView voted={voteItems} isCreator={data.voteCreator === userEmail}/>
                            :
                            <VoteDetailContent
                                voteItems={voteItems}  //정렬된 값을 넘김
                                isAttend={isAttend}
                                voteEnd={voteEnd||false}
                                pickVote={pickVoteItem}
                                myVote={myVote as boolean[]}
                                isCreator={data.voteCreator === userEmail}
                            />
                        }
                        {(data.countVoter.length>0||voteEnd) &&
                            <VoterViewButton data={data} setViewVoter={setViewVoter}/>
                        }
                    </VoteContent_Container>
                }
                </TransVoteContainer>
               </VoteDetail_Container>
            }
    </Modal_Background>
    )
}



