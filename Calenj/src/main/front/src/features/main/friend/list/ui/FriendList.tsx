import {useEffect, useState} from 'react';
import {UserListView, MiniText} from '../../../../../shared/ui/SharedStyled'
import {useFetchFriendsList} from "../../../../../entities/reactQuery";
import {addFriendApi} from "../../request/api/addFrendApi";
import {FriendTop_Container, TopContent_Container, TopIcon_Container} from "./FriendListStyled";






export const FriendList: React.FC = () => {
    const [friendToggle, setFriendToggle] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string>('');
    //그룹 목록 불러오기
    const friendListState = useFetchFriendsList();


    return (
        <div>
            <FriendTop_Container onClick={() => setFriendToggle(prev => !prev)}>
                <TopContent_Container>
                    친구
                </TopContent_Container>
                <TopIcon_Container>
                    {friendToggle ?
                        <i className="fi fi-sr-angle-small-up"></i> :
                        <i className="fi fi-sr-angle-small-down"></i>
                    }
                </TopIcon_Container>
            </FriendTop_Container>
            {friendToggle &&
            <>
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
            </>}
        </div>
    )
}
