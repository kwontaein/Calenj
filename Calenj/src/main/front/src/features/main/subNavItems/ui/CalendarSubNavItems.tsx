import {DateEventTag} from "../../calendar/eventTag";
import {CalendarController, CalendarFromSelector} from "../../calendar/controller";
import FriendList from "../../friend/ui/FriendList";
import RequestFriend from "../../friend/ui/RequestFriend";

export const CalendarSubNavItems: React.FC = () => {
    return (
        <>
            <CalendarFromSelector/>
            <CalendarController/>
            <DateEventTag/>
            <FriendList/>
            <RequestFriend/>
        </>
    )
}