import React, {useId, useLayoutEffect, useState} from "react";
import axios, {AxiosError} from "axios";
import {jwtFilter} from "../../../../../entities/authentication/jwt";
import {saveDBFormat} from "../../../../../shared/lib";
import {useConfirm} from "../../../../../shared/model";
import {
    CurrentVotePersentLine,
    CurrentVotePersentLine_BG,
    MyPickCheck_div, MyPickItem_div, TrasformButton, Vote_CheckBox,
    VoteContentList_Container,
    VoteDetailItem_Container,
    VoteItem_Label, VoteResultHover_div
} from "../../../../../style/Group/GroupVoteStyle";
import {MiniText, RowFlexBox} from "../../../../../style/FormStyle";
import {VoteDetailProps} from "./types";

const VoteContent: React.FC<VoteDetailProps> = ({
                                                    voteId, detail, voteChoiceResponse, participation, myVote, voteEnd,
                                                    refetchVoteDetail, pickVote, viewVoterList, setMyVote
                                                }) => {
    const id = useId();
    const [voteComplete, setVoteComplete] = useState<boolean | undefined>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useLayoutEffect(() => {
        setVoteComplete(participation);
    }, [participation]);

    const checkCreater = () => {
        const userEmail = localStorage.getItem('userId');
        return detail.voteCreater === userEmail;
    };

    const checkVoteBefore = () => participation || myVote.includes(true);

    const postVote = () => {
        if (voteComplete) {
            setVoteComplete(false);
            return;
        }

        if (!checkVoteBefore()) return;

        axios.post('/api/voteUpdate', {voteId, myVote})
            .then(() => {
                refetchVoteDetail();
                if (myVote.includes(true)) setVoteComplete(true);
            })
            .catch((error: AxiosError) => {
                console.error(error);
                if (error.response?.data) jwtFilter(error.response.data as string);
            });
    };

    const postVoteEnd = () => {
        axios.post('/api/voteEndDateUpdate', {
            voteId,
            voteEndDate: saveDBFormat(new Date())
        }).then(() => {
            refetchVoteDetail();
            alert('투표가 종료되었습니다.');
        }).catch((error: AxiosError) => {
            console.error(error);
            if (error.response?.data) jwtFilter(error.response.data as string);
        });
    };

    const earlyVoteEnd = () => {
        useConfirm('투표를 종료하시겠습니까?', postVoteEnd, () => {
        });
    };

    return (
        <VoteDetailItem_Container>
            <VoteContentList_Container>
                {voteChoiceResponse?.map((Item, index) => (
                    <div key={id + index}>
                        <RowFlexBox style={{width: '100%'}}>
                            <VoteItem_Label>
                                {(voteComplete && participation) || voteEnd ? (
                                    <MyPickCheck_div $isPick={myVote[index]}/>
                                ) : (
                                    <Vote_CheckBox
                                        type='checkbox'
                                        name='voterList'
                                        value={index}
                                        checked={myVote[index]}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => pickVote(e, detail.isMultiple, myVote, setMyVote)}
                                    />
                                )}
                                <MyPickItem_div $isPick={myVote[index]}>{Item.voteItem}</MyPickItem_div>
                                {(voteComplete || voteEnd) && (
                                    <MiniText style={{marginLeft: 'auto'}}>
                                        {(Item.voter.length > 0 || voteEnd) ? `${Item.voter.length}명` : ''}
                                    </MiniText>
                                )}
                            </VoteItem_Label>
                        </RowFlexBox>
                        {(voteComplete || voteEnd) && (
                            <CurrentVotePersentLine_BG>
                                <CurrentVotePersentLine $persent={(Item.voter.length / detail.countVoter.length) || 0}/>
                            </CurrentVotePersentLine_BG>
                        )}
                    </div>
                ))}
            </VoteContentList_Container>

            <div style={{width: '100%'}}>
                {!voteEnd && (
                    <RowFlexBox>
                        <TrasformButton
                            $isCreater={checkCreater() && detail.countVoter.length > 0}
                            $ableClick={checkVoteBefore()}
                            onClick={postVote}
                        >
                            {participation && voteComplete ? '다시 투표하기' : '투표 하기'}
                        </TrasformButton>
                        {checkCreater() && detail.countVoter.length > 0 && (
                            <TrasformButton
                                $isCreater={checkCreater()}
                                $ableClick={detail.countVoter.length > 0}
                                style={{marginLeft: '1vw'}}
                                onClick={earlyVoteEnd}
                            >
                                투표 종료
                            </TrasformButton>
                        )}
                    </RowFlexBox>
                )}
            </div>

            {(detail.countVoter.length > 0 || voteEnd) && (
                <RowFlexBox
                    style={{width: '100%', marginTop: '3vw', fontSize: '14px', display: "flex", alignItems: "center"}}>
                    <div style={{fontSize: "12px"}}>{detail.countVoter.length}명 참여</div>
                    {!detail.anonymous && (
                        <div
                            style={{marginTop: '3px'}}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={viewVoterList}
                        >
                            <i
                                style={{fontSize: '18px', cursor: 'pointer', marginLeft: '5px'}}
                                className="fi fi-rr-angle-small-right"
                            />
                        </div>
                    )}
                    {isHovered && <VoteResultHover_div>투표현황 보기</VoteResultHover_div>}
                </RowFlexBox>
            )}
        </VoteDetailItem_Container>
    );
};
export default VoteContent;
