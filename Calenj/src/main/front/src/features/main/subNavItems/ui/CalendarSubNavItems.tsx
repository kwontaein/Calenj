import {DateEventTag} from "../../calendar/eventTag";
import {CalendarController, CalendarFromSelector} from "../../calendar/controller";
import {SubNavProfile} from "./SubNavProfile";

export const CalendarSubNavItems: React.FC = () =>{
    return(
        <>
            <SubNavProfile/>
            <CalendarController/>
            <DateEventTag/>
        </>
    )
}