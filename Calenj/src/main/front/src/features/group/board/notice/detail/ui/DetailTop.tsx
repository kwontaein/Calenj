import {createTimePassed} from '../../../../../../shared/lib';
import {MiniText, FullScreen_div} from '../../../../../../shared/ui/SharedStyled';
import {BoardDetailTop_Container,BoardDetailTop_title}from './BoardTopStyled'
import {GroupNoticeListTitle} from '../../list'
import {
     updateBoardParam,
} from "../../../../../../entities/redux/model/slice/BoardOptionSlice";
import {useDispatch} from 'react-redux'

interface Details{
    state:string,
    title: string;
    created:string;
    watcher:string[],
    isMessage?:boolean,
}


export const DetailTop:React.FC<Details>=({state, title,created,watcher,isMessage})=>{
    const dispatch = useDispatch()
    return(
        <BoardDetailTop_Container>
            <FullScreen_div>
                <BoardDetailTop_title $state={state}>
                    {(state==="notice") && <GroupNoticeListTitle>
                        {title}
                    </GroupNoticeListTitle>}
                    {(state==="vote") && title}

                    { (!isMessage && state==="vote") &&<i className="fi fi-br-cross-small" style={{marginTop: "3px", fontSize:'15px'}}
                                         onClick={()=>{dispatch(updateBoardParam({voteParam:''}))}}></i>}
                </BoardDetailTop_title>
                <MiniText>
                    {createTimePassed(created)} · {watcher.length}명 읽음
                </MiniText>

            </FullScreen_div>
        </BoardDetailTop_Container>
    )
}
