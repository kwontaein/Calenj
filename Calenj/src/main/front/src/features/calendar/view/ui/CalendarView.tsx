import React, {useRef, useState} from "react";
import {DateSelectArg, EventApi, EventChangeArg} from "@fullcalendar/react";
import {useCalendar} from "../model/useCalendar";
import {DeleteList, Draggable_Container, GridCalendar_Container, StyledFullCalendar} from "./CalendarStyled";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from '@fullcalendar/rrule'
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import {useFetchDateEventTag} from "../../../../entities/reactQuery";
import {CalendarEventView} from "./CalendarEventView";
import {useComponentSize} from "../../../../shared/model";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import {useCalendarController} from "../model/useCalendarController";
import {AddDateEvent} from "../../createEvent";
import {AppState, CustomEvent} from "../model/types";
import {DateEventDetail} from "../../detail";
import {DeleteModal} from "./DeleteModal";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";


export const CalendarView: React.FC = () => {
    const userId = localStorage.getItem('userId')||''

    const {data} = useFetchDateEventTag(userId);
    const {
        currentEvents,
        handleEvents,
        handleEventClick,
        handleEventsSet,
        eventDetail,
        deleteEvent,
        setEventDetail,
        setDeleteEvent,
        mutateAble,
        isDrag,
        dragStart,
        dragStop,
        handleMouseEnter,
        handleMouseLeave
    } = useCalendar(data);
    const [selectInfo, setSelectInfo] = useState<DateSelectArg | null>(null);
    const {calendarRef, handleNavLinkDayClick} = useCalendarController();

    const trashRef = useRef<HTMLDivElement>(null);
    const {dynamicEventTag} = useSelector((state: RootState) => state.dateEventTag)



    return (
        <>
            {isDrag && <DeleteList ref={trashRef} onMouseEnter={handleMouseEnter}
                                   onMouseLeave={handleMouseLeave}>휴지통</DeleteList>}
            {data &&
                <GridCalendar_Container>
                    {selectInfo &&
                        <AddDateEvent onClose={()=>setSelectInfo(null)}
                                      event={selectInfo}
                                      mode={'create'}/>
                    }
                    <StyledFullCalendar
                        ref={calendarRef}
                        plugins={[rrulePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        selectable={mutateAble}
                        editable={true}
                        locale="ko"
                        headerToolbar={{
                            left: "title",
                            right: "",
                        }}
                        nowIndicator={true}
                        height="99.5%"
                        navLinks={true} // navLinks 옵션은 필요에 따라 추가 설정
                        navLinkDayClick={handleNavLinkDayClick}
                        events={currentEvents}
                        dayMaxEventRows={2}
                        select={(selectInfo: DateSelectArg) => {
                            setSelectInfo(selectInfo)
                        }}
                        eventsSet={handleEventsSet}
                        eventDragStart={dragStart}
                        eventDragStop={dragStop}
                        eventChange={(arg: EventChangeArg) => handleEvents(arg)} //이벤트 변경 시 이벤트에 대한 상태
                        eventClick={handleEventClick}
                        eventContent={(eventInfo) => (
                            <CalendarEventView eventInfo={eventInfo}/>
                        )}
                        eventAllow={(dropInfo, draggedEvent) => {
                            // 이벤트 ID 또는 다른 조건으로 특정 이벤트를 고정
                            console.log(draggedEvent)
                            return dynamicEventTag[draggedEvent?._def.extendedProps.tagKeys[0]].name !== '그룹 일정'; // id가 '2'인 이벤트는 수정 불가
                        }}
                    />
                </GridCalendar_Container>
            }
            {deleteEvent !== null && <DeleteModal deleteEvent={deleteEvent} close={() => setDeleteEvent(null)}/>}
            {eventDetail !== null && <DateEventDetail eventDetail={eventDetail} close={() => setEventDetail(null)}/>}
        </>
    );
};