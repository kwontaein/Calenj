import {useFetchUserChatList} from "../../../../entities/reactQuery";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import styled from "styled-components";
import {BackGroundColor, ProfileContainer, TextColor} from "../../../../shared/ui/SharedStyled";
import {useEffect, useMemo, useState} from "react";
import {useFriendChat} from "../model/useFriendChat";

const FriendChatList_Container = styled.ul`
    appearance: none;
    margin: 5px;
    padding: 0;
    width: calc(100% - 10px);
    height: calc(100% - 20px);
    overflow-y: auto;
`
const FriendChatList_Item_Wrapper = styled.li`
    height: 35px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    padding-inline: 15px;
    border-radius: 5px;
    &:hover{
        background-color: ${BackGroundColor};
    }
`
const FriendUserName_Wrapper = styled.div`
    width: calc(100% - 45px);
    padding-left: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
const FriendDeleteIcon_Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: ${TextColor}77;
    transition: color 0.3s ease;
    &:hover{
        color: ${TextColor};
    }
`

export const FriendChatList :React.FC = ()=> {
    const userId = localStorage.getItem('userId') || ''
    const userChatList = useFetchUserChatList(userId)
    const {userNameRegister} = useSelector((state:RootState)=> state.userNameRegister)
    const [hover,setHover] = useState<string|null>(null)
    const startChat =useFriendChat(userId)

    useEffect(() => {
        console.log(userChatList.data)
    }, [userChatList]);

    return (
        <>
        {userChatList.isLoading && <div>Loading..</div>}
        {userChatList.data &&
            <FriendChatList_Container>
                {userChatList.data.map((user)=>(
                    user.open &&
                    <FriendChatList_Item_Wrapper key={user.chatListId}
                                                 onMouseEnter={()=>setHover(user.friendId)}
                                                 onMouseLeave={()=>setHover(null)}>
                        <ProfileContainer $userId={user.friendId} style={{width:'35px', height:'35px', boxSizing:'border-box'}}/>
                        <FriendUserName_Wrapper>
                            {userNameRegister[user.friendId].userName}
                        </FriendUserName_Wrapper>
                        {hover && hover===user.friendId &&
                            <FriendDeleteIcon_Wrapper onClick={()=>startChat(user.friendId, false)}>
                                <i className="bi bi-x-lg"></i>
                            </FriendDeleteIcon_Wrapper>
                        }
                    </FriendChatList_Item_Wrapper>
                ))}
            </FriendChatList_Container>
        }
        </>
    )
}

