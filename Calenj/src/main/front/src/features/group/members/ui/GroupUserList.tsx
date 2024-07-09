import React, {useEffect, useRef, useState} from 'react';
import {UserListView} from '../../../../shared/ui/SharedStyled'
import {useSelector} from "react-redux";
import {useQueryClient} from "@tanstack/react-query";
import {QUERY_GROUP_DETAIL_KEY} from "../../../../entities/reactQuery";
import {GroupUserList_Container, UserProfile} from "./GroupUserListStyled";
import {MemberInfo} from "./MemberInfo";
import {RootState} from "../../../../entities/redux";
import {GroupDetail, groupMembers} from "../../../../entities/reactQuery";



export const GroupUserList: React.FC = () => {
    const [groupDetail, setGroupDetail] = useState<GroupDetail>();
    const queryClient = useQueryClient();
    const calenj_logo = '/image/Logo.png';
    const [selectedUser, setSelectedUser] = useState<groupMembers | null>(null); // 모달 창을 표시할 유저 정보 상태

    const stomp = useSelector((state: RootState) => state.stomp); // 리덕스 상태 구독


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

    return (
        <GroupUserList_Container>
            {groupDetail &&
                (groupDetail.members.map((member) => (
                    <UserListView key={member.userId} onClick={() => setSelectedUser(member)}>
                        <UserProfile src={`/image/savedImage/${member.userId}.jpeg`}
                                     onError={onErrorImg}
                                     $isOnline={stomp.receiveMessage.onlineUserList.includes(member.userId)}/>
                        <span style={{height:'100%', display:'flex', alignItems:'center'}}>
                            {member.nickName} {localStorage.getItem(`userId`) === member.userId && '(나)'}
                        </span>
                    </UserListView>)))
            }
            {/* 모달 창 */}
            {selectedUser && <MemberInfo user={selectedUser} onClose={()=>setSelectedUser(null)}/>}
        </GroupUserList_Container>

    );
}

