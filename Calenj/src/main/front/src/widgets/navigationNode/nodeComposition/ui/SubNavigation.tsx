import {useSelector} from 'react-redux'
import {RootState} from "../../../../entities/redux";
import {MainSubNavItems} from "../../main/subNavItems";
import {SubNavigation_Container} from "../../../../features/group/subNavItems/ui/GroupSubNavigationStyle";
import {GroupSubNavItems} from "../../group/subNavItems";

interface QueryProps {
    isLoading :boolean
}

export const SubNavigation:React.FC<QueryProps> =({isLoading})=>{
    const navigateInfo = useSelector((state:RootState) => state.navigateInfo);

    return  (
        <SubNavigation_Container>

            {(navigateInfo.navigate === "group" && !isLoading )&&
                <GroupSubNavItems/>
            }
            {navigateInfo.navigate ==="main" && <MainSubNavItems/>}
        </SubNavigation_Container>
    )
}
