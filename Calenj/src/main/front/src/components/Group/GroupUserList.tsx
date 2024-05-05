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
import {QUERY_GROUP_DETAIL_KEY} from "../../store/ReactQuery/queryManagement";
import {GroupUserList_Container, UserProfile} from "../../style/Group/GroupUserListStyle";


interface qeuryProps {
    isLoading: boolean
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
    const [groupDetail, setGroupDetail] = useState<groupDetails>();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const queryClient = useQueryClient();
    const calenj_logo = '/image/Logo.png';

    useEffect(() => {
        if (stomp.receiveMessage.state == "ONLINE") {
            console.log(`온라인 유저 리스트 : ${stomp.receiveMessage.onlineUserList}`)
        }
    }, [stomp.receiveMessage])

    //그룹 디테일 불러오기
    useEffect(() => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY, stomp.param]));
    }, [isLoading, stomp.param]);


    const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = calenj_logo
    }

    return (
        <GroupUserList_Container>
            {groupDetail &&
                (groupDetail.members.map((member) => (
                    <UserListView key={member.userEmail}>
                        <UserProfile src={`/image/savedImage/${member.userEmail}.jpeg`}
                                     onError={onErrorImg}
                                     isOnline={stomp.receiveMessage.onlineUserList.includes(member.userEmail)}/>
                        <span>
                            {member.nickName} {localStorage.getItem(`userId`) === member.userEmail && '(나)'}
                        </span>
                    </UserListView>)))
            }
        </GroupUserList_Container>

    );
}

export default connect(mapStateToStompProps, mapDispatchToStompProps)(GroupUserList);