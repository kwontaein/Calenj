import React, {useLayoutEffect, useState} from 'react';
import axios ,{AxiosError}from 'axios';
import {useLocation} from 'react-router-dom';
import {stateFilter,changeDateForm,AHMFormat} from '../../../stateFunc/actionFun'
import DetailTop from '../DetailTop'
import { array } from 'yup';
import { MiniText, RowFlexBox ,TrasformButton} from '../../../style/FormStyle';

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
    const [voted, setVoted] = useState<voteChoiceDTO[]|null>(null);
    const [myVoter,setMyVoter] = useState<boolean[]>(); //내가 투표한 항목순번에 true
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
                TimeOperation(voteDetail.voteEndDate)
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
                    userVoter[index] = true; //내가 투표한 게 있는지 체크
                }
            })
        })
        setMyVoter(userVoter);
        console.log(userVoter)
    }

    const TimeOperation =(endDate:string)=>{
        const now = new Date();
        const end = changeDateForm(endDate);
        const remaining =Number(end)-Number(now);
        const minute = 60*1000;
        const hour = minute*60;
        const oneDay = hour*24
        let result:string;
        if(now>end){
            result = `${AHMFormat(end).slice(6)} 종료`
        }else if(remaining< hour){//1시간도 안남았으면
            result = `${Math.floor(remaining/minute)}분 남음`
        }else if(remaining<(oneDay)){ //하루 전이면
            result = `${Math.floor(remaining/hour)}시간 남음`
        }else{
            result = `${Math.round(remaining/oneDay)}일 남음`
        }
        return result;
    }
    const createrCheck=(creater:string)=>{
        const userEmail=sessionStorage.getItem('userId')
        return creater===userEmail
    }

    return(
        <div>
            {isLoading&&
            (detail&&
            <div>
                <DetailTop Created={detail.voteCreated}Creater={detail.voteCreater} Watcher={detail.voteWatcher}/>
                <div className='VoteDetailContainer'>
                    {detail &&
                    <div>
                        <div id='VoteDetail_title'>
                            {detail.voteTitle}
                        </div>
                        <MiniText>
                            <div id='voteContent'>{detail.anonymous ? <>익명투표</>:<></>}</div>
                            <div id='voteContent'>{detail.isMultiple ? <>복수선택</>:<></>}</div>
                            <div id='voteContent'>{TimeOperation(detail.voteEndDate)}</div>
                        </MiniText>

                        {myVoter?.toString().includes('true') ? 
                        <div>
                            <button>다시 투표하기</button>
                        </div>
                            
                            :
                            <div>
                            {voted?.map((Item) => (
                                <RowFlexBox>
                                    <label>
                                    <input type={detail.isMultiple?'checkbox':'radio'}name='voterList'/> 
                                    {Item.voteItem}
                                    </label>
                                   
                                </RowFlexBox>
                            ))}
                            <div style={{width:'100vw'}}>
                                <TrasformButton isCreater={createrCheck(detail.voteCreater)}>투표 하기</TrasformButton>
                                {createrCheck(detail.voteCreater) ?<TrasformButton isCreater={createrCheck(detail.voteCreater)}>투표 종료</TrasformButton>:<></>}
                            </div>
                            
                        </div>
                        }  
                    </div>
        
                }
                </div>
            </div>
            )
            }
        </div>
    )
}
export default VoteDetail