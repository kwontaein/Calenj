import {useDispatch, useSelector} from "react-redux";
import {
    OptionStateText_Container,
    SubScreenIcon_Container,
    SubScreenOption_Container,
    SubScreenSelector_Container,
    SubScreenSearchItem_Input,
} from "./SubScreenSelectBoxStyled";
import {VoteFilter} from "../../board/vote/filter";
import {useSelectBoxState} from "../model/useSelectBoxState";
import {RootState} from "../../../../entities/redux";
import {GroupSubScreenProps} from "../model/types";
import {updateClickState} from "../../../../entities/redux";
import {useEffect} from "react";
import {GroupEventOption} from "../../event/option";


export const SubScreenSelectBox:React.FC<GroupSubScreenProps> =({isSearching})=>{
    const {searchRef, filter, setSearchWord} = useSelectBoxState(isSearching)
    const {clickState, showMemberList} = useSelector((state:RootState) => state.subNavigation.group_subNavState)
    const boardOption = useSelector((state:RootState)=>state.boardOption);
    const dispatch = useDispatch()


    return(
        <>
            {(clickState ==="투표" || clickState ==="공지") &&
                <SubScreenSelector_Container $clickState={clickState} $option={boardOption.clickState} $showMemberList={showMemberList}>
                    <SubScreenOption_Container $option={boardOption.clickState}>

                        {boardOption.clickState ==="filter" && <OptionStateText_Container>필터 설정</OptionStateText_Container>}
                        {boardOption.clickState ==="search" && <SubScreenSearchItem_Input ref={searchRef}
                                                                                          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setSearchWord(e.target.value)}}/>}

                        {(clickState!=="공지") && (boardOption.clickState ==="" ||boardOption.clickState !=="search")  &&
                        <SubScreenIcon_Container $option={boardOption.clickState}
                                                 $filter={filter}
                                                 onClick={()=>{dispatch(updateClickState({clickState:"filter"}))}}>
                            <i className="fi fi-rs-filter" style={{marginTop: "3px"}}></i>
                        </SubScreenIcon_Container>
                        }
                        {boardOption.clickState !=="filter"  &&
                        <SubScreenIcon_Container $option={boardOption.clickState}
                                                 onClick={()=>{dispatch(updateClickState({clickState:"search"}))}}>
                            <i className="fi fi-br-search" style={{marginTop: "3px"}}></i>
                        </SubScreenIcon_Container>
                        }
                        {(boardOption.clickState===""|| boardOption.clickState==="add")  &&
                        <SubScreenIcon_Container $option={boardOption.clickState}
                                                 onClick={()=>{dispatch(updateClickState({clickState:"add"}))}}>
                            <i className="fi fi-sr-plus-small" style={{marginTop: "3px", fontSize:"20px"}}></i>
                        </SubScreenIcon_Container>
                        }
                    </SubScreenOption_Container>

                    {boardOption.clickState ==="filter" &&
                        <VoteFilter/>
                    }
            </SubScreenSelector_Container>
            }
            {clickState==='그룹일정'&& <GroupEventOption/>}
        </>
    )
}
