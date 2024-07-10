import {SubScreenSelectBox} from "./SubScreenSelectBox";
import {GroupSubScreenTopIcon_Container} from "./GroupSubScreenStyled";
import {useBoardState} from "../model/useBoardState";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";


export const SubScreenOption : React.FC = () =>{
    const {selectBox, showSelectBox, isSearching, ExitBoardDetail, setShowSelectBox} = useBoardState()
    const { clickState } = useSelector((state:RootState) => state.group_subNavState)
    const boardOption = useSelector((state:RootState) => state.boardOption)

    return(
        <GroupSubScreenTopIcon_Container ref={selectBox}
                                         $isClick={showSelectBox}>
            {(clickState === "공지" && boardOption.noticeParam !== "") ?
                <i className="fi fi-br-exit" style={{marginTop: "3px"}} onClick={ExitBoardDetail}></i>:
                <div>
                    {showSelectBox && <SubScreenSelectBox isSearching={isSearching}/>}
                    <i className="fi fi-rs-menu-dots" style={{marginTop: "3px"}}
                       onClick={() => {
                           setShowSelectBox((prev) => !prev)
                       }}></i>
                </div>
            }
        </GroupSubScreenTopIcon_Container>
    )
}