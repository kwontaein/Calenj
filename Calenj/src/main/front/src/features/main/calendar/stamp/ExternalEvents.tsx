import React, {useEffect, useRef} from 'react';
import {Draggable} from "@fullcalendar/interaction";

interface ExternalEventProps {
    isAble: boolean;
    events: Event[];
    onEventAdd: () => void;
}

interface Event {
    id: number;
    title: string;
    color: string;
    custom?: string;
}

export const ExternalEvents: React.FC<ExternalEventProps> = ({isAble, events, onEventAdd}) => {
    const draggableElRef = useRef<HTMLElement | null>();
    const draggableInstanceRef = useRef<Draggable | null>();

    useEffect(() => {
        const draggableEl = document.getElementById("external-events");
        draggableElRef.current = draggableEl; // DOM 요소 참조 저장

        if (draggableEl && isAble) {
            // Draggable 인스턴스 생성
            const instance = new Draggable(draggableEl, {
                itemSelector: '.fc-event',
                eventData: function (eventEl) {
                    return {
                        title: eventEl.getAttribute("title"),
                        color: eventEl.dataset.color,
                        id: Number(eventEl.dataset.id),
                        custom: eventEl.dataset.custom
                    };
                }
            });
            draggableInstanceRef.current = instance;
        }
        if (draggableInstanceRef.current && !isAble) {
            draggableInstanceRef.current.destroy();
            draggableInstanceRef.current = null;
        }
    }, [events, isAble]);
    return (
        <div style={{width: "130px", height: "150px"}}>
            <div id="external-events" style={{width: "130px", height: "150px", margin: "0 10px 0 10px"}}>
                {events.map(event => (
                    <div
                        key={event.id}
                        className="fc-event"
                        title={event.title}
                        data-id={event.id.toString()}
                        data-color={event.color}
                        data-custom={event.custom}
                        style={{backgroundColor: event.color, cursor: "pointer", margin: "5px 0 5px 0"}}>
                        <div style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}>{event.title}
                        </div>
                    </div>
                ))}
                {events.length < 5 ? <button onClick={onEventAdd}>Add External Event</button> : null}
            </div>
        </div>
    );
};
