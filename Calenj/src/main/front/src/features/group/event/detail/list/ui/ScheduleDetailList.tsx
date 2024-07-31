import React, {DragEvent, useEffect, useRef, useState} from "react";
import {
    MapInterval_Container,
    ScheduleDetail_Content_Container,
    ScheduleDetail_ContentTitle_Container,
    ScheduleDetail_Wrapper,
    ScheduleDetail_Wrapper_Container,
    ScheduleDetailList_BottomLine_Container,
    ScheduleDetailList_Circle,
    ScheduleDetailList_Container,
    ScheduleDetailList_Div,
    ScheduleDetailList_Progress,
    ScheduleDetailList_Structure_Container,
    ScheduleDetailList_TopLine_Container, SubSchedule_Content_Container,
    SubSchedule_Title_Container,
} from "./ScheduleDetailListStyled";
import {Schedule_Button, ScheduleButton_Container} from "../../view/ui/ScheduleDetailStyled";
import {SubSchedule, useFetchGroupSubScheduleList} from "../../../../../../entities/reactQuery";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../entities/redux";
import {useListDrag} from "../model/useListDrag";
import {PointColor2} from "../../../../../../shared/ui/SharedStyled";
import {shortAHMFormat2, shortAHMTimeFormat} from "../../../../../../shared/lib/dateFormat";

