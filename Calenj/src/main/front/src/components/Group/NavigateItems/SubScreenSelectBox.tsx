import {SelectItem_Container} from "../../../style/Group/GrouypByNavigationSelectBoxStyle";
import {
    SubNavigateState,
    DispatchSubNavigationProps,
    mapStateToSubNavigationProps,
    mapDispatchToSubNavigationProps,
} from "../../../store/slice/SubNavigationSlice";
import {connect} from "react-redux";
import {SubScreenIcon_Container, SubScreenSelecter_Container} from "../../../style/Group/SubScreenSelcetBoxStyle";
import {useEffect} from "react";

const SubScreenSelectBox:React.FC<SubNavigateState & DispatchSubNavigationProps> =({subNavigateInfo,updateSubScreenStateOption})=>{

    useEffect(() => {

    }, []);

    return(
        <div>
            {(subNavigateInfo.clickState ==="투표" || subNavigateInfo.clickState ==="공지") &&
            <SubScreenSelecter_Container>
                <SubScreenIcon_Container onClick={()=>{updateSubScreenStateOption({stateOption:"filter"})}}>
                    <i className="fi fi-rs-filter" style={{marginTop: "3px"}}></i>
                </SubScreenIcon_Container>

                <SubScreenIcon_Container onClick={()=>{updateSubScreenStateOption({stateOption:"search"})}}>
                    <i className="fi fi-br-search" style={{marginTop: "3px"}}></i>
                </SubScreenIcon_Container>

                <SubScreenIcon_Container onClick={()=>{updateSubScreenStateOption({stateOption:"add"})}}>
                    <i className="fi fi-sr-plus-small" style={{marginTop: "3px", fontSize:"20px"}}></i>
                </SubScreenIcon_Container>

            </SubScreenSelecter_Container>
            }
        </div>

    )
}
export default connect(mapStateToSubNavigationProps, mapDispatchToSubNavigationProps) (SubScreenSelectBox);