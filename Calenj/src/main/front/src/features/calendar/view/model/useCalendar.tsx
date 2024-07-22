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
    const [eventDetail, setEventDetail] = useState<EventApi | null>(null)
    const [mutateAble, setMutateAble] = useState<boolean>(true)
    const [isMouseOverTrash, setIsMouseOverTrash] = useState(false);
    const [isDrag, setIsDrag] = useState(false);
    const [deleteEvent, setDeleteEvent] = useState<EventClickArg | null>(null);

    //DB에서 받아온 데이터 세팅
    const setUserDateEvent = async () => {
        if (!userEventDateState.data) {
            return []
        }

        const events = userEventDateState.data.map((event): DateEvent => {
            const {tagKeys, formState, content, todoList, repeatState, friendList} = event.extendedProps
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
                    friendList:friendList,
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
            setUserDateEvent()
        }
    }, [data, userEventDateState.data, dynamicEventTag]);


    //이벤트 변경시 api 처리
    const handleEvents =(event: EventChangeArg) => {
        if (!mutateAble) return
        setMutateAble(false)
        updateScheduleApi(
            event.event._def.publicId,
            event.event.start as Date,
            event.event.end as Date,
            event.oldEvent.start as Date,
            event.event.extendedProps).then(() => {
            userEventDateState.refetch().then(() => {
                setMutateAble(true)
            })
        })
    }

    const handleEventsSet = (events:EventApi[])=>{
        if(eventDetail===null) return
        events.map((event)=>{
            if(event.id===eventDetail.id){
                setEventDetail(event)
            }
        })
    }


    const handleEventClick = useCallback((clickInfo: EventClickArg) => {
        if (clickInfo.event._def.extendedProps.formState === 'todo' && clickInfo.view.type !== "dayGridMonth") {
            return
        }
        setEventDetail(clickInfo.event)
        // clickInfo.event.remove();

    }, []);






    //드래그 중지 시 휴지통에 있다면 삭제
    const dragStart = (clickInfo: EventClickArg) => {
        setIsDrag(true);
    };
    //드래그 중지 시 휴지통에 있다면 삭제
    const dragStop = (clickInfo: EventClickArg) => {
        setIsDrag(false);
        if (isMouseOverTrash) {
            setTrashData(clickInfo)
        }
    };
    //휴지통에 마우스 올라갔는지
    const handleMouseEnter = () => {
        setIsMouseOverTrash(true);
    };

    //안올라갔는지
    const handleMouseLeave = () => {
        setTimeout(() => {
            setIsMouseOverTrash(false);
        }, 500)
    };

    //삭제 실행
    const setTrashData = ((clickInfo: EventClickArg) => {
        setDeleteEvent(clickInfo);
        //모달 띄우고
        //정말로 삭제하시겠습니까 ? -> 예 선택시
        //api 호출 및 삭제
    })

    return {
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
    }
}
