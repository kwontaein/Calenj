//SubNavigation의 내용을 보여주는 컴포넌트
import { useDispatch, useSelector} from 'react-redux'
import {
    GroupSubScreen_Container,
    GroupSubScreenContent_Container,
    GroupSubScreenTop_Container,
} from "./GroupSubScreenStyled";
import {Vote} from "../../board/vote/list";
import {Notice} from "../../board/notice/list";
import {SubScreenOption} from "./SubScreenOption";
import {GroupEventList} from "../../event/list/ui/GroupEventList";
import {useEffect} from "react";
import {RootState} from "../../../../entities/redux";






export const GroupSubScreen : React.FC = () =>{
    const {clickState, mode} = useSelector((state:RootState) => state.subNavigation.group_subNavState)
    const {scheduleTitle} = useSelector((state:RootState)=> state.groupSchedule)

    return(
            <GroupSubScreen_Container $mode={mode}>
                <GroupSubScreenTop_Container>
                    {clickState!=="그룹일정" ? clickState : (scheduleTitle!=="" ? scheduleTitle: clickState)}
                    <SubScreenOption/>
                </GroupSubScreenTop_Container>
                <GroupSubScreenContent_Container>
                    {clickState === "투표" &&
                        <Vote/>}
                    {clickState === "공지" &&
                        <Notice/>}
                    {clickState ==="그룹일정" &&
                        <GroupEventList/>
                    }
                </GroupSubScreenContent_Container>
            </GroupSubScreen_Container>
    )
}
