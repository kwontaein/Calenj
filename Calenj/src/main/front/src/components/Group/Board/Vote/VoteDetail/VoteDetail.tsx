import React, {useLayoutEffect, useRef, useState} from 'react';
import {getVoteDetail} from './model/VoteDetailApi';
import {pickVote} from './model/pickVote';
import DetailTop from '../../DetailTop';
import {MiniText, RowFlexBox} from '../../../../../style/FormStyle';
import {
    TransVoteContainer,
    VoteDetail_Container,
    ViewVoter_Container,
    VoteCondition_Item,
    VoteContent_Container,
    VoteConditionItem_Container,
    MyVoteIcon,
    VoteResult_Hr
} from '../../../../../style/Group/GroupVoteStyle';
import {Modal_Background} from '../../../../../style/FormStyle';
import VoteContent from "./VoteContent";
import {voteChoiceResponse, VoteDetails, VoteListProps} from "./types";
import {checkVoteEnd} from "./model/checkVoteEnd";
import {TimeOperation} from "../../../../../shared/lib";

const VoteDetail: React.FC<VoteListProps> = ({voteId}) => {
    const [detail, setDetail] = useState<VoteDetails | null>(null);
    const [voted, setVoted] = useState<voteChoiceResponse[] | null>(null);
    const [myVote, setMyVote] = useState<boolean[]>(); // 내가 투표한 항목순번에 true
    const [dbVoter, setDbMyVoter] = useState<boolean>(false);
    const [voteEnd, setVoteEnd] = useState<boolean>();
    const [viewVoter, setViewVoter] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const modalBackground = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        getVoteDetail(voteId, setDetail, setVoteEnd, setIsLoading, setVoted, setMyVote, setDbMyVoter);
    }, [voteId]);

    const viewVoterList = () => {
        setViewVoter(!viewVoter);
    };

    const checkCreater = () => {
        const userEmail = localStorage.getItem('userId');
        return detail?.voteCreater === userEmail;
    };

    return (
        <Modal_Background ref={modalBackground} onClick={e => {
        }}>
            {isLoading && detail && (
                <VoteDetail_Container>
                    <TransVoteContainer $end={voteEnd as boolean}>
                        <DetailTop state={"vote"} title={detail.voteTitle} created={detail.voteCreated}
                                   watcher={detail.voteWatcher}/>
                        {detail && (
                            <VoteContent_Container>
                                <VoteConditionItem_Container>
                                    <VoteCondition_Item>{TimeOperation(detail.voteEndDate)}</VoteCondition_Item>
                                    <RowFlexBox style={{height: '20px'}}>
                                        {detail.anonymous &&
                                            <VoteCondition_Item style={{marginRight: '5px'}}>익명투표</VoteCondition_Item>}
                                        {(detail.isMultiple && detail.anonymous) &&
                                            <VoteCondition_Item> • </VoteCondition_Item>}
                                        {detail.isMultiple && <VoteCondition_Item>복수선택</VoteCondition_Item>}
                                    </RowFlexBox>
                                </VoteConditionItem_Container>

                                <VoteContent
                                    voteId={voteId}
                                    detail={detail}
                                    voteChoiceResponse={voted} // 정렬된 값을 넘김
                                    participation={dbVoter}
                                    voteEnd={voteEnd as boolean}
                                    pickVote={(e: React.ChangeEvent<HTMLInputElement>, isMultiple: boolean) => pickVote(e, isMultiple, myVote, setMyVote)}
                                    myVote={myVote as boolean[]}
                                    setMyVote={setMyVote}
                                    refetchVoteDetail={() => getVoteDetail(voteId, setDetail, setVoteEnd, setIsLoading, setVoted, setMyVote, setDbMyVoter)}
                                    viewVoterList={viewVoterList}
                                />
                            </VoteContent_Container>
                        )}
                    </TransVoteContainer>
                    {viewVoter && voted && (
                        <ViewVoter_Container>
                            {voted.map((result, index) => (
                                <div key={result.voteItem} style={{marginBottom: '20px'}}>
                                    {index !== 0 && <VoteResult_Hr/>}
                                    <MiniText style={{marginBottom: '10px'}}>
                                        {result.voteItem} : {result.voter.length}명
                                    </MiniText>
                                    <div>
                                        {result.voter.length === 0 && (
                                            <div style={{width: '100%', textAlign: 'center', fontSize: '12px'}}>
                                                투표한 멤버가 없습니다.
                                            </div>
                                        )}
                                        {result.voter.map((voterUser, idx) => (
                                            <RowFlexBox key={idx}>
                                                {checkCreater() && <MyVoteIcon>나</MyVoteIcon>}
                                                <div style={{marginInline: '3px', fontSize: '14px'}}>{voterUser}</div>
                                            </RowFlexBox>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </ViewVoter_Container>
                    )}
                </VoteDetail_Container>
            )}
        </Modal_Background>
    );
};

export default VoteDetail;
