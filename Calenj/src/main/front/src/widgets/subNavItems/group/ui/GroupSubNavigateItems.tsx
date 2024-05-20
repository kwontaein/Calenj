import {
    Hr_SubNavigation, ListToggleDiv, SubNavigateContents_Container,
} from "./GroupSubNavigationStyle";
import {connect, useDispatch} from "react-redux";
import {
    mapDispatchToSubNavigationProps,
    mapStateToSubNavigationProps,
} from "../../../../store/slice/SubNavigationSlice";
import {SubNavProps} from "../model/types";
import {SubNavationButton} from '../../../../features/navgiation/subNavgation'
import {useSubNavState} from '../model/useClickState'


const groupSubNavigateItems:React.FC<SubNavProps> = ({groupId,subNavigateInfo}) =>{
    const dispatch = useDispatch()
    const [toggleState,toggleHandler,subItemsHandler] = useSubNavState(groupId,dispatch)

    return(
        <SubNavigateContents_Container>
                <Hr_SubNavigation/>
                <SubNavationButton subItem={'그룹일정'} clickState={subNavigateInfo.clickState} subItemsHandler={subItemsHandler} />
                <ListToggleDiv onClick={toggleHandler}>
                    {toggleState ?
                        <i style={{marginRight: '5px'}} className="fi fi-rr-angle-small-down"/> :
                        <i style={{marginRight: '5px'}} className="fi fi-sr-angle-small-right"/>
                    }
                    공지/투표
                </ListToggleDiv>
                {toggleState&&
                <div>
                    <SubNavationButton subItem={'공지'} clickState={subNavigateInfo.clickState} subItemsHandler={subItemsHandler} />
                    <SubNavationButton subItem={'투표'} clickState={subNavigateInfo.clickState} subItemsHandler={subItemsHandler}/>
                </div>
                }
        </SubNavigateContents_Container>
    )
}
export const GroupSubNavigateItems = connect(mapStateToSubNavigationProps,mapDispatchToSubNavigationProps) (groupSubNavigateItems)