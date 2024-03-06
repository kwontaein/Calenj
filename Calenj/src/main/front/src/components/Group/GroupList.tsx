import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import MakeGroup from './MakeGroup';
import axios from 'axios';
import {useState} from 'react';


interface GroupList {
    UUID: number;
    groupTitle: string;
    groupCreated: string;
    groupCreater: string;
}

const GroupList: React.FC = () => {
    const [showMakeGroup, setShowMakeGroup] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const QUERY_GROUP_LIST_KEY: string = 'groupList'


    //그룹 목록 불러오기
    const getGroupList = async (): Promise<GroupList[]> => {
        const response = await axios.get('/api/groupList')
        console.log('그룹 목록을 불러옵니다.')
        return response.data;
    }

    const groupListState = useQuery<GroupList[], Error>({
        queryKey: [QUERY_GROUP_LIST_KEY],
        queryFn: getGroupList //HTTP 요청함수 (Promise를 반환하는 함수)
    });


    const closeModal = () => {
        setShowMakeGroup(false);
    };

    return (
        <div>
            <button onClick={() => setShowMakeGroup(true)}>그룹 생성</button>
            {showMakeGroup && <MakeGroup onClose={closeModal}></MakeGroup>}
            {groupListState.data && groupListState.data.map((group) => (
                <div key={group.UUID}>
                    <div>Group Title: {group.groupTitle}</div>
                </div>

            ))}
        </div>
    )

}
export default GroupList;