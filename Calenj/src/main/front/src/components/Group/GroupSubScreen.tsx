//SubNavigation의 내용을 보여주는 컴포넌트
import {connect} from 'react-redux'
import {
    SubNavigateState,
    mapStateToSubNavigationProps
} from "../../store/slice/SubNavigationSlice";
import {GroupSubScreen_Container} from "../../style/Group/GroupSubScreenStyle";
import Vote from "./Vote/Vote";
import Notice from "./Notice/Notice";

interface ContentsCompositionProps{
    groupId:string;
    memberLength?:number;
}



const GroupSubScreen : React.FC<SubNavigateState & ContentsCompositionProps> = ({subNavigateInfo,memberLength,groupId}) =>{


    return(
        <GroupSubScreen_Container>
            {(subNavigateInfo.clickState==="투표" && memberLength)&& <Vote member={memberLength} groupId={groupId}/>}
            {subNavigateInfo.clickState==="공지" && <Notice groupId={groupId}/>}
        </GroupSubScreen_Container>
    )
}
export default connect(mapStateToSubNavigationProps,null) (GroupSubScreen);