import {useEffect, useState} from 'react';
import {useFetchFriendsList} from "../../../../entities/reactQuery";
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
                    
                </>}
        </div>
    )
}
