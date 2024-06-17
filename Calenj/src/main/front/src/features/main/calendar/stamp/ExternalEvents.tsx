import React from 'react';
import {Draggable} from "@fullcalendar/interaction";

interface ExternalEventProps {
    events: Event[];
    onEventAdd: () => void;
}

interface Event {
    id: number;
    title: string;
    color: string;
    custom?: string;
}

export const ExternalEvents: React.FC<ExternalEventProps> = ({events, onEventAdd}) => {
    React.useEffect(() => {
        const draggableEl = document.getElementById("external-events");
        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: '.fc-event',
                eventData: function (eventEl) {
                    return {
                        title: eventEl.getAttribute("title")!,
                        color: eventEl.dataset.color,
                        id: Number(eventEl.dataset.id),
                        custom: eventEl.dataset.custom
                    };
                }
            });
        }
    }, [events]);

    return (
        <div style={{float: "left", width: "25%"}}>
            <div style={{margin: "0 0 20px"}}>
                <button onClick={onEventAdd}>Add External Event</button>
            </div>
            <div id="external-events">
                {events.map(event => (
                    <div
                        key={event.id}
                        className="fc-event"
                        title={event.title}
                        data-id={event.id.toString()}
                        data-color={event.color}
                        data-custom={event.custom}
                        style={{backgroundColor: event.color, cursor: "pointer"}}
                    >
                        {event.title}
                        {event.custom}
                    </div>
                ))}
            </div>
        </div>
    );
};
