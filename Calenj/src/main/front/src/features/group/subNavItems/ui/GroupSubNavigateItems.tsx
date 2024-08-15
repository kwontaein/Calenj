import {
    Controller_Button,
    Controller_Container,
    GroupEventCalendar_Container, GroupFullCalendar,
    Hr_SubNavigation, ListToggleDiv, SubNavigateContents_Container,
} from "./GroupSubNavigationStyle";
import {useSubNavState} from '../model/useSubNavState';
import {SubNavigationButton} from "./SubNavigationButton";
import {SubNavigationProps} from "../model/types";
import rrulePlugin from "@fullcalendar/rrule";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar, {DateSelectArg, EventChangeArg} from "@fullcalendar/react";
import {CalendarEventView} from "../../../calendar/view/ui/CalendarEventView";
import React, {useRef} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../entities/redux";

export const GroupSubNavigateItems:React.FC<SubNavigationProps> = ({groupId}) =>{
    const [toggleState,toggleHandler,subItemsHandler] = useSubNavState(groupId)
    const calendarRef = useRef<FullCalendar | null>(null)
    const {group_subNavState} = useSelector((state:RootState)=>state.subNavigation)
    const calendarHandler = (compound:string)=>{
        if(!calendarRef.current) return
        if(compound==='next'){
            calendarRef.current?.getApi().next()
        }else if( compound ==='prev'){
            calendarRef.current?.getApi().prev()
        }else if(compound==='today'){
            calendarRef.current?.getApi().today()
        }
    }
    return(
        <SubNavigateContents_Container>
            <SubNavigationButton subItem={'그룹일정'} subItemsHandler={subItemsHandler} />
            {group_subNavState.clickState==='그룹일정' &&
            <>
                <Hr_SubNavigation/>
                <Controller_Container>
                    <Controller_Button style={{borderRadius:'5px 0 0 5px'}} onClick={()=>calendarHandler("prev")}>
                        <i className="fi fi-br-angle-left"></i>
                    </Controller_Button>
                    <Controller_Button style={{fontSize:'10px', width:'30px'}} onClick={()=>calendarHandler("today")}>
                        오늘
                    </Controller_Button>
                    <Controller_Button style={{borderRadius:'0 5px 5px 0'}} onClick={()=>calendarHandler("next")}>
                        <i className="fi fi-br-angle-right"></i>
                    </Controller_Button>
                </Controller_Container>
                <GroupEventCalendar_Container>
                    <GroupFullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        selectable={false}
                        editable={false}
                        locale="ko"
                        headerToolbar={{
                            left: "title",
                            right: "",
                        }}
                        nowIndicator={true}
                        height="99.5%"
                        dayMaxEventRows={2}
                        dayCellContent={(args) => {
                            const date = args.date.getDate(); // 날짜만 추출
                            return <div style={{fontSize:'10px'}}>{date}</div>; // 날짜만 표시하고 "일"은 제거
                        }}
                    />
                </GroupEventCalendar_Container>
            </>
            }
            <Hr_SubNavigation/>


            <ListToggleDiv onClick={toggleHandler}>
                    {toggleState ?
                        <i style={{marginRight: '5px'}} className="fi fi-rr-angle-small-down"/> :
                        <i style={{marginRight: '5px'}} className="fi fi-sr-angle-small-right"/>
                    }
                    공지/투표
                </ListToggleDiv>
                {toggleState&&
                <div>
                    <SubNavigationButton subItem={'공지'} subItemsHandler={subItemsHandler} />
                    <SubNavigationButton subItem={'투표'} subItemsHandler={subItemsHandler}/>
                </div>
                }
        </SubNavigateContents_Container>
    )
}
