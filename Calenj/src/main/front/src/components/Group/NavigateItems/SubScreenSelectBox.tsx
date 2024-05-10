import {SelectItem_Container} from "../../../style/Group/GrouypByNavigationSelectBoxStyle";
import {
    SubNavigateState,
    DispatchSubNavigationProps,
    mapStateToSubNavigationProps,
    mapDispatchToSubNavigationProps,
} from "../../../store/slice/SubNavigationSlice";
import {connect} from "react-redux";
import {SubScreenSelecter_Container} from "../../../style/Group/SubScreenSelcetBoxStyle";
const SubScreenSelectBox:React.FC<SubNavigateState&DispatchSubNavigationProps> =({subNavigateInfo})=>{
    return(
        <SubScreenSelecter_Container>

        </SubScreenSelecter_Container>
    )
}
export default connect(mapStateToSubNavigationProps, mapDispatchToSubNavigationProps) (SubScreenSelectBox);