import {EventManagement_Container, SubNavigateTopBar} from '../../style/Navigation/EventManagementStyle'
import {useQueryClient} from "@tanstack/react-query";
import {connect} from 'react-redux'
import {
    NavigateState,
    mapStateToNavigationProps,
} from '../../store/slice/NavigateByComponent'
import {useEffect, useState} from "react";
import {QUERY_GROUP_DETAIL_KEY} from "../../store/ReactQuery/QueryKey";



interface groupDetails {
    groupId: string;
    groupTitle: string;
    groupCreated: string;
    groupCreater: string;
    members: groupMembers[];
}

interface groupMembers {
    groupRoleType: String;
    group_user_location: String;
    nickName: String;
    onlineStatus: string;
    userEmail: string;
}



const EventManagementBar : React.FC<NavigateState> = ({navigateInfo}) =>{
    const [groupDetail,setGroupDetail] = useState<groupDetails>();
    const queryClient = useQueryClient();

    //그룹 디테일 불러오기
    useEffect(() => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,navigateInfo.navigateParam]));
    }, [queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,navigateInfo.navigateParam])]);

    return (
        <EventManagement_Container>
            <SubNavigateTopBar>
                {navigateInfo.navigate === "group" &&
                    (groupDetail&&
                    <div>{groupDetail.groupTitle}</div>
                    )
                }
            </SubNavigateTopBar>
        </EventManagement_Container>
    )
}
export default  connect(mapStateToNavigationProps,null)(EventManagementBar);