export const ScheduleDetailList : React.FC<{startTime:Date}> = ({startTime}) =>{

    useEffect(() => {
        console.log('시작 시간 :', startTime)
    }, []);
    const initSchedule =[
        {
            index: 0,
            subSubScheduleId: "0",
            subScheduleTitle: "타임스퀘어",
            subScheduleContent: "가기",
            subScheduleCreate: new Date,
            subScheduleDuration: 60,
            joinUser: ["간순대","김말이순대"],
        },
        {
            index: 1,
            subSubScheduleId: "1",
            subScheduleTitle: "소사역 스벅",
            subScheduleContent: "가서 놀고 먹기",
            subScheduleCreate: new Date,
            subScheduleDuration: 60,
            joinUser: ["간순대","김말이순대"],
        },
        {
            index: 2,
            subSubScheduleId: "2",
            subScheduleTitle: "집",
            subScheduleContent: "가기",
            subScheduleCreate: new Date,
            subScheduleDuration: 60,
            joinUser: ["간순대","김말이순대"],
        }
    ]
    const {dragEnter, dragMousePosition, drop, dragStart,addSubSchedule, mousePosition, ItemWidth, scheduleData, dragIndex,scheduleTime}=useListDrag(initSchedule, startTime)
    const {scheduleId} = useSelector((state: RootState) => state.groupSchedule)
    const groupSubScheduleList = useFetchGroupSubScheduleList(scheduleId); //이 리스트로 넣으면 됨


    return (
        <ScheduleDetailList_Container>

            {scheduleData.map((schedule, idx) => (
                <ScheduleDetailList_Progress key={idx}>
                    <ScheduleDetailList_Structure_Container>
                        <ScheduleDetailList_TopLine_Container $isNow={true}/>
                        <ScheduleDetailList_Circle $isNow={true}/>
                        <ScheduleDetailList_BottomLine_Container $isNow={true}/>
                    </ScheduleDetailList_Structure_Container>

                    <ScheduleDetail_Wrapper>
                        <MapInterval_Container>

                        </MapInterval_Container>
                        <ScheduleDetailList_Div
                            onDrag={dragMousePosition}
                            draggable
                            onDragStart={(e) => dragStart(e, idx)}
                            onDragEnter={(e) => dragEnter(e, idx)}
                            onDragEnd={drop}
                            onDragOver={(e) => e.preventDefault()}
                            $isDrop={dragIndex.current === idx}
                        >
                            <SubSchedule_Title_Container>
                                {schedule.subScheduleTitle}
                            </SubSchedule_Title_Container>
                            <ScheduleDetail_Wrapper_Container>
                                <ScheduleDetail_ContentTitle_Container>
                                    {dragIndex.current !== idx &&  <i className="bi bi-geo-alt-fill" style={{color:PointColor2, marginRight:'5px'}}></i>}
                                    위치 :
                                </ScheduleDetail_ContentTitle_Container>
                                <ScheduleDetail_Content_Container>

                                </ScheduleDetail_Content_Container>
                            </ScheduleDetail_Wrapper_Container>
                            <ScheduleDetail_Wrapper_Container>
                                <ScheduleDetail_ContentTitle_Container>
                                    일정날짜 :
                                </ScheduleDetail_ContentTitle_Container>
                                <ScheduleDetail_Content_Container>
                                    {shortAHMFormat2(scheduleTime[idx])}
                                </ScheduleDetail_Content_Container>
                            </ScheduleDetail_Wrapper_Container>
                            <ScheduleDetail_Wrapper_Container>
                                <ScheduleDetail_ContentTitle_Container>
                                    일정시간 :
                                </ScheduleDetail_ContentTitle_Container>
                                <ScheduleDetail_Content_Container>
                                    {idx===0? shortAHMTimeFormat(startTime): shortAHMTimeFormat(scheduleTime[idx-1])}
                                    {' ~ '}
                                    {shortAHMTimeFormat(scheduleTime[idx])}
                                </ScheduleDetail_Content_Container>
                            </ScheduleDetail_Wrapper_Container>
                            <ScheduleDetail_Wrapper_Container>
                                <ScheduleDetail_ContentTitle_Container>
                                    예상 소요시간 :
                                </ScheduleDetail_ContentTitle_Container>
                                <ScheduleDetail_Content_Container>
                                    {schedule.subScheduleDuration}분
                                </ScheduleDetail_Content_Container>
                            </ScheduleDetail_Wrapper_Container>

                            <ScheduleDetail_Wrapper_Container>
                                <SubSchedule_Content_Container>
                                    {schedule.subScheduleContent}
                                </SubSchedule_Content_Container>
                            </ScheduleDetail_Wrapper_Container>
                        </ScheduleDetailList_Div>
                    </ScheduleDetail_Wrapper>

                </ScheduleDetailList_Progress>
            ))}
            {(mousePosition && dragIndex.current!==null )&&

                <ScheduleDetailList_Div $isDrop={false}
                                        style={{
                                            position: 'fixed',
                                            width: `${ItemWidth}px`,
                                            left: mousePosition.x,
                                            top: mousePosition.y,
                                            pointerEvents: 'none',
                                            opacity: '0.9'
                                        }}>
                    <SubSchedule_Title_Container>
                        {scheduleData[dragIndex.current].subScheduleTitle}
                    </SubSchedule_Title_Container>
                    <ScheduleDetail_Wrapper_Container>
                        <ScheduleDetail_ContentTitle_Container>
                            <i className="bi bi-geo-alt-fill" style={{color:PointColor2, marginRight:'5px'}}></i>
                            위치 :
                        </ScheduleDetail_ContentTitle_Container>
                        <ScheduleDetail_Content_Container>

                        </ScheduleDetail_Content_Container>
                    </ScheduleDetail_Wrapper_Container>
                    <ScheduleDetail_Wrapper_Container>
                        <ScheduleDetail_ContentTitle_Container>
                            일정날짜 :
                        </ScheduleDetail_ContentTitle_Container>
                        <ScheduleDetail_Content_Container>
                            {shortAHMFormat2(scheduleTime[dragIndex.current])}
                        </ScheduleDetail_Content_Container>
                    </ScheduleDetail_Wrapper_Container>
                    <ScheduleDetail_Wrapper_Container>
                        <ScheduleDetail_ContentTitle_Container>
                            일정시간 :
                        </ScheduleDetail_ContentTitle_Container>
                        <ScheduleDetail_Content_Container>
                            {dragIndex.current===0? shortAHMTimeFormat(startTime): shortAHMTimeFormat(scheduleTime[dragIndex.current-1])}
                            {' ~ '}
                            {shortAHMTimeFormat(scheduleTime[dragIndex.current])}
                        </ScheduleDetail_Content_Container>
                    </ScheduleDetail_Wrapper_Container>
                    <ScheduleDetail_Wrapper_Container>
                        <ScheduleDetail_ContentTitle_Container>
                            예상 소요시간 :
                        </ScheduleDetail_ContentTitle_Container>
                        <ScheduleDetail_Content_Container>
                            {scheduleData[dragIndex.current].subScheduleDuration}분
                        </ScheduleDetail_Content_Container>
                    </ScheduleDetail_Wrapper_Container>

                    <ScheduleDetail_Wrapper_Container>
                        <SubSchedule_Content_Container>
                            {scheduleData[dragIndex.current].subScheduleContent}
                        </SubSchedule_Content_Container>
                    </ScheduleDetail_Wrapper_Container>
                </ScheduleDetailList_Div>}

            <ScheduleButton_Container style={{justifyContent: 'right'}}>
                <Schedule_Button onClick={addSubSchedule}>
                    세부일정 추가
                </Schedule_Button>
            </ScheduleButton_Container>
        </ScheduleDetailList_Container>
    );
}