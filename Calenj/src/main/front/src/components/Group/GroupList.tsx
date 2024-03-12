import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import MakeGroup from './MakeGroup';
import axios from 'axios';
import { QUERY_COOKIE_KEY } from '../Auth/SignState';
import {useEffect, useState} from 'react';


interface GroupList {
    groupId: number;
    groupTitle: string;
}
interface cookieState{
    cookie:boolean;
}

export const QUERY_GROUP_LIST_KEY: string = 'groupList'

const GroupList: React.FC<cookieState> = ({cookie}) => {
    const [showMakeGroup, setShowMakeGroup] = useState<boolean>(false);
    const queryClient = useQueryClient();

   

    //그룹 목록 불러오기
    const getGroupList = async (): Promise<GroupList[]> => {
        const response = await axios.get('/api/groupList')
        console.log('그룹 목록을 불러옵니다.')
        return response.data;    
    }

    const groupListState = useQuery<GroupList[], Error>({
        queryKey: [QUERY_GROUP_LIST_KEY],
        queryFn: getGroupList, //HTTP 요청함수 (Promise를 반환하는 함수)
        enabled:cookie,
    });

    

    const closeModal = () => {
        setShowMakeGroup(false);
        groupListState.refetch();
    };

    


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
                                <li key={group.groupId}>{group.groupTitle}</li>
                            ))}
                        </ul>
                    </div>
            )}
            </div> 
    )

}
export default GroupList;