import {
    SubNavigateTopBar,
    SubNavigateTopBar_EventSelecter_Container,
    SubNavigateTopBar_leftContent, SubNavigateTopBar_rightContent_item
} from "../../../style/Navigation/SubNavigationStyle";
import GrouypByNavigationSelectBox from "./GroupByNavigationSelectBox";
import {useEffect, useState} from "react";

interface subNaviationTopProps{
    groupTitle:string,
}
const GroupSubNavigateTopItems:React.FC<subNaviationTopProps> = ({groupTitle})=>{
    const [showEventSelecter,setShowEventSelecter] = useState<boolean>(false);

    useEffect(() => {
        setShowEventSelecter(false)
    }, [groupTitle]);

    return(
        <SubNavigateTopBar onClick={()=>{setShowEventSelecter(!showEventSelecter)}}>
            <SubNavigateTopBar_leftContent>
                {groupTitle}
            </SubNavigateTopBar_leftContent>
            <SubNavigateTopBar_EventSelecter_Container>
                {showEventSelecter ?
                    <SubNavigateTopBar_rightContent_item
                        onClick={()=>{setShowEventSelecter(!showEventSelecter)}}>
                        ×
                    </SubNavigateTopBar_rightContent_item> :
                    <i style={{fontSize:'21px', marginTop:'5px', cursor:'pointer'}} className="fi fi-rr-angle-small-down">
                    </i>
                }
                {showEventSelecter &&<GrouypByNavigationSelectBox/>}
            </SubNavigateTopBar_EventSelecter_Container>
        </SubNavigateTopBar>
    )
}
export default  GroupSubNavigateTopItems;