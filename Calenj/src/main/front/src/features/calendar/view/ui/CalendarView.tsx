import React, {useRef, useState} from "react";
import {DateSelectArg} from "@fullcalendar/react";
import {useCalendar} from "../model/useCalendar";
import {Draggable_Container, GridCalendar_Container, StyledFullCalendar} from "./CalendarStyled";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import rrulePlugin from '@fullcalendar/rrule'
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import {AddDateEvent} from "../../../main/calendar/create";
import {useFetchDateEventTag} from "../../../../entities/reactQuery";
import {CalendarEventView} from "./CalendarEventView";
import {useComponentSize} from "../../../../shared/model";
import {Toggle_Container, Toggle_Item} from "../../../../shared/ui/SharedStyled";
import {ExternalEvents} from "../../stamp/ExternalEvents";
import Draggable, {DraggableData, DraggableEvent} from "react-draggable";
import {useCalendarController} from "../model/useCalendarController";


// 이벤트 인터페이스 정의
interface Event {
    id: number;
    title: string;
    color: string;
    custom?: string;
}

interface AppState {
    weekendsVisible: boolean;
    externalEvents: Event[];
    calendarEvents: Event[];
}

export const CalendarView: React.FC = () => {
    const {data} = useFetchDateEventTag();
    const {currentEvents, handleEvents, handleEventClick} = useCalendar(data);
    const [addEvent, setAddEvent] = useState<boolean>(false);
    const [selectInfo, setSelectInfo] = useState<DateSelectArg | null>(null);
    const {calendarRef, handleNavLinkDayClick} = useCalendarController();
    const nodeRef = useRef(null);
    const [position, setPosition] = useState({x: 20, y: 20});
    const [contentRef, contentSize] = useComponentSize()
    const [dragAble, setDragAble] = useState<boolean>(false);

    const onClose = () => {
        setAddEvent(false)
    }

    const handleStop = (e: DraggableEvent, data: DraggableData) => {
        const {x, y} = data;
        setPosition({x, y});
    };

    const [state, setState] = useState<AppState>({
        weekendsVisible: true,
        externalEvents: [
            {id: 34432, title: "Art 1", color: "#0097a7", custom: "커스텀 내용"},
            {id: 323232, title: "Art 2", color: "#f44336"},
            {id: 1111, title: "Art 3", color: "#f57f17"},
            {id: 432432, title: "Art 4", color: "#90a4ae"}
        ],
        calendarEvents: []
    });

    const onEventAdd = () => {
        const newEvent: Event = {
            id: Date.now(), // 고유 ID 생성을 위해 현재 시간의 타임스탬프 사용
            title: "New Event",
            color: "#02daff",
            custom: "custom details"
        };

        setState(prevState => ({
            ...prevState,
            externalEvents: [...prevState.externalEvents, newEvent]
        }));
    };

    return (
        <>
            <Draggable nodeRef={nodeRef}
                       defaultPosition={{x: 20, y: 20}}
                       position={position}
                       onStop={handleStop}
                       disabled={dragAble}>
                <Draggable_Container ref={nodeRef}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div>수정</div>
                        <Toggle_Container $isClick={dragAble}
                                          onClick={() => {
                                              setDragAble((prevState) => !prevState)
                                          }}>
                            <Toggle_Item $toggleState={dragAble}/>
                        </Toggle_Container>
                    </div>
                    <ExternalEvents isAble={dragAble} events={state.externalEvents} onEventAdd={onEventAdd}/>
                </Draggable_Container>
            </Draggable>
            {data &&
                <GridCalendar_Container ref={contentRef}>
                    {addEvent &&
                        <AddDateEvent onClose={onClose} selectInfo={selectInfo as DateSelectArg}/>
                    }
                    <StyledFullCalendar
                        ref={calendarRef}
                        plugins={[rrulePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                        initialView="dayGridMonth"
                        selectable={!addEvent}
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
                        eventsSet={handleEvents}
                        select={(selectInfo: DateSelectArg) => {
                            setAddEvent(true)
                            setSelectInfo(selectInfo)
                        }}
                        eventChange={(e) => console.log(e)} //이벤트 변경 시 이벤트에 대한 상태
                        eventClick={handleEventClick}
                        eventContent={(eventInfo) => (
                            <CalendarEventView eventInfo={eventInfo}/>
                        )}
                    />
                </GridCalendar_Container>
            }
        </>
    );
};
