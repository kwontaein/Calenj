import {useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";
import {FullScreen_div} from "../../../../../shared/ui/SharedStyled";
import {AllFriendView} from "./AllFriendView";
import {OnlineFriendView} from "./OnlineFriendView";
import {RequestFriendView} from "./RequestFriendView";
import {WaitingFriendView} from "./WaitingFriendView";

export const CurrentFriendView: React.FC =() =>{
    const {viewState} = useSelector((state:RootState) => state.friendViewState)

    return(
        <FullScreen_div>
            {viewState ==='all' && <AllFriendView/>}
            {viewState ==='online' && <OnlineFriendView/>}
            {viewState ==='request' && <RequestFriendView/>}
            {viewState ==='waiting' && <WaitingFriendView/>}
        </FullScreen_div>
    )
}