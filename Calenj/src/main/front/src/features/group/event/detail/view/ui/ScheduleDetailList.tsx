import React, {ChangeEvent, useEffect, useReducer, useRef, useState} from "react";
import {
    EditDuration_Input,
    EditSubSchedule_Content, EditSubSchedule_Title, MapIcon_Container,
    MapInterval_Container, MapPositionText_Container,
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
    SubSchedule_Title_Container, SubSchedule_Title_Wrapper,
} from "./ScheduleDetailListStyled";
import {SubSchedule} from "../../../../../../entities/reactQuery";
import {PointColor, TextColor} from "../../../../../../shared/ui/SharedStyled";
import {shortAHMFormat2, shortAHMTimeFormat} from "../../../../../../shared/lib/dateFormat";
import {GroupSubScheduleAction,} from "../../../../../../entities/group";
import {ReturnListDrag} from "../model/types";
import {ScheduleMap_Container} from "./ScheduleDetailStyled";

interface ScheduleDetailProps{
    useGroupSubSchedule: ReturnListDrag,
    editMode:boolean
    startDate:Date;
    mapModal:boolean
}
export const ScheduleDetailList: React.FC<ScheduleDetailProps> = ({useGroupSubSchedule,editMode, startDate, mapModal}) => {
    const { subScheduleEdit, dispatchSubSchedule, scheduleTime, dragEnter, dragMousePosition, drop, dragStart, mousePosition, ItemWidth, dragIndex} = useGroupSubSchedule
    const textAreaRef = useRef<(HTMLTextAreaElement | null)[]>([]);
    const clickRef = useRef<HTMLDivElement|null>(null);
    const [clickState,setClickState] = useState<number|null>(null)
    const [nowTime, setNowTime] = useState<Date>(new Date())
    const [mapIndex, setMapIndex] = useState<number|null>(null);

    const mapElement = useRef<HTMLDivElement | null>(null);

    //Map 세팅
    useEffect(() => {
        let initMap: naver.maps.Map | null = null;

        if (mapModal) {
            initMap = new naver.maps.Map("map", {
                center: new naver.maps.LatLng(37.511337, 127.012084),
                zoom: 15,
                mapTypeControl: true,
            });
        }
        const handleResize = () => {
            if (!mapElement.current || !initMap) return;
            const { clientWidth } = mapElement.current;
            const size = new naver.maps.Size(clientWidth, 250);
            initMap.setSize(size);
        };

        if (mapModal && initMap) {
            window.addEventListener("resize", handleResize);
        }
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [mapModal]);
    //현재시간 갱신
    useEffect(() => {
        setInterval(()=>{
            setNowTime(new Date())
        },10000)
    }, []);
    //textArea value, height 갱신
    const handleResizeHeight = (e:ChangeEvent<HTMLTextAreaElement>,idx:number) => {
        dispatchSubSchedule({
            type:'SET_CONTENT',
            payload:{
                index:idx,
                content:e.target.value
            }})
        const textArea = textAreaRef.current[idx];

        if (textArea) {
            textArea.style.height = 'auto';
            textArea.style.height = textArea.scrollHeight + "px";
        }
    };
    useEffect(() => {
        if(!textAreaRef.current) return
        textAreaRef.current.map((textArea: HTMLTextAreaElement|null)=>{
            if (textArea) {
                textArea.style.height = 'auto';
                textArea.style.height = textArea.scrollHeight + "px";
            }
        })
    }, [editMode]);

    //현재 클릭한 subSchedule 지정
    const clickStateHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,idx:number)=>{
        clickRef.current = e.currentTarget as HTMLDivElement
        setClickState(idx)
    }


    return (

        <ScheduleDetailList_Container onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if(!(clickRef.current && clickRef.current?.contains(e.target as Node)) ) {
                clickRef.current=null
                setClickState(null)
            }
        }}>
            {mapModal && <ScheduleMap_Container id="map" ref={mapElement}/>}
            {setMapIndex!==null && <></>}
            {subScheduleEdit.map((schedule, idx) => (
                <ScheduleDetailList_Progress key={idx}>
                    <ScheduleDetailList_Structure_Container>
                        <ScheduleDetailList_TopLine_Container $isNow={idx ===0 ?startDate <= nowTime :scheduleTime[idx-1] <= nowTime}/>
                        <ScheduleDetailList_Circle $isNow={idx ===0 ?startDate <= nowTime :scheduleTime[idx-1] <= nowTime}/>
                        {idx !== subScheduleEdit.length - 1 &&
                            <ScheduleDetailList_BottomLine_Container $isNow={scheduleTime[idx] <= nowTime}/>}
                    </ScheduleDetailList_Structure_Container>

                    <ScheduleDetail_Wrapper>
                        <MapInterval_Container>

                        </MapInterval_Container>
                        <ScheduleDetailList_Div
                            onClick={(e)=> clickStateHandler(e, idx)}
                            onDrag={dragMousePosition}
                            draggable={editMode}
                            onDragStart={(e) => dragStart(e, idx)}
                            onDragEnter={(e) => {
                                dragEnter(e, idx)
                                setClickState(null)
                                clickRef.current=null
                            }}
                            onDragEnd={drop}
                            onDragOver={(e) => e.preventDefault()}
                            $isDrop={dragIndex.current === idx}
                            $isClick={clickState!==null && idx ===clickState}
                        >
                            <SubSchedule_Title_Container>
                                {editMode?
                                    <EditSubSchedule_Title value={schedule.subScheduleTitle}
                                                           disabled={dragIndex.current!==null}
                                                           maxLength={10} placeholder={dragIndex.current ===idx ? '':'제목을 입력해주세요'}
                                                           onChange={(e)=>dispatchSubSchedule({type:'SET_TITLE', payload:{index:idx, title:e.target.value}})}/>
                                    :<SubSchedule_Title_Wrapper>{schedule.subScheduleTitle}</SubSchedule_Title_Wrapper>}
                            </SubSchedule_Title_Container>
                            <ScheduleDetail_Wrapper_Container>
                                <ScheduleDetail_ContentTitle_Container>
                                    {dragIndex.current !== idx &&
                                        <MapIcon_Container onClick={()=>setMapIndex(idx)}>
                                            <i className="bi bi-geo-alt-fill"></i>
                                        </MapIcon_Container>
                                    }
                                    위치  :
                                </ScheduleDetail_ContentTitle_Container>
                                <MapPositionText_Container $isDrag={dragIndex.current===idx} $isNull={true}>
                                    아이콘을 눌러 위치를 지정해주세요
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
                                                        disabled={dragIndex.current!==null}
                                                        onChange={(e)=> e.target.value.length<4 && dispatchSubSchedule({type:"SET_DURATION", payload:{index:idx, duration:parseInt(e.target.value,10)}})}
                                                        value={schedule.subScheduleDuration+""}
                                                        $numLength={(schedule.subScheduleDuration+"").split('').length}/>
                                    : <span style={{marginInline:'3px'}}>{schedule.subScheduleDuration}</span>}분 )
                                </ScheduleDetail_Content_Container>
                            </ScheduleDetail_Wrapper_Container>
                            <ScheduleDetail_Wrapper_Container>
                                {editMode?
                                    <EditSubSchedule_Content rows={1}
                                                             ref={el => textAreaRef.current[idx] = el}
                                                             placeholder={dragIndex.current ===idx ? '':'내용을 입력해주세요'}
                                                             value={schedule.subScheduleContent}
                                                             disabled={dragIndex.current!==null}
                                                             onChange={(e)=> handleResizeHeight(e,idx)}/> :
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
                        {subScheduleEdit[dragIndex.current].subScheduleTitle ||
                            <div style={{color: `${TextColor}77`}}>
                                제목을 입력해주세요
                            </div>
                        }

                    </SubSchedule_Title_Container>
                    <ScheduleDetail_Wrapper_Container>
                        <ScheduleDetail_ContentTitle_Container>
                            <i className="bi bi-geo-alt-fill" style={{color: PointColor, marginRight: '5px'}}></i>
                            위치 :
                        </ScheduleDetail_ContentTitle_Container>
                        <MapPositionText_Container $isDrag={false} $isNull={true}>
                            아이콘을 눌러 위치를 지정해주세요
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
                            {subScheduleEdit[dragIndex.current].subScheduleContent||
                            <div style={{color:`${TextColor}77`}}>
                                내용을 입력해주세요
                            </div>}
                        </SubSchedule_Content_Container>
                    </ScheduleDetail_Wrapper_Container>
                </ScheduleDetailList_Div>}

        </ScheduleDetailList_Container>
        );
}