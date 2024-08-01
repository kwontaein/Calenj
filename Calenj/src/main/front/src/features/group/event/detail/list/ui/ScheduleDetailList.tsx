import React, {DragEvent, useEffect, useReducer, useRef, useState} from "react";
import {
    EditDuration_Input, EditSubSchedule_Content, EditSubSchedule_Title,
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
    SubSchedule_Title_Container, SubSchedule_Title_Wrapper,
} from "./ScheduleDetailListStyled";
import {Schedule_Button, ScheduleButton_Container} from "../../view/ui/ScheduleDetailStyled";
import {SubSchedule, useFetchGroupSubScheduleList} from "../../../../../../entities/reactQuery";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../entities/redux";
import {useListDrag} from "../model/useListDrag";
import {PointColor, PointColor2} from "../../../../../../shared/ui/SharedStyled";
import {shortAHMFormat2, shortAHMTimeFormat} from "../../../../../../shared/lib/dateFormat";
import {groupSubScheduleReducer} from "../../../../../../entities/group";

export const ScheduleDetailList: React.FC<{ startTime: Date ,editMode:boolean}> = ({startTime,editMode}) => {

    const initSchedule = [
        {
            index: 0,
            subSubScheduleId: "0",
            subScheduleTitle: "타임스퀘어",
            subScheduleContent: "가기",
            subScheduleCreate: new Date,
            subScheduleDuration: 60,
            joinUser: ["간순대", "김말이순대"],
        },
        {
            index: 1,
            subSubScheduleId: "1",
            subScheduleTitle: "소사역 스벅",
            subScheduleContent: "가서 놀고 먹기",
            subScheduleCreate: new Date,
            subScheduleDuration: 60,
            joinUser: ["간순대", "김말이순대"],
        },
        {
            index: 2,
            subSubScheduleId: "2",
            subScheduleTitle: "집",
            subScheduleContent: "가기",
            subScheduleCreate: new Date,
            subScheduleDuration: 60,
            joinUser: ["간순대", "김말이순대"],
        }
    ]
    const [subScheduleEdit,disPatchSubSchedule] = useReducer(groupSubScheduleReducer, initSchedule)

    const {
        dragEnter,
        dragMousePosition,
        drop,
        dragStart,
        addSubSchedule,
        mousePosition,
        ItemWidth,
        dragIndex,
        scheduleTime
    } = useListDrag(subScheduleEdit, disPatchSubSchedule, startTime)
    const {scheduleId} = useSelector((state: RootState) => state.groupSchedule)

    const groupSubScheduleList = useFetchGroupSubScheduleList(scheduleId); //이 리스트로 넣으면 됨

    return (
        <ScheduleDetailList_Container>

            {subScheduleEdit.map((schedule, idx) => (
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
                            onDragStart={(e) => editMode && dragStart(e, idx)}
                            onDragEnter={(e) => editMode && dragEnter(e, idx)}
                            onDragEnd={drop}
                            onDragOver={(e) => e.preventDefault()}
                            $isDrop={dragIndex.current === idx}
                        >
                            <SubSchedule_Title_Container>
                                {editMode?
                                    <EditSubSchedule_Title value={schedule.subScheduleTitle}
                                                           disabled={dragIndex.current!==null}
                                                           maxLength={10} placeholder={'제목을 입력해주세요'}
                                                           onChange={(e)=>disPatchSubSchedule({type:'SET_TITLE', payload:{index:idx, title:e.target.value}})}/>
                                    :<SubSchedule_Title_Wrapper>{schedule.subScheduleTitle}</SubSchedule_Title_Wrapper>}
                            </SubSchedule_Title_Container>
                            <ScheduleDetail_Wrapper_Container>
                                <ScheduleDetail_ContentTitle_Container>
                                    {dragIndex.current !== idx && <i className="bi bi-geo-alt-fill" style={{
                                        color: PointColor,
                                        marginRight: '5px'
                                    }}></i>}
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
                                    {idx === 0 ? shortAHMTimeFormat(startTime) : shortAHMTimeFormat(scheduleTime[idx - 1])}
                                    {' ~ '}
                                    {shortAHMTimeFormat(scheduleTime[idx])}
                                    ( {editMode ?
                                    <EditDuration_Input max={9999}
                                                        onChange={(e)=> e.target.value.length<4 && disPatchSubSchedule({type:"SET_DURATION", payload:{index:idx, duration:parseInt(e.target.value,10)}})}
                                                        value={schedule.subScheduleDuration+""}
                                                        $numLength={(schedule.subScheduleDuration+"").split('').length} />
                                    : <span style={{marginInline:'3px'}}>{schedule.subScheduleDuration}</span>}분 )
                                </ScheduleDetail_Content_Container>
                            </ScheduleDetail_Wrapper_Container>
                            <ScheduleDetail_Wrapper_Container>
                                {editMode?
                                    <EditSubSchedule_Content rows={1}
                                                             placeholder={'내용을 입력해주세요'}
                                                             value={schedule.subScheduleContent}
                                                             disabled={dragIndex.current!==null}
                                                             onChange={(e)=>disPatchSubSchedule({type:'SET_CONTENT', payload:{index:idx, content:e.target.value}})}/> :
                                    <SubSchedule_Content_Container>
                                        {schedule.subScheduleContent}
                                    </SubSchedule_Content_Container>
                                }
                            </ScheduleDetail_Wrapper_Container>
                        </ScheduleDetailList_Div>
                    </ScheduleDetail_Wrapper>

                </ScheduleDetailList_Progress>
            ))}
            {(mousePosition && dragIndex.current !== null) &&

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
                        {subScheduleEdit[dragIndex.current].subScheduleTitle}
                    </SubSchedule_Title_Container>
                    <ScheduleDetail_Wrapper_Container>
                        <ScheduleDetail_ContentTitle_Container>
                            <i className="bi bi-geo-alt-fill" style={{color: PointColor, marginRight: '5px'}}></i>
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
                            {dragIndex.current === 0 ? shortAHMTimeFormat(startTime) : shortAHMTimeFormat(scheduleTime[dragIndex.current - 1])}
                            {' ~ '}
                            {shortAHMTimeFormat(scheduleTime[dragIndex.current])}
                            ( {subScheduleEdit[dragIndex.current].subScheduleDuration}분 )
                        </ScheduleDetail_Content_Container>
                    </ScheduleDetail_Wrapper_Container>

                    <ScheduleDetail_Wrapper_Container>
                        <SubSchedule_Content_Container>
                            {subScheduleEdit[dragIndex.current].subScheduleContent}
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