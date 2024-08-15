import {useEffect, useState} from 'react';
import {useFetchFriendList} from "../../../../entities/reactQuery";
import {FriendTop_Container, TopContent_Container, TopIcon_Container} from "./FriendListStyled";
import {FriendChatList} from "./FriendChatList";


export const FriendList: React.FC = () => {
    const [friendToggle, setFriendToggle] = useState<boolean>(true);
    const [inputValue, setInputValue] = useState<string>('');


    return (
        <div>
            <FriendTop_Container onClick={() => setFriendToggle(prev => !prev)}>
                <TopContent_Container>
                    다이렉트 메시지
                </TopContent_Container>
                <TopIcon_Container>
                    {friendToggle ?
                        <i className="fi fi-sr-angle-small-up"></i> :
                        <i className="fi fi-sr-angle-small-down"></i>
                    }
                </TopIcon_Container>
            </FriendTop_Container>
            {friendToggle && <FriendChatList/>}
        </div>
    )
}
