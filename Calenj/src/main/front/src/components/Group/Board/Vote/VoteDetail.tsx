import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import axios ,{AxiosError}from 'axios';
import {saveDBFormat,TimeOperation,changeDateForm} from '../../../../shared/lib';
import {jwtFilter} from "../../../../entities/authentication/jwt";
import { useConfirm} from '../../../../shared/model'
import DetailTop from '../DetailTop'
import {MiniText, RowFlexBox, TextColor, ThemaColor2} from '../../../../style/FormStyle';
import {
    TrasformButton,
    TransVoteContainer,
    VoteDetail_Container,
    ViewVoter_Container,
    VoteCondition_Item,
    VoteContent_Container,
    VoteConditionItem_Container,
    VoteDetailItem_Container,
    VoteContentList_Container,
    VoteItem_Label,
    MyPickCheck_div,
    Vote_CheckBox,
    CurrentVotePersentLine_BG, CurrentVotePersentLine, MyPickItem_div, MyVoteIcon, VoteResult_Hr, VoteResultHover_div
} from '../../../../style/Group/GroupVoteStyle'
import { useId } from 'react';
import { Modal_Background } from '../../../../style/FormStyle'



interface voteChoiceResponse{
    voteItem:string;
    voter:string[];
    voteIndex:number
}

interface VoteDetails{
    voteCreator : string;
    voteTitle : string;
    voteCreated:string;
    voteEndDate:string;
    isMultiple:boolean;
    anonymous:boolean;
    voteWatcher:string[]
    voter:string[];
    countVoter:string[];
    voteChoiceResponse:voteChoiceResponse[];
}

interface VoteDetailProps{
    //vote의 식별 id
    voteId:string;
    //전체 디테일정보
    detail:VoteDetails;
    //투표 목록별 값
    voteChoiceResponse:voteChoiceResponse[]|null;
    //사용자가 투표 현황
    myVote :boolean[];
    //처음 데이터를 불러올 때 사용자가 투표했는지 여부
    participation: boolean|undefined;
    //update이후 다시 가져오기 위한 함수
    refetchVoteDetail:()=>void;
    //현재 클릭한 목록 수정
    pickVote: (e:React.ChangeEvent<HTMLInputElement>,isMultiple:boolean)=>void 
    viewVoterList : ()=>void;
    voteEnd:boolean;

}


interface VoteListProps{
    voteId: string,
}



