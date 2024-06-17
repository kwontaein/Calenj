import {EventContentArg} from "@fullcalendar/react";
import {
    EventView_Container,
    EventView_Content, EventView_DropDown_Container,
    EventView_TagColor,
    EventView_Time,
    EventView_Title
} from "./CalendarEventViewStyled";
import {TextColor} from "../../../../../shared/ui/SharedStyled";
import React, {useEffect, useRef, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import drop = Simulate.drop;
import {TodoListView} from "./TodoListView";
import {useComponentSize} from "../../../../../shared/model";

interface CalendarEventProps{
    eventInfo: EventContentArg
}
export const CalendarEventView:React.FC<CalendarEventProps> = ({eventInfo}) =>{
    const [dropDown, setDropDown] = useState<boolean>(false);
    const [selectBox, contentSize]= useComponentSize()

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectBox.current && !selectBox.current.contains(e.target as Node)) {
                setDropDown(false);
            }
        };
        if(dropDown){
            document.addEventListener('mousedown', handleClickOutside);
        }else{
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [selectBox, dropDown]);

    useEffect(() => {
        console.log(eventInfo)
    }, []);

    const calenderType = eventInfo.view.type


    return(
        <EventView_Container $allDay={eventInfo.event.allDay||calenderType ==="listWeek"}  onClick={()=>setDropDown((prev)=>!prev)} ref={selectBox}>
            {!(eventInfo.event.allDay||calenderType ==="listWeek") && <EventView_TagColor $color={eventInfo.event.backgroundColor}/>}
            <EventView_Content>
                <EventView_Time $color={ (calenderType !=="listWeek" && (eventInfo.event.allDay||calenderType !=="dayGridMonth")) ? eventInfo.textColor : TextColor}>
                    {eventInfo.timeText}
                </EventView_Time>
                <EventView_Title $color={(calenderType !=="listWeek" && (eventInfo.event.allDay || calenderType !=="dayGridMonth")) ? eventInfo.textColor : TextColor}>
                    {eventInfo.event.title}
                    {(eventInfo.event.allDay && calenderType!=="listWeek") &&
                        <EventView_DropDown_Container $color={eventInfo.textColor}>
                            {dropDown ?
                                <i className="fi fi-rr-angle-small-up"/>:
                                <i className="fi fi-rr-angle-small-down"/>
                            }
                        </EventView_DropDown_Container>
                    }
                </EventView_Title>
            </EventView_Content>
            {dropDown && <TodoListView top={selectBox.current?.getBoundingClientRect().top} left={selectBox.current?.getBoundingClientRect().left} width={contentSize.width}/>}
        </EventView_Container>
    )
}