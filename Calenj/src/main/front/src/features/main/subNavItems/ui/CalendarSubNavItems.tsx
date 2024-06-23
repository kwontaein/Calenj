import {DateEventTag} from "../../calendar/eventTag";
import {CalendarController, CalendarFromSelector} from "../../calendar/controller";
import {SubNavProfile} from "./SubNavProfile";
import {FriendList} from "../../friend";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";

export const CalendarSubNavItems: React.FC = () => {
    const {clickState, friendParam} = useSelector((state: RootState) => state.main_subNavState)


    return (
        <>
            <SubNavProfile/>
            <CalendarController/>
            <CalendarFromSelector/>
            {clickState === 'calendar' && <DateEventTag/>}
            {clickState === 'friend' && <FriendList/>}

        </>
    )
}