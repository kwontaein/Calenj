import {DateEventTag} from "../../../../../features/calendar/eventTag";
import {SubNavProfile} from "../../../../../features/user/userSimpleProfile";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../entities/redux";
import {FriendList} from "../../../../../features/friend/list";

export const MainSubNavItems: React.FC = () => {
    const {clickState} = useSelector((state: RootState) => state.subNavigation.main_subNavState)

    return (
        <>
            <SubNavProfile/>
            {clickState === 'calendar' && <DateEventTag/>}

            {clickState === 'friend' && <FriendList/>}

        </>
    )
}