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
import {ExternalEvents} from "../../stamp";
import {AppState, CustomEvent} from "../model/types";
import {DateEventDetail} from "../../detail";
import {Toggle_Container, Toggle_Item} from "../../../../shared/ui/SharedStyled";
import {DeleteModal} from "./DeleteModal";


export const CalendarView: React.FC = () => {
    const {data} = useFetchDateEventTag();
    const {
        currentEvents,
        handleEvents,
        handleEventClick,
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
    const nodeRef = useRef(null);
    const [position, setPosition] = useState({x: 20, y: 20});
    const trashRef = useRef<HTMLDivElement>(null);
    const [dragAble, setDragAble] = useState<boolean>(false);


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
        const newEvent: CustomEvent = {
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
            {/*<Draggable nodeRef={nodeRef}
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
            </Draggable>*/}
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
                        eventDragStart={dragStart}
                        eventDragStop={dragStop}
                        eventChange={(arg: EventChangeArg) => handleEvents(arg)} //이벤트 변경 시 이벤트에 대한 상태
                        eventClick={handleEventClick}
                        eventContent={(eventInfo) => (
                            <CalendarEventView eventInfo={eventInfo}/>
                        )}
                    />
                </GridCalendar_Container>
            }
            {deleteEvent !== null && <DeleteModal deleteEvent={deleteEvent} close={() => setDeleteEvent(null)}/>}
            {eventDetail !== null && <DateEventDetail eventDetail={eventDetail} close={() => setEventDetail(null)}/>}
        </>
    );
};
