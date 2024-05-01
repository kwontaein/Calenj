import {SelectItem_Container} from "../../style/Group/GrouypByNavigationSelectBoxStyle";
import RequestInviteGroup from "./Invite/RequestInviteGroup";
import {connect} from 'react-redux'
import {
    NavigateState,
    DispatchNavigationProps,
    mapStateToNavigationProps,
    mapDispatchToNavigationProps,
} from '../../store/slice/NavigateByComponent'
const GrouypByNavigationSelectBox:React.FC<NavigateState> = ({navigateInfo}) =>{

    return(
        <SelectItem_Container>
            <RequestInviteGroup groupId={navigateInfo.navigateParam}/>
        </SelectItem_Container>
    )
}
export default connect(mapStateToNavigationProps,null) (GrouypByNavigationSelectBox);