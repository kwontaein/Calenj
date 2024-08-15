import {useDispatch, useSelector} from "react-redux";
import {registerUserName, RootState} from "../../../../entities/redux";
import {FullScreen_div} from "../../../../shared/ui/SharedStyled";
import {AllFriendView} from "../../list/ui/AllFriendView";
import {OnlineFriendView} from "../../list/ui/OnlineFriendView";
import {RequestFriendList} from "../../requestFriend";
import {ResponseFriendList} from "../../responseFriend";
import {UserBanList} from "../../list/ui/UserBanList";
import {useFetchFriendList} from "../../../../entities/reactQuery";
import {useEffect} from "react";


export const CurrentFriendView: React.FC =() =>{
    const {viewState} = useSelector((state:RootState) => state.friendViewState)
    const userId = localStorage.getItem('userId')||''
    const friendListState = useFetchFriendList(userId);
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(!friendListState.data) return
        friendListState.data.forEach((friend)=>{
            dispatch(registerUserName({userId:friend.friendUserId, userName: friend.nickName}))
        })
    }, [friendListState]);

    return(
        <FullScreen_div>

            {(viewState ==='all' && friendListState.data)&& <AllFriendView friendList={friendListState.data}/>}
            {(viewState ==='online' && friendListState.data) && <OnlineFriendView friendList={friendListState.data}/>}
            {viewState ==='response' &&  <ResponseFriendList/>}
            {viewState ==='request' && <RequestFriendList/>}
            {viewState ==='banUser' && <UserBanList/>}
        </FullScreen_div>
    )
}