import {SubScreenSelectBox} from "./SubScreenSelectBox";
import {GroupSubScreenTopIcon_Container} from "./GroupSubScreenStyled";
import {useBoardState} from "../model/useBoardState";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {SubScreenProps} from "../model/types";


export const SubScreenOption : React.FC<SubScreenProps> = ({showUserList}) =>{
    const {selectBox, showSelectBox, isSearching, ExitBoardDetail, setShowSelectBox} = useBoardState()
    const { clickState } = useSelector((state:RootState) => state.subNavigateInfo)
    const boardOption = useSelector((state:RootState) => state.boardOption)

    return(
        <GroupSubScreenTopIcon_Container ref={selectBox}
                                         $isClick={showSelectBox}>
            {(clickState === "공지" && boardOption.noticeParam !== "") ?
                <i className="fi fi-br-exit" style={{marginTop: "3px"}} onClick={ExitBoardDetail}></i>:
                <div>
                    {showSelectBox && <SubScreenSelectBox showUserList={showUserList}
                                                          isSearching={isSearching}/>}
                    <i className="fi fi-rs-menu-dots" style={{marginTop: "3px"}}
                       onClick={() => {
                           setShowSelectBox((prev) => !prev)
                       }}></i>
                </div>
            }
        </GroupSubScreenTopIcon_Container>
    )
}