const VoteDetail:React.FC<VoteListProps>=({voteId})=>{
    const [detail, setDetail] = useState<VoteDetails | null>(null);
    const [voted, setVoted] = useState<voteChoiceResponse[]|null>(null);
    const [myVote,setMyVote] = useState<boolean[]>(); //내가 투표한 항목순번에 true
    const [dbVoter,setDbMyVoter] =useState<boolean>(false);
    const [voteEnd,setVoteEnd] = useState<boolean>();
    const [viewVoter, setViewVoter] = useState<boolean>(false);
    const [isLoading,setIsLoading] =useState<boolean>(false);
    const modalBackground = useRef<HTMLDivElement>(null);



    function getVoteDetail (){
         axios.post('/api/voteDetail', null, {
            params: {
                voteId: voteId
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }) // 객체의 속성명을 'id'로 설정
            .then(response => {
                const voteDetail = response.data
                setDetail(voteDetail);
                BeforCheckVoter(voteDetail.voteChoiceResponse)                
                TimeOperation(voteDetail.voteEndDate)
                setVoteEnd(checkVoteEnd(voteDetail.voteEndDate))
                setIsLoading(true);
            })
            .catch(error => {
                const axiosError = error as AxiosError;
                console.log(axiosError);
                if(axiosError.response?.data){
                    jwtFilter((axiosError.response.data) as string);
                }
            });
    }
    
    useLayoutEffect(() => {
        getVoteDetail();
    }, []);

    const checkVoteEnd = (date:string) =>{
        let endDate = changeDateForm(date)//Date형식으로
        let nowDate = new Date();
        return endDate<nowDate;
     
    }
    const viewVoterList =()=>{
            setViewVoter(!viewVoter) 
    }


    const BeforCheckVoter=(voteList:voteChoiceResponse[])=>{
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
        setDbMyVoter(userVoter.includes(true)) //내가 투표한게 있는지 있으면 true
      
    }
    const checkCreator=()=>{
        const userEmail=localStorage.getItem('userId')
        return detail?.voteCreator===userEmail
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
        <Modal_Background ref={modalBackground} onClick={e => {

        }}>
            {isLoading&&
            (detail&&
               <VoteDetail_Container>
                <TransVoteContainer $end={voteEnd as boolean}>
                    <DetailTop state={"vote"} title={detail.voteTitle} created={detail.voteCreated} watcher={detail.voteWatcher}/>
                    {detail &&
                    <VoteContent_Container>
                        <VoteConditionItem_Container>
                            <VoteCondition_Item>{TimeOperation(detail.voteEndDate)}</VoteCondition_Item>
                            <RowFlexBox style={{height:'20px'}}>
                                {detail.anonymous &&<VoteCondition_Item style={{marginRight:'5px'}}>익명투표</VoteCondition_Item>}
                                {(detail.isMultiple && detail.anonymous) && <VoteCondition_Item> • </VoteCondition_Item>}
                                {detail.isMultiple && <VoteCondition_Item>복수선택</VoteCondition_Item>}
                            </RowFlexBox>
                        </VoteConditionItem_Container>
                     
                        <VoteContent
                            voteId={voteId}
                            detail={detail} 
                            voteChoiceResponse={voted}  //정렬된 값을 넘김
                            participation={dbVoter} 
                            voteEnd={voteEnd as boolean} 
                            pickVote={pickVote} 
                            myVote={myVote as boolean[]} 
                            refetchVoteDetail={getVoteDetail}
                            viewVoterList={viewVoterList}
                        />
                    </VoteContent_Container>
                }
                </TransVoteContainer>
                {(viewVoter && voted)&&
                <ViewVoter_Container>
                    {voted.map((result,index)=>(
                        <div key={result.voteItem} style={{marginBottom:'20px'}}>
                        {index!=0 && <VoteResult_Hr/> }
                            <MiniText style={{marginBottom:'10px'}}>
                                {result.voteItem} : {result.voter.length}명
                            </MiniText>
                            <div>
                                {result.voter.length===0 &&
                                    <div style={{width:'100%', textAlign:'center',fontSize:'12px'}}>
                                        투표한 멤버가 없습니다.
                                    </div>
                                }
                                {result.voter.map((voterUser, index) => (
                                    <RowFlexBox key={index}>
                                        {checkCreator()&&
                                            <MyVoteIcon>
                                                나
                                            </MyVoteIcon>
                                        }
                                        <div style={{marginInline:'3px', fontSize:'14px'}}>{voterUser}</div>
                                    </RowFlexBox>
                                ))}
                            </div>
                        </div>
                    ))}
                </ViewVoter_Container>
                }
               </VoteDetail_Container>
                )
            }
    </Modal_Background>
    )
}


export default VoteDetail
const VoteContent:React.FC<VoteDetailProps> =({voteId, detail,voteChoiceResponse,participation, myVote, voteEnd,refetchVoteDetail, pickVote,viewVoterList})=>{
    const id = useId();
    const [votecomplete,setVoteComplete] = useState<boolean>();
    const [isHovered, setIsHovered] = useState<boolean>(false);


    useLayoutEffect(()=>{
        setVoteComplete(participation);
    },[])

    const checkCreator=()=>{
        const userEmail=localStorage.getItem('userId')
        return detail.voteCreator===userEmail
    }
    //이전에 투표한 상태라면 재투표가능 styled를 변경하기 위해 쓰는 함수
    const checkVoteBefore =()=>{
        return participation||myVote.includes(true)
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
            voteId: voteId,
             myVote: myVote,
        }).then(()=>{
            refetchVoteDetail()//refetch
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
        axios.post('/api/voteEndDateUpdate',{
            voteId: voteId,
            voteEndDate:saveDBFormat(new Date())
        }).then(()=>{
            refetchVoteDetail()//refetch
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


    return(
        <VoteDetailItem_Container>
        <VoteContentList_Container>
            {voteChoiceResponse?.map((Item,index) => (
                <div  key={id+index}>
                <RowFlexBox style={{width:'100%'}}>
                    <VoteItem_Label>
                    {(votecomplete&&participation)||voteEnd ?
                    <MyPickCheck_div $isPick={myVote[index]}/>
                   :
                    <Vote_CheckBox type='checkbox'
                                   name='voterList'
                                   value={index}
                                   checked={myVote[index]}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>pickVote(e, detail.isMultiple)}/> }

                    <MyPickItem_div $isPick={myVote[index]}>{Item.voteItem}</MyPickItem_div>
                    {(votecomplete||voteEnd) &&<MiniText style={{marginLeft:'auto'}}>{(Item.voter.length>0||voteEnd)? `${Item.voter.length}명`:''}</MiniText>}
                    </VoteItem_Label>
                </RowFlexBox>
                {(votecomplete||voteEnd) &&
                    <CurrentVotePersentLine_BG>
                        <CurrentVotePersentLine $persent={ (Item.voter.length / detail.countVoter.length)||0 }/>
                    </CurrentVotePersentLine_BG>}
                </div>

            ))}
        </VoteContentList_Container>
        
        {!voteEnd &&
            <RowFlexBox>
            <TrasformButton $isCreator={checkCreator()&&(detail.countVoter.length>0)} $ableClick={checkVoteBefore()} onClick={postVote}>
                {participation&&votecomplete ? '다시 투표하기':'투표 하기'}
            </TrasformButton>
            {checkCreator() &&detail.countVoter.length>0 &&
            <TrasformButton $isCreator={checkCreator()}
                            $ableClick={(detail.countVoter.length>0)}
                            style={{marginLeft:'1vw'}}
                            onClick={earlyVoteEnd}>
                            투표 종료
            </TrasformButton>}
            </RowFlexBox>
        }   

        {(detail.countVoter.length>0||voteEnd) && 
        <RowFlexBox style={{width:'100%',marginTop:'3vw', fontSize:'14px', display:"flex", alignItems:"center"}}>
            <div style={{fontSize: "12px"}}>{detail.countVoter.length}명 참여</div>
            {!detail.anonymous&&
                <div style={{marginTop:'3px'}}
                    onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={() => viewVoterList()}>
                <i style={{fontSize: '18px', cursor: 'pointer', marginLeft:'5px'}}
                   className="fi fi-rr-angle-small-right">
                </i>
                </div>

            }
            {isHovered &&
                <VoteResultHover_div>
                    투표현황 보기
                </VoteResultHover_div>
            }
        </RowFlexBox>
        }
    </VoteDetailItem_Container>
    )
}
