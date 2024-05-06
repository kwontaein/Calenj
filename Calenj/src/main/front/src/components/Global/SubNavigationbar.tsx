import {useEffect, useState} from "react";
import {
    SubNavigation_Container,
} from '../../style/Navigation/SubNavigationStyle'
import {connect} from 'react-redux'
import {
    NavigateState,
    mapStateToNavigationProps,
} from '../../store/slice/NavigatgionSlice'
import {useIsFetching, useQueryClient, useQuery } from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../store/ReactQuery/queryManagement";
import GrouypByNavigationSelectBox from "../Group/NavigateItems/GroupByNavigationSelectBox";
import GroupSubNavigateItems from "../Group/NavigateItems/GroupSubNavigateItems";
import GroupSubNavigateTopItems from "../Group/NavigateItems/GroupSubNavigateTopItems";
import {GroupDetail} from "../../store/ReactQuery/queryInterface";

interface qeuryProps {
    isLoading :boolean
}

const SubNavigationbar:React.FC<NavigateState & qeuryProps> =({navigateInfo,isLoading})=>{
    const [groupDetail,setGroupDetail] = useState<GroupDetail>();
    const queryClient = useQueryClient();


    //그룹 디테일 불러오기
    useEffect( () => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,navigateInfo.navigateParam]));
    }, [isLoading,navigateInfo.navigateParam]);



    return  (
        <SubNavigation_Container>
            {(navigateInfo.navigate === "group" &&groupDetail && !isLoading )&&
                <GroupSubNavigateTopItems groupTitle={groupDetail.groupTitle}/>
            }
            {(navigateInfo.navigate === "group" && groupDetail && !isLoading)&&
                <GroupSubNavigateItems groupId={groupDetail.groupId}/>
            }
        </SubNavigation_Container>
    )
}
export default connect(mapStateToNavigationProps,null) (SubNavigationbar);