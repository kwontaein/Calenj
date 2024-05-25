import {
    SubNavigateItem_Container,
    SubNavigateItem_Content,
    SubNavigateItem_Icon
} from "../../../../widgets/subNavItems/group/ui/GroupSubNavigationStyle";
import {connect, useDispatch} from "react-redux";
import {
    SubNavigateState,
    mapStateToSubNavigationProps,
} from "../../../../store/slice/SubNavigationSlice";
import {SubItemProps} from "../model/types";


const subNavigation:React.FC<SubNavigateState & SubItemProps> = ({ subItem,clickState,subItemsHandler}) =>{

    return(
        <SubNavigateItem_Container
            $isClick={clickState===subItem}
            onClick={()=>subItemsHandler(subItem)}>
            <SubNavigateItem_Icon>
                {subItem==="그룹일정" && <i className="fi fi-ss-calendar" style={{marginTop: '4px'}}></i>}
                {subItem==="투표" && <i className="fi fi-ss-vote-yea" style={{marginTop: '4px'}}></i>}
                {subItem==="공지" && <i className="fi fi-ss-megaphone" style={{marginTop: '4px'}}></i>}

            </SubNavigateItem_Icon>
            <SubNavigateItem_Content>
                {subItem}
            </SubNavigateItem_Content>
        </SubNavigateItem_Container>
    )
}

export const SubNavigationButton = connect(mapStateToSubNavigationProps,null) (subNavigation)