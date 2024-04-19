import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import MakeGroup from './MakeGroup';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {useEffect, useState,useMemo} from 'react';
import {useNavigate} from "react-router-dom";
import {stateFilter} from '../../stateFunc/actionFun'
import {
    GroupList_Container,
    GroupListSub_Container,
    Btn_CalenJ_Icon,
    Li_GroupList_Item,
    GroupListTitle,
    GroupList_HR,
    Btn_MakeGroup,
    SignOfMessageNum,
} from '../../style/Group/GroupListStyle';
import {endPointMap} from '../../store/module/StompMiddleware'
import {connect} from 'react-redux'
import {mapStateToStompProps, StompData} from '../../store/module/StompReducer'

interface GroupList {
    groupId: string;
    groupTitle: string;
    groupCreated: string;
}

interface NavigationProps{
    redirectDetail : (navigate:string,groupId:string)=>void
}
export const QUERY_GROUP_LIST_KEY: string = 'groupList'

const GroupList: React.FC<StompData & NavigationProps> =({stomp,redirectDetail}) => {
    const [showMakeGroup, setShowMakeGroup] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    //그룹 목록 불러오기
    const getGroupList = async (): Promise<GroupList[] | null> => {
        try {
            const response = await axios.get('/api/groupList');
            const data = response.data as GroupList[];
            const dataSort = data.sort((a, b) => {
                return (Number(b.groupCreated) - Number(a.groupCreated));
            })
            return dataSort;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if (axiosError.response?.status) {
                console.log(axiosError.response.status);
                stateFilter((axiosError.response.status).toString());
            }
            return null;
        }
    }


    const groupListState = useQuery<GroupList[] | null, Error>({
        queryKey: [QUERY_GROUP_LIST_KEY],
        queryFn: getGroupList, //HTTP 요청함수 (Promise를 반환하는 함수)
        enabled: stomp.isOnline,
    });

    useEffect(() => {
        if(groupListState.data) redirectDetail("group",groupListState.data[0].groupId)
    }, [groupListState.isLoading]);

    const closeModal = () => {
        setShowMakeGroup(false);
    };

    interface ALARM{
        param:string;
        alramNum:number;
    }
  

    return (
        <div>
            {showMakeGroup && <MakeGroup onClose={closeModal} queryState={groupListState}></MakeGroup>}
            {groupListState.isLoading && <div>Loading...</div>}
            {groupListState.data && (
                <GroupList_Container>
                    <Btn_CalenJ_Icon></Btn_CalenJ_Icon>
                    <GroupList_HR/>
                    <GroupListSub_Container>
                        {groupListState.data.map((group) => (
                            <Li_GroupList_Item key={group.groupId}
                                               onClick={() => redirectDetail("group", group.groupId)}>
                                <GroupListTitle>
                                    {group.groupTitle}
                                </GroupListTitle>
                                <SignOfMessageNum $existMessage={endPointMap.get(group.groupId) === 0}>
                                    {endPointMap.get(group.groupId) !== 0 && endPointMap.get(group.groupId)}
                                </SignOfMessageNum>
                            </Li_GroupList_Item>
                        ))}
                    </GroupListSub_Container>
                    <Btn_MakeGroup onClick={() => setShowMakeGroup(true)}>+</Btn_MakeGroup>
                </GroupList_Container>
            )}
        </div>
    )
}
export default connect(mapStateToStompProps, null)(GroupList);