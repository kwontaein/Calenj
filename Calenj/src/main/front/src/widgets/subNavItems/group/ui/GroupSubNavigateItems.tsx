import {
    Hr_SubNavigation, ListToggleDiv, SubNavigateContents_Container,
} from "./GroupSubNavigationStyle";
import {connect} from "react-redux";
import {
    mapDispatchToSubNavigationProps,
    mapStateToSubNavigationProps,
} from "../../../../store/slice/SubNavigationSlice";
import {SubNavigationButton} from '../../../../features/navgiation/subNavgation'
import {useSubNavState,SubNavProps} from '../../../../features/navgiation/subNavgation';


const groupSubNavigateItems:React.FC<SubNavProps> = ({groupId,subNavigateInfo}) =>{
    const [toggleState,toggleHandler,subItemsHandler] = useSubNavState(groupId)

    return(
        <SubNavigateContents_Container>
                <Hr_SubNavigation/>
                <SubNavigationButton subItem={'그룹일정'} clickState={subNavigateInfo.clickState} subItemsHandler={subItemsHandler} />
                <ListToggleDiv onClick={toggleHandler}>
                    {toggleState ?
                        <i style={{marginRight: '5px'}} className="fi fi-rr-angle-small-down"/> :
                        <i style={{marginRight: '5px'}} className="fi fi-sr-angle-small-right"/>
                    }
                    공지/투표
                </ListToggleDiv>
                {toggleState&&
                <div>
                    <SubNavigationButton subItem={'공지'} clickState={subNavigateInfo.clickState} subItemsHandler={subItemsHandler} />
                    <SubNavigationButton subItem={'투표'} clickState={subNavigateInfo.clickState} subItemsHandler={subItemsHandler}/>
                </div>
                }
        </SubNavigateContents_Container>
    )
}
export const GroupSubNavigateItems = connect(mapStateToSubNavigationProps,mapDispatchToSubNavigationProps) (groupSubNavigateItems)