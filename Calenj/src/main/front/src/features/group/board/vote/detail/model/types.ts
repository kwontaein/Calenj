import {VoteChoiceResponse} from "../../../../../../entities/reactQuery";
import React from "react";

export interface VoteDetailProps{
    voteParam:string,
    voteItems:VoteChoiceResponse[]|null, //투표 목록별 값
    myVote :boolean[], //사용자가 투표 현황
    isAttend: boolean, //처음 데이터를 불러올 때 사용자가 투표했는지 여부
    pickVote: (e:React.ChangeEvent<HTMLInputElement>,isMultiple:boolean)=>void, //현재 클릭한 목록 수정
    voteEnd:boolean,
    isCreator:boolean,
    contentWidth:number,
    isMessage?:boolean,
}

