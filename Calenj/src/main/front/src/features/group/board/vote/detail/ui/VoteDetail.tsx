import React, {useState} from 'react';
import {timeOperation} from '../../../../../../shared/lib';
import {DetailTop} from '../../../notice/detail'
import { RowFlexBox } from '../../../../../../shared/ui/SharedStyled';
import {
    TransVoteContainer,
    VoteDetail_Container,
    VoteCondition_Item,
    VoteContent_Container,
    VoteConditionItem_Container,

} from './VoteDetailStyled'
import { Modal_Background } from '../../../../../../shared/ui/SharedStyled'
import {VoterView} from "./VoterView";
import {useVoteDetailData} from "../model/useVoteDetailData";
import {VoterViewButton} from "./VoterViewButton";
import {VoteDetailContent} from "./VoteDetailContent";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../entities/redux";
import {useComponentSize} from "../../../../../../shared/model";

export const VoteDetail:React.FC<{voteParam:string,isMessage:boolean}> = ({voteParam,isMessage}) => {
    const {voteItems, myVote, isAttend, voteEnd, loading, pickVoteItem ,data} =useVoteDetailData(voteParam);
    let userId = localStorage.getItem('userId')
    const [viewVoter, setViewVoter] = useState<boolean>(false); //투표인원 보기
    const { mode, clickState } = useSelector((state:RootState) => state.subNavigation.group_subNavState)
    const [contentRef, contentSize]= useComponentSize()

    const dynamicStyle: React.CSSProperties = {
        backgroundColor: isMessage ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
        position : isMessage ? 'relative':'fixed',
        justifyContent:isMessage ? 'left':'center',
        zIndex: isMessage? '0':'9998',
    };

    return(
        <Modal_Background style={dynamicStyle} ref={contentRef}>
            {(data &&loading)&&
               <VoteDetail_Container style={{minWidth: !isMessage ?'500px' : contentSize.width>=500 ? `500px` : contentSize.width>=400 ? `400px` : contentSize.width>=300 ? `300px` : '250px'  }}>
                <TransVoteContainer $end={voteEnd||false} style={{marginTop:isMessage ? "5px":'20px'}}>
                    <DetailTop state={"vote"} title={data.voteTitle} created={data.voteCreated} watcher={data.voteWatcher} isMessage={isMessage}/>
                    {data &&
                    <VoteContent_Container>
                        <VoteConditionItem_Container>
                            <VoteCondition_Item>{timeOperation(data.voteEndDate)}</VoteCondition_Item>
                            {(data.isMultiple || data.anonymous) &&
                                <RowFlexBox style={{height:'20px'}}>
                                    {data.anonymous &&<VoteCondition_Item style={{marginRight:'5px'}}>익명투표</VoteCondition_Item>}
                                    {(data.isMultiple && data.anonymous) && <VoteCondition_Item> • </VoteCondition_Item>}
                                    {data.isMultiple && <VoteCondition_Item>복수선택</VoteCondition_Item>}
                                </RowFlexBox>
                            }
                        </VoteConditionItem_Container>
                        {(viewVoter && voteItems) ?
                            <VoterView voted={voteItems}/>
                            :
                            <VoteDetailContent
                                voteParam={voteParam}
                                voteItems={voteItems}  //정렬된 값을 넘김
                                isAttend={isAttend}
                                voteEnd={voteEnd||false}
                                pickVote={pickVoteItem}
                                myVote={myVote as boolean[]}
                                isCreator={data.voteCreator === userId}
                            />
                        }
                        {(data.countVoter.length>0||voteEnd) &&
                            <VoterViewButton data={data} setViewVoter={setViewVoter} viewVoter={viewVoter}/>
                        }
                    </VoteContent_Container>
                }
                </TransVoteContainer>
               </VoteDetail_Container>
            }
    </Modal_Background>
    )
}



