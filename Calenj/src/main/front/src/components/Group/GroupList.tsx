import {useQuery/*, useMutation, useQueryClient*/} from '@tanstack/react-query';
import MakeGroup from './MakeGroup';
import axios, {/*AxiosResponse,*/ AxiosError, AxiosResponse} from 'axios';
import React, {useState} from 'react';
/*import {redirect} from "react-router-dom";
import {off} from 'process';
import {object, string} from 'yup';*/
import {useNavigate} from "react-router-dom";
import {stateFilter} from '../../stateFunc/actionFun'


interface GroupList {
    groupId: number | string;
    groupTitle: string;
}

interface cookieState {
    cookie: boolean;
}

/*interface error {
    message: string;
}*/


export const QUERY_GROUP_LIST_KEY: string = 'groupList'

const GroupList: React.FC<cookieState> = ({cookie}) => {
    const [showMakeGroup, setShowMakeGroup] = useState<boolean>(false);
    const navigate = useNavigate();
    /* const [loading, setLoading] = useState<boolean>(false);*/

    //그룹 목록 불러오기
    const getGroupList = async (): Promise<GroupList[] | null> => {
        try {
            const response = await axios.get('/api/groupList');
            console.log('그룹 목록을 불러옵니다.');
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            console.log(axiosError);
            if (axiosError.response?.data) {
                stateFilter((axiosError.response.data) as string);
            }
            return null;
        }


    }

    const groupListState = useQuery<GroupList[] | null, Error>({
        queryKey: [QUERY_GROUP_LIST_KEY],
        queryFn: getGroupList, //HTTP 요청함수 (Promise를 반환하는 함수)
        enabled: cookie,
    });
    const redirectDetail = (groupId: number) => {
        navigate("/details", {state: {groupId: groupId}});
    }

    const closeModal = () => {
        setShowMakeGroup(false);
        groupListState.refetch().then(r => "fetch");
    };

    // const joinUser = (groupId: number) => {
    //     axios.post('/api/joinGroup', groupId)
    //         .then((response: AxiosResponse<Object>) => {
    //             console.log("응애");
    //         })
    //         .catch(error => {
    //             stateFilter(error.response.data)
    //         })
    // };
    return (
        <div>
            <button onClick={() => setShowMakeGroup(true)}>그룹 생성</button>
            {showMakeGroup && <MakeGroup onClose={closeModal}></MakeGroup>}
            {groupListState.isLoading && <div>Loading...</div>}
            {groupListState.data && (
                <div>
                    <h2>Group List</h2>
                    <ul>
                        {groupListState.data.map((group) => (
                            <li key={group.groupId} onClick={() => redirectDetail(group.groupId as number)}>
                                <b>{group.groupTitle}</b>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {/*<div onClick={() => joinUser(group.groupId as number)}>ㅋㅋ</div>*/}
        </div>
    )

}
export default GroupList;