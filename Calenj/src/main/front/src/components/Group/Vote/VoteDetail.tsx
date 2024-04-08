import React, {useEffect, useLayoutEffect, useState} from 'react';
import axios ,{AxiosError}from 'axios';
import {useLocation} from 'react-router-dom';
import {stateFilter,TimeOperation} from '../../../stateFunc/actionFun'
import DetailTop from '../DetailTop'
import { MiniText, RowFlexBox ,TrasformButton,TransVoteContainer} from '../../../style/FormStyle';
import '../../../style/Detail.scss'
import { useId } from 'react';


interface voteChoiceDTO{
    voteItem:string;
    voter:string[];
    voteIndex:number
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
    countVoter:string[];
    voteChoiceDTO:voteChoiceDTO[];
    
}
interface VoteDetailProps{
    //전체 디테일정보
    detail:VoteDetails;
    //투표 목록별 값
    voteChoiceDTO:voteChoiceDTO[]|null;
    //사용자가 투표 현황
    myVote :boolean[];
    //처음 데이터를 불러올 때 사용자가 투표했는지 여부
    participation: boolean|undefined;
    //update이후 다시 가져오기 위한 함수
    refetchVoteDetail:()=>void
    //현재 클릭한 목록 수정
    pickVote: (e:React.ChangeEvent<HTMLInputElement>,isMultiple:boolean)=>void 
}






const VoteDetail:React.FC=()=>{
    const [detail, setDetail] = useState<VoteDetails | null>(null);
    const [voted, setVoted] = useState<voteChoiceDTO[]|null>(null);
    const [myVote,setMyVote] = useState<boolean[]>(); //내가 투표한 항목순번에 true
    const [dbVoter,setDbMyBoter] =useState<boolean>(false);
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
                const voteDetail = response.data
                setDetail(voteDetail);
                BeforCheckVoter(voteDetail.voteChoiceDTO)                
                TimeOperation(voteDetail.voteEndDate)
                setIsLoading(true);
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

    useEffect(()=>{

    },[dbVoter])

    const BeforCheckVoter=(voteList:voteChoiceDTO[])=>{
        let newList = voteList.sort((a,b)=>{return a.voteIndex-b.voteIndex})
        let userVoter = new Array(voteList.length).fill(false);
        let userEmail = localStorage.getItem('userId')
        newList.map((item,index)=>{
            item.voter.map((voter)=>{
                if(voter ===userEmail?.toString()){
                    userVoter[index] = true; //내가 투표한 게 있는지 체크
                }
            })
        })
        setVoted(newList)
        setMyVote(userVoter);
        setDbMyBoter(userVoter.includes(true))
      
    }


    //보내기 전에 체크
    const pickVote = (e:React.ChangeEvent<HTMLInputElement>,isMultiple:Boolean)=>{
        let newVoter
         //checked상태 변화 > state 반영 > checked 반영
        if(!myVote){
            return
        }
        if(isMultiple){
            newVoter = [...myVote];
            newVoter[+e.target.value] = e.target.checked 
        }else{
            newVoter =Array.from({length:myVote.length},(_,i)=>
                e.target.checked && i===+e.target.value
            )//check상태변화 true && index번호가 같으면 
        }
        setMyVote(newVoter)
    }

    return(
        <div>
            {isLoading&&
            (detail&&
            <div style={{width:'100vw', alignItems:'center', justifyContent:'center'}}>
                <DetailTop Created={detail.voteCreated}Creater={detail.voteCreater} Watcher={detail.voteWatcher}/>
                <TransVoteContainer $end={voteInfo.end}>
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
                     
                        <VoteContent detail={detail} voteChoiceDTO={voted} participation={dbVoter} pickVote={pickVote} myVote={myVote as boolean[]} refetchVoteDetail={getVoteDetail}/>
                        
                    </div>
                }
                </div>
                </TransVoteContainer>
            </div>
            )
            }
        </div>
    )
}


