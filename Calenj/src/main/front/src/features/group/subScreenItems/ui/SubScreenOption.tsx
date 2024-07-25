import {SubScreenSelectBox} from "./SubScreenSelectBox";
import {GroupSubScreenTopIcon_Container, OptionIcon_Container} from "./GroupSubScreenStyled";
import {useBoardState} from "../model/useBoardState";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {useEffect} from "react";


export const SubScreenOption : React.FC = () =>{
    const {selectBox, showSelectBox, isSearching, ExitBoardDetail, setShowSelectBox} = useBoardState()
    const { clickState } = useSelector((state:RootState) => state.subNavigation.group_subNavState)
    const boardOption = useSelector((state:RootState) => state.boardOption)
    const {scheduleId} = useSelector((state:RootState)=> state.groupSchedule)

    return(
        <GroupSubScreenTopIcon_Container ref={selectBox}
                                         $isClick={showSelectBox}>
            {(clickState === "공지" && boardOption.noticeParam !== "") ||(clickState==="그룹일정" && scheduleId!=="") ?
                <i className="fi fi-br-exit" style={{marginTop: "3px"}} onClick={ExitBoardDetail}></i>:
                <OptionIcon_Container>
                    <i className="fi fi-rs-menu-dots" style={{marginTop: "3px"}}
                       onClick={() => {setShowSelectBox((prev) => !prev)}}>
                    </i>
                    {showSelectBox && <SubScreenSelectBox isSearching={isSearching}/>}
                </OptionIcon_Container>
            }
        </GroupSubScreenTopIcon_Container>
    )
}