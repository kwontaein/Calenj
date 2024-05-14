import {createTimePassed} from '../../../stateFunc/actionFun'
import {MiniText, FullScreen_div} from '../../../style/FormStyle'
import {
    BoardDetailTop_Container, BoardDetailTop_title
} from "../../../style/Group/GroupNoticeStyle";
import {
    DispatchBoardOptionProps,
    mapDispatchToBoardOptionProps,
} from "../../../store/slice/BoardOptionSlice";
import {connect} from 'react-redux'

interface Details{
    state:string,
    title: string;
    created:string;
    watcher:string[]
}


const DetailTop:React.FC<Details & DispatchBoardOptionProps>=({state, title,created,watcher,updateBoardParam})=>{


    return(
        <BoardDetailTop_Container>
            <FullScreen_div>
                <BoardDetailTop_title $state={state}>
                    {title}
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