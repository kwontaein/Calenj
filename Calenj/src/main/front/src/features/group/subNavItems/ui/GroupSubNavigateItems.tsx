import {
    Hr_SubNavigation, ListToggleDiv, SubNavigateContents_Container,
} from "./GroupSubNavigationStyle";
import {useSubNavState} from '../model/useSubNavState';
import {SubNavigationButton} from "./SubNavigationButton";
import {SubNavigationProps} from "../model/types";

export const GroupSubNavigateItems:React.FC<SubNavigationProps> = ({groupId}) =>{
    const [toggleState,toggleHandler,subItemsHandler] = useSubNavState(groupId)


    return(
        <SubNavigateContents_Container>
            <SubNavigationButton subItem={'그룹일정'} subItemsHandler={subItemsHandler} />
            <Hr_SubNavigation/>
                <ListToggleDiv onClick={toggleHandler}>
                    {toggleState ?
                        <i style={{marginRight: '5px'}} className="fi fi-rr-angle-small-down"/> :
                        <i style={{marginRight: '5px'}} className="fi fi-sr-angle-small-right"/>
                    }
                    공지/투표
                </ListToggleDiv>
                {toggleState&&
                <div>
                    <SubNavigationButton subItem={'공지'} subItemsHandler={subItemsHandler} />
                    <SubNavigationButton subItem={'투표'} subItemsHandler={subItemsHandler}/>
                </div>
                }
        </SubNavigateContents_Container>
    )
}
