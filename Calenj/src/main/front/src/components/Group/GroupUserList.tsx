import React, {useEffect, useRef, useState} from 'react';
import {UserListView} from '../../style/FormStyle'
import {connect} from "react-redux";
import {
    DispatchStompProps,
    mapDispatchToStompProps,
    StompData,
    mapStateToStompProps
} from '../../store/module/StompReducer';
import {useQueryClient} from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../store/ReactQuery/QueryKey";
import {GroupUserList_Container} from "../../style/Group/GroupUserListStyle";

interface qeuryProps {
    isLoading :boolean
}
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


const GroupUserList: React.FC<StompData & DispatchStompProps & qeuryProps> = ({stomp, isLoading}) => {
    const [groupDetail,setGroupDetail] = useState<groupDetails>();
    const queryClient = useQueryClient();


    //그룹 디테일 불러오기
    useEffect( () => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY,stomp.param]));
    }, [isLoading,stomp.param]);

    return (
        <GroupUserList_Container>
            {groupDetail &&
                (groupDetail.members.map((member) => (
                <UserListView key={member.userEmail}>
                    {localStorage.getItem(`userId`) === member.userEmail ?
                        <span>(나) {member.nickName} </span> :
                        <span>{member.nickName} </span>}
                    {member.onlineStatus === 'ONLINE' ?
                        <span style={{color: "green"}}> ● </span> :
                        <span style={{color: "red"}}> ● </span>
                    }
                </UserListView>)))
            }
        </GroupUserList_Container>

    );
}

export default connect(mapStateToStompProps, mapDispatchToStompProps)(GroupUserList);