import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import MakeGroup from './MakeGroup';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {stateFilter} from '../../stateFunc/actionFun'
import {
    DEFAULT_HR, DEFAULT_HR2, DIV_FULL_HEIGHT,
    GlobalStyles,
    GROUP_LIST,
    GROUP_LIST_VIEW,
    ListView,
    MiniText,
    NotificationCount
} from '../../style/FormStyle'
import {sagaTask} from '../../store/store'
import {endPointMap} from '../../store/module/StompMiddleware'
import {RowFlexBox} from '../../style/FormStyle'
import {connect} from 'react-redux'
import {mapStateToStompProps, StompData} from '../../store/module/StompReducer'

interface GroupList {
    groupId: number | string;
    groupTitle: string;
    groupCreated: string;
}

interface error {
    message: string;
}

export const QUERY_GROUP_LIST_KEY: string = 'groupList'

const GroupList: React.FC<StompData> = ({stomp}) => {
    const [showMakeGroup, setShowMakeGroup] = useState<boolean>(false);
    const navigate = useNavigate();
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

    const redirectDetail = (groupId: number) => {
        navigate("/details", {state: {groupId: groupId}});
    }

    const closeModal = () => {
        setShowMakeGroup(false);
    };
    const goHome = () => {
        navigate("/");
    };

    return (
        <GlobalStyles>
            {showMakeGroup && <MakeGroup onClose={closeModal} queryState={groupListState}></MakeGroup>}
            {groupListState.isLoading && <div>Loading...</div>}
            {groupListState.data && (
                <DIV_FULL_HEIGHT style={{height: "100%"}}>
                    <GROUP_LIST>
                        <GROUP_LIST_VIEW onClick={() => goHome()}>CalenJ</GROUP_LIST_VIEW>
                        <DEFAULT_HR2/>
                        {groupListState.data.map((group) => (
                            <GROUP_LIST_VIEW key={group.groupId}
                                             onClick={() => redirectDetail(group.groupId as number)}>
                                <div style={{textAlign: "center"}}>
                                    {group.groupTitle}
                                </div>
                                <NotificationCount
                                    style={{marginLeft: 'auto'}}>{endPointMap.get(group.groupId) && endPointMap.get(group.groupId)}</NotificationCount>
                            </GROUP_LIST_VIEW>
                        ))}
                        <GROUP_LIST_VIEW onClick={() => setShowMakeGroup(true)}>+</GROUP_LIST_VIEW>
                    </GROUP_LIST>
                </DIV_FULL_HEIGHT>
            )}
        </GlobalStyles>
    )
}
export default connect(mapStateToStompProps, null)(GroupList);