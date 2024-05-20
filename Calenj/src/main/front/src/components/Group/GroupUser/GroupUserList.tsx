import React, {useEffect, useRef, useState} from 'react';
import {UserListView} from '../../../style/FormStyle'
import {connect} from "react-redux";
import {
    DispatchStompProps,
    mapDispatchToStompProps,
    StompData,
    mapStateToStompProps
} from '../../../store/module/StompReducer';
import {useQueryClient} from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../../entities/ReactQuery/model/queryModel";
import {GroupUserList_Container, UserProfile} from "../../../style/Group/GroupUserListStyle";
import UserModal from "./UserModal";


interface qeuryProps {
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


const GroupUserList: React.FC<StompData & DispatchStompProps> = ({stomp}) => {
    const [groupDetail, setGroupDetail] = useState<groupDetails>();
    const queryClient = useQueryClient();
    const calenj_logo = '/image/Logo.png';
    const [selectedUser, setSelectedUser] = useState<groupMembers | null>(null); // 모달 창을 표시할 유저 정보 상태

    useEffect(() => {
        if (stomp.receiveMessage.state == "ONLINE") {
            console.log(`온라인 유저 리스트 : ${stomp.receiveMessage.onlineUserList}`)
        }
    }, [stomp.receiveMessage])

    //그룹 디테일 불러오기
    useEffect(() => {
        setGroupDetail(queryClient.getQueryData([QUERY_GROUP_DETAIL_KEY, stomp.param]));
    }, [stomp.param]);


    const onErrorImg = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = calenj_logo
    }

    // 모달 창 표시 이벤트 핸들러
    const handleUserClick = (user: groupMembers) => {
        setSelectedUser(user);
    };
    // 모달 창 닫기 이벤트 핸들러
    const handleModalClose = () => {
        setSelectedUser(null);
    };

    return (
        <GroupUserList_Container>
            {groupDetail &&
                (groupDetail.members.map((member) => (
                    <UserListView key={member.userEmail} onClick={() => handleUserClick(member)}>
                        <UserProfile src={`/image/savedImage/${member.userEmail}.jpeg`}
                                     onError={onErrorImg}
                                     $isOnline={stomp.receiveMessage.onlineUserList.includes(member.userEmail)}/>
                        <span>
                            {member.nickName} {localStorage.getItem(`userId`) === member.userEmail && '(나)'}
                        </span>
                    </UserListView>)))
            }
            {/* 모달 창 */}
            {selectedUser && <UserModal user={selectedUser} onClose={handleModalClose}/>}
        </GroupUserList_Container>

    );
}

export default connect(mapStateToStompProps, mapDispatchToStompProps)(GroupUserList);