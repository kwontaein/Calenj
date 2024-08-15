import React, {ChangeEvent, useEffect, useReducer, useRef, useState} from "react";
import {
    EditDuration_Input,
    EditSubSchedule_Content,
    EditSubSchedule_Title,
    MapIcon_Container,
    MapInterval_Container,
    MapPositionText_Container,
    MapToggle_Containper,
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
    ScheduleDetailList_TopLine_Container,
    SubSchedule_Content_Container,
    SubSchedule_Title_Container,
    SubSchedule_Title_Wrapper,
    SubScheduleIcon_Wrapper,
    SubScheduleJoinUser_Container, SubScheduleJoinUser_Empty, SubScheduleJoinUser_Wrapper,
    SubScheduleOption_Container,
} from "./ScheduleDetailListStyled";
import {SubSchedule} from "../../../../../../entities/reactQuery";
import {
    Modal_Condition_Button,
    PointColor,
    ProfileContainer,
    TextColor
} from "../../../../../../shared/ui/SharedStyled";
import {shortAHMFormat2, shortAHMTimeFormat} from "../../../../../../shared/lib/dateFormat";
import {GroupSubScheduleAction,} from "../../../../../../entities/group";
import { ReturnSubSchedule} from "../model/types";
import {ScheduleMap_Container} from "./ScheduleDetailStyled";
import {LocationSetModal} from "./LocationSetModal";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../entities/redux";
import {useSubScheduleMap} from "../model/useSubScheduleMap";

interface ScheduleDetailProps {
    useGroupSubSchedule: ReturnSubSchedule,
    editMode: boolean
    startDate: Date;
    mapHandler:()=>void;
}

interface Locate {
    latitude: number,
    longitude: number
}

