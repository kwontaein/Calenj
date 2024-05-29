import {useLayoutEffect, useState} from "react";
import {updateVoteApi} from "../api/updateVoteApi";
import {AxiosError} from "axios";
import {jwtFilter} from "../../../../../../entities/authentication/jwt";
import {updateVoteEndDateApi} from "../api/updateVoteEndDateApi";
import {useConfirm} from "../../../../../../shared/model";
import {useFetchVoteDetail} from "../../../../../../entities/reactQuery";

interface ReturnVoteContent{
    voteComplete:boolean,
    updateVote:()=>void, // 투표 선택 후 업데이트
    earlyVoteEnd:()=>void, //조기종료 함수
    checkVoteBefore:()=>boolean, // 투표 참여여부 체크
}

export const useVoteContent = (voteParam:string, isAttend:boolean, myVote:boolean[]):ReturnVoteContent =>{
    const [voteComplete,setVoteComplete] = useState<boolean>(isAttend);
    const {refetch} = useFetchVoteDetail(voteParam);


    //이전에 투표한 상태라면 재투표가능 styled를 변경하기 위해 쓰는 함수
    const checkVoteBefore =()=>{
        return isAttend||myVote.includes(true)
    }

    const updateVote=()=>{
        //이미 투표된 상태라면, 다시 투표할 수 있게 화면 전환
        if(voteComplete){
            setVoteComplete(false)
            return;
        }
        //투표가 체크되어있지 않으면서 이전에 투표한 기록이 없으면
        if(!checkVoteBefore()){
            return
        }
        updateVoteApi(voteParam,myVote).then(()=>{
            refetch()//refetch
            if(myVote.includes(true)){//한개 이상을 찍어야 내 투표가 완료된 것
                setVoteComplete(true)
            }
        })
            .catch(error => {
                const axiosError = error as AxiosError;
                console.log(axiosError);
                if(axiosError.response?.data){
                    jwtFilter((axiosError.response.data) as string);
                }
            });
    }

    const postVoteEnd=()=>{
        updateVoteEndDateApi(voteParam)
            .then(()=>{
                refetch()//refetch
                window.alert('투표가 종료되었습니다.')
            }).catch(error => {
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if(axiosError.response?.data){
                jwtFilter((axiosError.response.data) as string);
            }
        })
    }

    const earlyVoteEnd =()=>{
        useConfirm('투표를 종료하시겠습니까?',postVoteEnd,()=>{} )
    }

    return {voteComplete, updateVote, earlyVoteEnd, checkVoteBefore}
}