export default VoteDetail
const VoteContent:React.FC<VoteDetailProps> =({detail,voteChoiceDTO,participation, pickVote, myVote, refetchVoteDetail})=>{
    const id = useId();
    const [votecomplete,setVoteComplete] = useState<boolean>();
    const location = useLocation();
    const voteInfo = {...location.state};

    useLayoutEffect(()=>{
        setVoteComplete(participation);
  
    },[])

    const checkCreater=()=>{
        const userEmail=localStorage.getItem('userId')
        return detail.voteCreater===userEmail
    }
    //이전에 투표한 상태라면 재투표가능 styled를 변경하기 위해 쓰는 함수
    const checkVoteBefore =()=>{
        return participation||myVote.includes(true)
    }    
    const checkVoterCount =()=>{
        let result;
        if(participation&&!votecomplete){//내가 이전에 참여한 기록이 있으면
            result= detail.countVoter.length-1;
        }else{
            result= detail.countVoter.length;
        }
        return result;
    }

    const postVote=()=>{
        
        //이미 투표된 상태라면, 다시 투표할 수 있게 화면 전환
        if(votecomplete){
            setVoteComplete(false)
            return;
        }
        //투표가 체크되어있지 않으면서 이전에 투표한 기록이 없으면
        if(!checkVoteBefore()){
            return
        }
        
        axios.post('/api/voteUpdate', {
            voteId: voteInfo.voteId,
             myVote: myVote,
     
        }).then(()=>{
            console.log('투표완료')
            refetchVoteDetail()//refetch
            if(myVote.includes(true)){//한개 이상을 찍어야 내 투표가 완료된 것
                setVoteComplete(true)
            }
        })
        .catch(error => {
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if(axiosError.response?.data){
                stateFilter((axiosError.response.data) as string);
            }
        });
    }

    

    return(
        <div style={{marginTop:'20px'}}>
        
        {voteChoiceDTO?.map((Item,index) => (
            <div  key={id+index}>
            <RowFlexBox style={{width:'88vw'}}>
                <label style={{display:'flex', alignItems:'center', marginBlock:'0.5vw', width:'88vw'}} >
 
                {(votecomplete&&participation)||voteInfo.end ? 
                <div className={myVote[index]? 'checked_div':'unChecked_div'}></div>:
                <input type='checkbox' name='voterList' value={index} className='checkbox'
                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>pickVote(e, detail.isMultiple)} checked={myVote[index]}/> }
                
                <div style={{marginInline:'3px', color: myVote[index]? '#007bff':''}}>{Item.voteItem}</div>
                {(votecomplete||voteInfo.end) &&<MiniText style={{marginLeft:'auto'}}>{(Item.voter.length>0||voteInfo.end)? `${Item.voter.length}명`:''}</MiniText>}
                </label>
            </RowFlexBox>
            {(votecomplete||voteInfo.end) &&<div style={{width:'86vw',height:'4px',backgroundColor:'rgb(228, 228, 228)',margin:'1vw'}}>
                <div style={{width: `${(86/voteInfo.member)*Item.voter.length}vw`,height:'4px',backgroundColor:'#007bff'}}></div>
            </div>}
            </div>
            
        ))}
        
        <div style={{width:'88vw'}}>
        {!voteInfo.end &&
            <div>
            <TrasformButton $isCreater={checkCreater()&&(checkVoterCount()>0)} $ableClick={checkVoteBefore()} onClick={postVote}>
                {participation&&votecomplete ? '다시 투표하기':'투표 하기'}
            </TrasformButton>
            {checkCreater() &&checkVoterCount()>0 &&  
            <TrasformButton $isCreater={checkCreater()}
                            $ableClick={(detail.countVoter.length>0)}
                            style={{marginLeft:'1vw'}}>
                            투표 종료
            </TrasformButton>}
            </div>
        }   
        </div>
        <div style={{width:'88vw',marginTop:'3vw', fontSize:'14px'}}>
            {(detail.countVoter.length>0||voteInfo.end) && <div>{detail.countVoter.length}명 참여</div>}
        </div>
    </div>
    )
}
