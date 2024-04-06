import React, {useLayoutEffect, useState} from 'react';
import axios ,{AxiosError}from 'axios';
import {useLocation} from 'react-router-dom';
import {stateFilter,createTimePassed} from '../../../stateFunc/actionFun'
import DetailTop from '../DetailTop'
import { array } from 'yup';

interface voteChoiceDTO{
    voteItem:string;
    voter:string[];

}

interface VoteDetails{
    voteCreater : string;
    voteTitle : string;
    voteCreated:string;
    voteEndDate:string;
    isMultiple:boolean;
    anonymous:boolean;
    voteWatcher:string[]
    voter:string[];
    countVoter:number;
    voteChoiceDTO:voteChoiceDTO[];

}


const VoteDetail:React.FC=()=>{
    
    const [detail, setDetail] = useState<VoteDetails | null>(null);
    const [myVoter,setMyVoter] = useState<boolean[]>(); //내가 투표한 항목순번에 true
    const [voted, setVoted] = useState<voteChoiceDTO[]|null>(null);
    const [countVoted,setCountVoted] = useState<number>(0);
    const location = useLocation();
    const [isLoading,setIsLoading] =useState<boolean>(false);
    const voteInfo = {...location.state};

    function getVoteDetail (){
         axios.post('/api/voteDetail', null, {
            params: {
                voteId: voteInfo.voteId
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }) // 객체의 속성명을 'id'로 설정
            .then(response => {
                let voteDetail = response.data
                setDetail(voteDetail);
                console.log(voteDetail.voteChoiceDTO)
                setVoted(voteDetail.voteChoiceDTO)
                console.log(voteDetail)
                //TODO : 배열을 voteDetail.voter로 바꾸기
                BeforCheckVoter(voteDetail.voteChoiceDTO)
                setIsLoading(true);
                //BeforCheckVoter(['dysj12@gmail.com, ㅎ2','ㅎ2','ㅇㅅㅇ, ㅇㅂㅇ,ㅇㅁㅇ'],voteDetail.voteItem,voteDetail.myId)
            })
            .catch(error => {
                const axiosError = error as AxiosError;
                console.log(axiosError);
                if(axiosError.response?.data){
                    stateFilter((axiosError.response.data) as string);
                }
            });
    }
    
    useLayoutEffect(() => {
        getVoteDetail();
    }, []);

    const BeforCheckVoter=(voteList:voteChoiceDTO[])=>{
        let userVoter = new Array(voteList.length).fill(false);
        let userEmail = sessionStorage.getItem('userId')
        voteList.map((item,index)=>{
            item.voter.map((voter)=>{
                if(voter ===userEmail){
                    userVoter[index] = true;
                }
            })
        })
    }

    // //내가 투표한 항목 및 투표 항목별 투표자 셋팅
    // const BeforCheckVoter=(voter:string[],voteItem:string[],myId:string)=>{
    //     let countArr = new Array(voteItem.length).fill(false); //투표항목의 길이만큼 생성
    //     let set = new Set();
    //     //각 항목 별 투표한 사람을 2차원 배열로 저장
    //     let arr = Array.from(voter,(v:string,index:number)=>{
    //         let voterList = v.split(',')
    //         let newVoterList =voterList.map((value)=>{
    //             if(value.trim() ===myId){   //각 항목별 투표한 사람 중 내id가 있으면 (내가 투표한 항목 체크)
    //                 countArr[index] = true; 
    //             }
    //             set.add(value.trim()) //투표한 인원을 중복없이
    //             return value //newVoterList의 배열로 들어감
    //         })
    //         return newVoterList
    //     })
    //     console.log(countArr)
    //     console.log(arr)
    //     setCountVoted(set.size)
    //     setMyVoter(countArr); //내가 투표한 항목 가져옴
    //     setVoted(arr)   //항목별 투표한 사람을 가져옴
    //     setIsLoading(true);
    // }



    return(
        <div>
            {isLoading&&
            (detail&&
            <div>
                <DetailTop Created={detail.voteCreated}Creater={detail.voteCreater} Watcher={detail.voteWatcher}/>
                <div className='VoteDetailContainer'>
                    {myVoter?.toString().includes('true') ? 
                        <>ㅎㅇ</>:<>ㅇㅅㅇ</>
                    }
                </div>
            </div>
            )
            }
        </div>
    )
}
export default VoteDetail