export const ScheduleDetailList: React.FC<ScheduleDetailProps> = ({useGroupSubSchedule, editMode, startDate,mapHandler}) => {

    const { mapModal} = useSelector((state: RootState) => state.groupSchedule)
    const {subScheduleEdit, dispatchSubSchedule, joinSubSchedule,  scheduleTime, dragEnter, dragMousePosition, drop, dragStart, mousePosition, ItemWidth, dragIndex} = useGroupSubSchedule
    const textAreaRef = useRef<(HTMLTextAreaElement | null)[]>([]);
    const clickRef = useRef<HTMLDivElement | null>(null);
    const [clickState, setClickState] = useState<number | null>(null)
    const [nowTime, setNowTime] = useState<Date>(new Date())
    const [mapIndex, setMapIndex] = useState<number | null>(null); //위치 설정을 위한 index전달
    const mapElement =useSubScheduleMap(subScheduleEdit, clickState)
    //지도 그리는 메소드

    const {userNameRegister} = useSelector((state:RootState)=> state.userNameRegister)

    //현재시간 갱신
    useEffect(() => {
        setInterval(() => {
            setNowTime(new Date())
        }, 10000)
    }, []);

    //textArea value, height 갱신
    const handleResizeHeight = (e: ChangeEvent<HTMLTextAreaElement>, idx: number) => {
        console.log("실행?")
        dispatchSubSchedule({
            type: 'SET_CONTENT',
            payload: {index: idx, content: e.target.value}
        })
        const textArea = textAreaRef.current[idx];

        if (textArea) {
            textArea.style.height = 'auto';
            textArea.style.height = textArea.scrollHeight + "px";
        }
    };

    useEffect(() => {
        if (!textAreaRef.current) return
        textAreaRef.current.map((textArea: HTMLTextAreaElement | null) => {
            if (textArea) {
                textArea.style.height = 'auto';
                textArea.style.height = textArea.scrollHeight + "px";
            }
        })
    }, [editMode,subScheduleEdit]);
    //현재 클릭한 subSchedule 지정
    const clickStateHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
        clickRef.current = e.currentTarget as HTMLDivElement
        setClickState(idx)
    }

    return (

        <ScheduleDetailList_Container onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (!(clickRef.current && clickRef.current?.contains(e.target as Node)) && mapIndex === null) {
                clickRef.current = null
                setClickState(null)
            }
        }}>
            <MapToggle_Containper onClick={mapHandler}>
                <div style={{fontSize: '13px', marginRight: '5px'}}>지도</div>
                {mapModal ?
                    <i className="fi fi-br-angle-down" style={{marginTop: '3px'}}></i> :
                    <i className="fi fi-br-angle-right" style={{marginTop: '3px'}}></i>
                }
            </MapToggle_Containper>
            {mapModal &&
                <ScheduleMap_Container id="map" ref={mapElement}/>}
            {mapIndex !== null &&
                <LocationSetModal dispatchSubSchedule={dispatchSubSchedule}
                                  subScheduleIndex={mapIndex}
                                  onClose={() => setMapIndex(null)}/>
            }
            {subScheduleEdit.map((schedule, idx) => (
                <ScheduleDetailList_Progress key={idx}>
                    <ScheduleDetailList_Structure_Container>
                        <ScheduleDetailList_TopLine_Container
                            $isNow={idx === 0 ? startDate <= nowTime : scheduleTime[idx - 1] <= nowTime}
                            $isClick={idx === clickState}/>
                        <ScheduleDetailList_Circle
                            $isNow={idx === 0 ? startDate <= nowTime : scheduleTime[idx - 1] <= nowTime}
                            $isClick={idx === clickState}/>
                        {idx !== subScheduleEdit.length - 1 &&
                            <ScheduleDetailList_BottomLine_Container $isNow={scheduleTime[idx] <= nowTime}/>}
                    </ScheduleDetailList_Structure_Container>

                    <ScheduleDetail_Wrapper>
                        <MapInterval_Container/>
                        <ScheduleDetailList_Div
                            onClick={(e) => clickStateHandler(e, idx)}
                            onDrag={dragMousePosition}
                            draggable={editMode}
                            onDragStart={(e) => dragStart(e, idx)}
                            onDragEnter={(e) => {
                                dragEnter(e, idx)
                                setClickState(null)
                                clickRef.current = null
                            }}
                            onDragEnd={drop}
                            onDragOver={(e) => e.preventDefault()}
                            $isDrop={dragIndex.current === idx}
                            $isClick={clickState !== null && idx === clickState}>

                            <SubSchedule_Title_Container>
                                {editMode ?
                                    <EditSubSchedule_Title value={schedule.subScheduleTitle}
                                                           disabled={dragIndex.current !== null}
                                                           maxLength={20}
                                                           placeholder={dragIndex.current === idx ? '' : '제목을 입력해주세요'}
                                                           onChange={(e) => dispatchSubSchedule({
                                                               type: 'SET_TITLE',
                                                               payload: {index: idx, title: e.target.value}
                                                           })}/>
                                    :
                                    <SubSchedule_Title_Wrapper>{schedule.subScheduleTitle}</SubSchedule_Title_Wrapper>}
                            </SubSchedule_Title_Container>
                            <ScheduleDetail_Wrapper_Container>
                                <ScheduleDetail_ContentTitle_Container>
                                    {dragIndex.current !== idx &&
                                        <MapIcon_Container onClick={() => editMode && setMapIndex(idx)}>
                                            <i className="bi bi-geo-alt-fill"></i>
                                        </MapIcon_Container>
                                    }
                                    위치 :
                                </ScheduleDetail_ContentTitle_Container>
                                <MapPositionText_Container $isDrag={dragIndex.current === idx}
                                                           $isNull={schedule.location === ''}>
                                    {schedule.location ? schedule.location : (editMode ? '아이콘을 눌러 위치를 지정해주세요' : '위치를 설정하지 않았습니다.')}
                                </MapPositionText_Container>
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
                                    {idx === 0 ? shortAHMTimeFormat(startDate) : shortAHMTimeFormat(scheduleTime[idx - 1])}
                                    {' ~ '}
                                    {shortAHMTimeFormat(scheduleTime[idx])}
                                    ({editMode ?
                                    <EditDuration_Input max={9999}
                                                        disabled={dragIndex.current !== null}
                                                        onChange={(e) =>( e.target.value.length < 4) && dispatchSubSchedule({
                                                            type: "SET_DURATION",
                                                            payload: {
                                                                index: idx,
                                                                duration: parseInt(e.target.value, 10)
                                                            }
                                                        })}
                                                        value={schedule.subScheduleDuration + ""}
                                                        $numLength={(schedule.subScheduleDuration + "").split('').length}/>
                                    : <span style={{marginInline: '3px'}}>{schedule.subScheduleDuration}</span>}분 )
                                </ScheduleDetail_Content_Container>
                            </ScheduleDetail_Wrapper_Container>
                            <ScheduleDetail_Wrapper_Container>
                                {editMode ?
                                    <EditSubSchedule_Content rows={1}
                                                             ref={el => textAreaRef.current[idx] = el}
                                                             placeholder={dragIndex.current === idx ? '' : '내용을 입력해주세요'}
                                                             value={schedule.subScheduleContent}
                                                             disabled={dragIndex.current !== null}
                                                             onChange={(e) => handleResizeHeight(e, idx)}/> :
                                    <SubSchedule_Content_Container>
                                        {schedule.subScheduleContent}
                                    </SubSchedule_Content_Container>
                                }
                            </ScheduleDetail_Wrapper_Container>
                            <ScheduleDetail_Wrapper_Container>
                                <SubScheduleOption_Container style={{marginTop:'5px'}}>
                                    <SubScheduleJoinUser_Container>
                                        <ScheduleDetail_ContentTitle_Container style={{height:'100%'}}>
                                            참가인원 :
                                        </ScheduleDetail_ContentTitle_Container>
                                        <SubScheduleJoinUser_Wrapper>
                                            {dragIndex.current !==idx &&
                                                !schedule.joinUser.length ?
                                                    <SubScheduleJoinUser_Empty>
                                                        참여중인 인원이 없습니다.
                                                    </SubScheduleJoinUser_Empty>
                                                :
                                                schedule.joinUser.map((userId, idx) => (
                                                    idx < 4 &&
                                                    <ProfileContainer style={{width:'20px', height:'20px', minWidth:'unset'}} $userId={userId} key={userId}/>
                                                ))
                                            }
                                        </SubScheduleJoinUser_Wrapper>
                                    </SubScheduleJoinUser_Container>
                                    {!editMode &&
                                        <Modal_Condition_Button $isAble={true}
                                                                style={{width:'60px', fontSize:'12px'}}
                                                                onClick={()=>joinSubSchedule(schedule.subScheduleId, idx)}>
                                            {schedule.joinUser.some((id)=> id===localStorage.getItem('userId')) ? '나가기' : '참여하기'}
                                        </Modal_Condition_Button>
                                    }
                                </SubScheduleOption_Container>
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
                        {editMode ?
                            <EditSubSchedule_Title value={subScheduleEdit[dragIndex.current].subScheduleTitle}
                                                   disabled={true}
                                                   maxLength={20}
                                                   placeholder={'제목을 입력해주세요'}
                                                  />
                            :
                            <SubSchedule_Title_Wrapper>
                                {subScheduleEdit[dragIndex.current].subScheduleTitle}
                            </SubSchedule_Title_Wrapper>}
                    </SubSchedule_Title_Container>

                    <ScheduleDetail_Wrapper_Container>
                        <ScheduleDetail_ContentTitle_Container>
                            <MapIcon_Container>
                                <i className="bi bi-geo-alt-fill"></i>
                            </MapIcon_Container>
                            위치 :
                        </ScheduleDetail_ContentTitle_Container>
                        <MapPositionText_Container $isDrag={false}
                                                   $isNull={subScheduleEdit[dragIndex.current].location === ''}>
                            {subScheduleEdit[dragIndex.current].location ? subScheduleEdit[dragIndex.current].location : (editMode ? '아이콘을 눌러 위치를 지정해주세요' : '위치를 설정하지 않았습니다.')}
                        </MapPositionText_Container>
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
                            {dragIndex.current === 0 ? shortAHMTimeFormat(startDate) : shortAHMTimeFormat(scheduleTime[dragIndex.current - 1])}
                            {' ~ '}
                            {shortAHMTimeFormat(scheduleTime[dragIndex.current])}
                            ( {subScheduleEdit[dragIndex.current].subScheduleDuration}분 )
                        </ScheduleDetail_Content_Container>
                    </ScheduleDetail_Wrapper_Container>

                    <ScheduleDetail_Wrapper_Container>
                        <SubSchedule_Content_Container>
                            {subScheduleEdit[dragIndex.current].subScheduleContent ||
                                <div style={{color: `${TextColor}77`}}>
                                    내용을 입력해주세요
                                </div>}
                        </SubSchedule_Content_Container>
                    </ScheduleDetail_Wrapper_Container>
                    <ScheduleDetail_Wrapper_Container>
                        <SubScheduleOption_Container style={{marginTop:'5px'}}>
                            <SubScheduleJoinUser_Container>
                                <ScheduleDetail_ContentTitle_Container style={{height:'100%'}}>
                                    참가인원 :
                                </ScheduleDetail_ContentTitle_Container>
                                <SubScheduleJoinUser_Wrapper>
                                    {!subScheduleEdit[dragIndex.current].joinUser.length ?
                                        <SubScheduleJoinUser_Empty>
                                            참여중인 인원이 없습니다.
                                        </SubScheduleJoinUser_Empty>
                                        :
                                        subScheduleEdit[dragIndex.current].joinUser.map((userId, idx) => (
                                            idx < 4 &&
                                            <ProfileContainer style={{width:'20px', height:'20px'}} $userId={userId} key={userId}/>
                                        ))
                                    }
                                </SubScheduleJoinUser_Wrapper>
                            </SubScheduleJoinUser_Container>
                        </SubScheduleOption_Container>
                    </ScheduleDetail_Wrapper_Container>
                </ScheduleDetailList_Div>}

        </ScheduleDetailList_Container>
    );
}