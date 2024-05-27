//SubNavigation의 내용을 보여주는 컴포넌트
import { useDispatch, useSelector} from 'react-redux'
import {
    GroupSubScreen_Container,
    GroupSubScreenContent_Container,
    GroupSubScreenTop_Container,
} from "./GroupSubScreenStyled";
import Vote from "../../../../components/Group/Board/Vote/Vote";
import {Notice} from "../../notice";
import {RootState} from "../../../../store/store";
import {SubScreenOption} from "./SubScreenOption";
import {ContentsCompositionProps} from "../model/types";






export const GroupSubScreen : React.FC<ContentsCompositionProps> = ({subScreenWidth, showUserList}) =>{
    const {param, clickState, mode} = useSelector((state:RootState) => state.subNavigateInfo)

    return(
            <GroupSubScreen_Container $mode={mode}>
            <GroupSubScreenTop_Container>
                {clickState}
                <SubScreenOption showUserList={showUserList}/>
            </GroupSubScreenTop_Container>
            <GroupSubScreenContent_Container>
                {clickState === "투표" &&
                    <Vote groupId={param}
                          subWidth={subScreenWidth}/>}
                {clickState === "공지" &&
                    <Notice groupId={param}
                            subWidth={subScreenWidth}/>}
            </GroupSubScreenContent_Container>
        </GroupSubScreen_Container>
    )
}