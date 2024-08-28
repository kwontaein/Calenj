import {useDispatch, useSelector} from "react-redux";
import {saveUserName, RootState} from "../../../../entities/redux";
import {FullScreen_div} from "../../../../shared/ui/SharedStyled";
import {useFetchFriendList} from "../../../../entities/reactQuery";
import {useEffect} from "react";
import {AllFriendView, OnlineFriendView, RequestFriendList, ResponseFriendList, UserBanList} from "../../list";


export const CurrentFriendView: React.FC =() =>{
    const {viewState} = useSelector((state:RootState) => state.friendViewState)
    const userId = localStorage.getItem('userId')||''
    const friendListState = useFetchFriendList(userId);


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