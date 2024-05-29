import {useEffect, useState} from "react";
import {
    SubNavigation_Container,
} from '../../../../features/group/subNavItems/ui/GroupSubNavigationStyle'
import {useSelector} from 'react-redux'
import { useQueryClient } from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../../../entities/reactQuery/model/queryModel";
import {GroupSubNavigateTopItems,GroupSubNavigateItems} from "../../../../features/group/subNavItems";
import {GroupDetail} from "../../../../entities/reactQuery";
import {RootState} from "../../../../entities/redux/store";

interface QueryProps {
    isLoading :boolean
}

export const SubNavigation:React.FC<QueryProps> =({isLoading})=>{
    const [groupDetail,setGroupDetail] = useState<GroupDetail>();
    const queryClient = useQueryClient();
    const navigateInfo = useSelector((state:RootState) => state.navigateInfo);

    //그룹 디테일 불러오기
    useEffect( () => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,navigateInfo.navigateParam]));
    }, [isLoading,navigateInfo.navigateParam]);



    return  (
        <SubNavigation_Container>

            {(navigateInfo.navigate === "group" && groupDetail && !isLoading )&&
                <GroupSubNavigateTopItems groupTitle={groupDetail.groupTitle}/>
            }
            {(navigateInfo.navigate === "group" && groupDetail && !isLoading)&&
                <GroupSubNavigateItems groupId={groupDetail.groupId}/>
            }
        </SubNavigation_Container>
    )
}
