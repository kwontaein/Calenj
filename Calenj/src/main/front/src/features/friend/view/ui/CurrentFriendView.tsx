import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {FullScreen_div} from "../../../../shared/ui/SharedStyled";
import {AllFriendView} from "../../list/ui/AllFriendView";
import {OnlineFriendView} from "../../list/ui/OnlineFriendView";
import {RequestFriendList} from "../../requestFriend";
import {ResponseFriendList} from "../../responseFriend";


export const CurrentFriendView: React.FC =() =>{
    const {viewState} = useSelector((state:RootState) => state.friendViewState)

    return(
        <FullScreen_div>
            {viewState ==='all' && <AllFriendView/>}
            {viewState ==='online' && <OnlineFriendView/>}
            {viewState ==='response' &&  <ResponseFriendList/>}
            {viewState ==='request' && <RequestFriendList/>}
        </FullScreen_div>
    )
}