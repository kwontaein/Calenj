import {SelectItem_Container} from "../../../style/Group/GrouypByNavigationSelectBoxStyle";
import RequestInviteGroup from "../Invite/RequestInviteGroup";
import {connect, useSelector} from 'react-redux'
import {
    NavigateState,
    mapStateToNavigationProps,
} from '../../../store/slice/NavigatgionSlice'




const SubNavigationSelectBox:React.FC<NavigateState> = ({navigateInfo}) =>{

    return(
        <SelectItem_Container>
            <RequestInviteGroup groupId={navigateInfo.navigateParam}/>
        </SelectItem_Container>
    )
}
export default connect(mapStateToNavigationProps,null) (SubNavigationSelectBox);