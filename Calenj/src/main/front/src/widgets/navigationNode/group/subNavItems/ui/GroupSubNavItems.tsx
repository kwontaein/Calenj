import {GroupSubNavigateItems, GroupSubNavigateTopItems} from "../../../../../features/group/subNavItems";
import {useEffect, useState} from "react";
import {GroupDetail, QUERY_GROUP_DETAIL_KEY} from "../../../../../entities/reactQuery";
import {useQueryClient} from "@tanstack/react-query";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";

export const GroupSubNavItems: React.FC = ()=>{
    const [groupDetail,setGroupDetail] = useState<GroupDetail>();
    const queryClient = useQueryClient();
    const navigateInfo = useSelector((state:RootState) => state.navigateInfo);

    //그룹 디테일 불러오기
    useEffect( () => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,navigateInfo.navigateParam]));
    }, [navigateInfo.navigateParam]);
    return(
        <>
            {groupDetail &&
                <>
                <GroupSubNavigateTopItems groupTitle={groupDetail.groupTitle}/>
                <GroupSubNavigateItems groupId={groupDetail.groupId}/>
                </>
            }
        </>
    )
}