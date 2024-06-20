import axios, {AxiosResponse, AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {UserListView, MiniText} from '../../../../shared/ui/SharedStyled'
import {useFetchFriendsList} from "../../../../entities/reactQuery";
import {addFriendApi} from "../api/addFrendApi";






const FriendList: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    //그룹 목록 불러오기
    const friendListState = useFetchFriendsList();


    return (
        <div>
            <div>
                <input type="text" value={inputValue} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setInputValue(e.target.value)}/>
                <button onClick={() => addFriendApi(inputValue)}>친구 추가</button>
            </div>
            {friendListState.isLoading && <div>Loading...</div>}
            {friendListState.data && (
                <div>
                    <h2>Friend List</h2>
                    <ul>
                        {friendListState.data.map((friends) => (
                            <UserListView key={friends.friendId}>
                                {friends.nickName}
                            </UserListView>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
export default FriendList;