import React, {useCallback, useEffect, useState} from "react";
import {EventAddArg, EventApi, EventChangeArg, EventClickArg} from "@fullcalendar/react";
import chroma from "chroma-js";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";
import {EventTagDTO} from "../../../../entities/reactQuery";
import {useFetchUserDateEvent} from "../../../../entities/reactQuery/model/queryModel";
import {DateEvent, ReturnCalendar} from "../../createEvent/model/types";
import {addRruleOptions} from "../../createEvent/utils/addRruleOptions";
import {updateScheduleApi} from "../api/updateScheduleApi";


export const useCalendar = (data: EventTagDTO[] | null | undefined): ReturnCalendar => {
    const [currentEvents, setCurrentEvents] = useState<DateEvent[]>([]);
    const {dynamicEventTag} = useSelector((state: RootState) => state.dateEventTag)
    const userEventDateState = useFetchUserDateEvent()
    const [eventDetail,setEventDetail] = useState<EventClickArg|null>(null)
    const [mutateAble,setMutateAble] = useState<boolean>(true)

    //DB에서 받아온 데이터 세팅
    const setUserDateEvent = async () => {
        if (!userEventDateState.data) {
            return []
        }

        const events = userEventDateState.data.map((event): DateEvent => {
            const {tagKeys, formState, content, todoList, repeatState} = event.extendedProps
            const {repeat, startTime, endTime} = repeatState;//반복여부
            const tagKey = tagKeys[0]; //태그 키
            const color = dynamicEventTag[tagKey].color//지정한 태그의 색
            const [R, G, B]: number[] = chroma(color).rgb();
            const Brightness = (0.299 * R) + (0.587 * G) + (0.114 * B);

            const newEvent: DateEvent = {
                id: event.id,
                title: event.title,
                start: new Date(event.start.toString()),
                end: new Date(event.end.toString()),
                textColor: Brightness > 128 ? '#000000' : '#ffffff',
                backgroundColor: color,
                borderColor: color,
                allDay: event.extendedProps.formState === "todo",
                extendedProps: {
                    tagKeys: tagKeys,
                    formState: formState,
                    content: content,
                    todoList: todoList,
                    repeatState: repeatState,
                },
            }
            if (repeat) {
                newEvent.rrule = addRruleOptions(repeatState, new Date(event.start.toString()))
                newEvent.exdate = event.extendedProps.repeatState.noRepeatDates;
            }
            if (formState === "schedule") {
                newEvent.duration = {milliseconds: new Date(endTime.toString()).getTime() - new Date(startTime.toString()).getTime()};
            }

            return newEvent;
        }).filter((event) =>
            event.extendedProps.tagKeys.some((tagId) =>
                dynamicEventTag[tagId].isClick
            )
        )

        setCurrentEvents(events);
        // console.log(events)
    }


    //이벤트 태그를 불러온 후 데이터 세팅 호출
    useEffect(() => {
        const eventTag = Object.keys(dynamicEventTag)
        if (data && userEventDateState.data && eventTag.length > 1) {
            console.log(data)
            setUserDateEvent()
        }
    }, [data, userEventDateState.data, dynamicEventTag]);


    //이벤트 변경시 api 처리
    const handleEvents = (event: EventChangeArg) => {
        if(!mutateAble) return
        setMutateAble(false)
        updateScheduleApi(
            event.event._def.publicId,
            event.event.start as Date,
            event.event.end as Date,
            event.oldEvent.start as Date,
            event.event.extendedProps).then(()=>{
                userEventDateState.refetch().then(()=>setMutateAble(true))
        })
    }


    const handleEventClick = useCallback((clickInfo: EventClickArg) => {
        if(clickInfo.event._def.extendedProps.formState==='todo' && clickInfo.view.type !=="dayGridMonth"){
            return
        }
        setEventDetail(clickInfo)
        // clickInfo.event.remove();

    }, []);


    return {currentEvents, handleEvents, handleEventClick, eventDetail, setEventDetail,mutateAble}
}
