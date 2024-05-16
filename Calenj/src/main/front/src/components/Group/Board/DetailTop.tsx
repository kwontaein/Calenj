import {createTimePassed} from '../../../shared/lib'
import {MiniText, FullScreen_div} from '../../../style/FormStyle'
import {
    BoardDetailTop_Container, BoardDetailTop_title, GroupNoticeListTitle
} from "../../../style/Group/GroupNoticeStyle";
import {
    DispatchBoardOptionProps,
    mapDispatchToBoardOptionProps,
} from "../../../store/slice/BoardOptionSlice";
import {connect} from 'react-redux'
import {useEffect} from "react";

interface Details{
    state:string,
    title: string;
    created:string;
    watcher:string[],
    subWidth?:number,
}


const DetailTop:React.FC<Details & DispatchBoardOptionProps>=({state, title,created,watcher,updateBoardParam,subWidth})=>{


    return(
        <BoardDetailTop_Container>
            <FullScreen_div>
                <BoardDetailTop_title $state={state}>
                    {(state==="notice"&& subWidth) && <GroupNoticeListTitle $subScreenWidth={subWidth}>
                        {title}
                    </GroupNoticeListTitle>}
                    {(state==="vote") && title}
                    {state==="vote" &&<i className="fi fi-br-cross-small" style={{marginTop: "3px", fontSize:'15px'}}
                                         onClick={()=>{updateBoardParam({voteParam:''})}}></i>}
                </BoardDetailTop_title>
                <MiniText>
                    {createTimePassed(created)} · {watcher.length}명 읽음
                </MiniText>

            </FullScreen_div>
        </BoardDetailTop_Container>
    )
}
export default connect(null, mapDispatchToBoardOptionProps) (DetailTop)