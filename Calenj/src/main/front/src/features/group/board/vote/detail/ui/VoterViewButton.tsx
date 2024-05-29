import {VoteResultHover_div} from "./VoteDetailStyled";
import {RowFlexBox} from "../../../../../../shared/ui/SharedStyled";
import React, {useState} from "react";
import {VoteDetail} from "../../../../../../entities/reactQuery";

interface VoteDetailProps{
    data:VoteDetail,
    setViewVoter: React.Dispatch<React.SetStateAction<boolean>>
}
export const VoterViewButton : React.FC<VoteDetailProps> = ({data,setViewVoter}) =>{
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return(
        <RowFlexBox style={{width:'100%',marginTop:'30px', fontSize:'14px', display:"flex", alignItems:"center"}}>
            <div style={{fontSize: "12px"}}>{data.countVoter.length}명 참여</div>
            {!data.anonymous&&
                <div style={{marginTop:'3px'}}
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}
                     onClick={()=>setViewVoter((prev)=>!prev)}>
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
    )
}