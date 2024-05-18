import {useEffect, useState} from "react";
import {
    SubNavigation_Container,
} from '../../../../style/Navigation/SubNavigationStyle'
import {connect} from 'react-redux'
import {
    NavigateState,
    mapStateToNavigationProps,
} from '../../../../store/slice/NavigatgionSlice'
import {useIsFetching, useQueryClient, useQuery } from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../../../entities/ReactQuery/model/queryModel";
import GrouypByNavigationSelectBox from "../../../../components/Group/NavigateItems/SubNavigationSelectBox";
import GroupSubNavigateItems from "../../../../components/Group/NavigateItems/GroupSubNavigateItems";
import GroupSubNavigateTopItems from "../../../../components/Group/NavigateItems/GroupSubNavigateTopItems";
import {GroupDetail} from "../../../../entities/ReactQuery";

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

            {(navigateInfo.navigate === "group" && groupDetail && !isLoading )&&
                <GroupSubNavigateTopItems groupTitle={groupDetail.groupTitle}/>
            }
            {(navigateInfo.navigate === "group" && groupDetail && !isLoading)&&
                <GroupSubNavigateItems groupId={groupDetail.groupId}/>
            }
        </SubNavigation_Container>
    )
}
export default connect(mapStateToNavigationProps,null) (SubNavigationbar);