import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {setCalendarCompound, setCalendarForm} from "../../../../../entities/redux/model/slice/CalendarControllerSlice";
import {RootState} from "../../../../../entities/redux";
import FullCalendar from "@fullcalendar/react";


export const useCalendarController = (): { calendarRef: React.MutableRefObject<FullCalendar | null>, handleNavLinkDayClick: (data:Date)=>void } =>{
    const calendarController = useSelector((state:RootState)=>state.calendarController)
    const calendarRef = useRef<FullCalendar | null>(null);

    //dayGridMonth, timeGridWeek, listWeek, timeGridDay
    const dispatch = useDispatch();
    useEffect(() => {
        const {compound} =calendarController;
        if(compound==='') return
        if(calendarRef.current){
            if(compound==="prev-year"){
                calendarRef.current?.getApi().prevYear();
            }else if(compound==="next-year"){
                calendarRef.current?.getApi().nextYear();
            }else if(compound==="prev-month"){
                calendarRef.current?.getApi().prev();
            }else if(compound==="next-month"){
                calendarRef.current?.getApi().next();
            }else if(compound==="today"){
                calendarRef.current?.getApi().today();
                // calendarRef.current?.getApi().changeView('timeGridDay')
            }
            dispatch(setCalendarCompound({compound:''}))
        }
    }, [calendarController.compound]);


    useEffect(() => {
        const {value} =calendarController.gridForm
        if(!calendarRef.current) return

        if(value==='month'){
            calendarRef.current?.getApi().changeView('dayGridMonth')
        }else if(value==='week'){
            calendarRef.current?.getApi().changeView('timeGridWeek')
        }else if(value==='day'){
            calendarRef.current?.getApi().changeView('timeGridDay')
        }else if(value==='list'){
            calendarRef.current?.getApi().changeView('listWeek')
        }

    }, [calendarController.gridForm]);

    
    //LinkNav로 원하는 일 클릭 시 이동
    const handleNavLinkDayClick = (date:Date) => {
        dispatch(setCalendarForm({gridForm:{value:"day", label:"일간"}}));
        calendarRef.current?.getApi().gotoDate(date);
    };


    return {calendarRef, handleNavLinkDayClick}
}