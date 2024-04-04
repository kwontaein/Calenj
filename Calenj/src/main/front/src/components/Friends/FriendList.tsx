import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import axios, {AxiosResponse, AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {stateFilter} from '../../stateFunc/actionFun'
import {ListView, MiniText} from '../../style/FormStyle'


interface GroupList {
    groupId: number | string;
    groupTitle: string;
    groupCreated: string;
}

interface cookieState {
    cookie: boolean;
}

interface error {
    message: string;
}


export const QUERY_GROUP_LIST_KEY: string = 'groupList'

const FriendList: React.FC = () => {
    const [showMakeGroup, setShowMakeGroup] = useState<boolean>(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    //그룹 목록 불러오기
    const getGroupList = async (): Promise<GroupList[] | null> => {
        try {
            const response = await axios.get('/api/getFriendList');
            console.log('친구 목록을 불러옵니다.');
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
    });

    const redirectDetail = (groupId: number) => {
        navigate("/details", {state: {groupId: groupId}});
    }

    return (
        <div>
            <button onClick={() => setShowMakeGroup(true)}>그룹 생성</button>
            {groupListState.isLoading && <div>Loading...</div>}
            {groupListState.data && (
                <div>
                    <h2>Group List</h2>
                    <ul>
                        {groupListState.data.map((group) => (
                            <ListView key={group.groupId}
                                      onClick={() => redirectDetail(group.groupId as number)}>
                                {group.groupTitle}
                            </ListView>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )

}
export default FriendList;