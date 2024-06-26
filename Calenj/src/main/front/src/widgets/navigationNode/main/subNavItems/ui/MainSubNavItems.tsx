import {DateEventTag} from "../../../../../features/calendar/eventTag";
import {SubNavProfile} from "../../../../../features/user/userSimpleProfile";
import {FriendList} from "../../../../../features/friend/view";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";

export const MainSubNavItems: React.FC = () => {
    const {clickState} = useSelector((state: RootState) => state.main_subNavState)

    return (
        <>
            <SubNavProfile/>
            {clickState === 'calendar' && <DateEventTag/>}
            {clickState === 'friend' && <FriendList/>}

        </>
    )
}