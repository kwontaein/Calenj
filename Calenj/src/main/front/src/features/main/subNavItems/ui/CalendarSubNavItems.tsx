import {DateEventTag} from "../../calendar/eventTag";
import {CalendarController, CalendarFromSelector} from "../../calendar/controller";

export const CalendarSubNavItems: React.FC = () =>{
    return(
        <>
            <CalendarFromSelector/>
            <CalendarController/>
            <DateEventTag/>
        </>
    )
}