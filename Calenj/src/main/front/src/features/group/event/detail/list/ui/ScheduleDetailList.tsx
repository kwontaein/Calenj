import React, {DragEvent, useEffect, useRef, useState} from "react";
import {
    JoinUser,
    ScheduleDetailAdd_BlankHr,
    ScheduleDetailAdd_Circle,
    ScheduleDetailAdd_Div,
    ScheduleDetailAdd_Line,
    ScheduleDetailAdd_Progress,
    ScheduleDetailAdd_StandHr,
    ScheduleDetailAdd_Structure_Container,
    ScheduleDetailList_Circle,
    ScheduleDetailList_Container,
    ScheduleDetailList_Div,
    ScheduleDetailList_Line,
    ScheduleDetailList_Progress,
    ScheduleDetailList_StandHr,
    ScheduleDetailList_Structure_Container,
    Sub_Schedule_Bottom, Sub_Schedule_Middle,
    Sub_Schedule_Top,
    SubSchedule_Delete,
    SubScheduleContent, SubScheduleDuration,
    SubScheduleTitle, UserProfile
} from "./ScheduleDetailListStyled";
import {Schedule_Button, ScheduleButton_Container} from "../../view/ui/ScheduleDetailStyled";
import {SubSchedule, useFetchGroupSubScheduleList} from "../../../../../../entities/reactQuery";
import {useSelector} from "react-redux";
import {RootState, updateScheduleState} from "../../../../../../entities/redux";
import {EventStateMap} from "../../../../../../entities/redux/model/module/StompMiddleware";

export const ScheduleDetailList: React.FC = () => {
    const dragItem = useRef<number | null>(null); // 드래그할 아이템의 인덱스
    const dragOverItem = useRef<number | null>(null); // 드랍할 위치의 아이템의 인덱스
    const [initialDragPosition, setInitialDragPosition] = useState<{ x: number, y: number } | null>(null); // 드래그 시작 시 요소의 위치
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
    const [ItemWidth, setItemWidth] = useState<number | null>(null);

    const {scheduleId} = useSelector((state: RootState) => state.groupSchedule)
    const groupSubScheduleList = useFetchGroupSubScheduleList(scheduleId); //이 리스트로 넣으면 됨

    const [list, setList] = useState<string[]>(["아이테"]);
    const [dragging, setDragging] = useState<boolean>(false);


    // 드래그 시작될 때 실행
    const dragStart = (e: DragEvent<HTMLDivElement>, position: number) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setDragImage(new Image(), 0, 0); // Hide the default drag image
        const {top, left} = e.currentTarget.getBoundingClientRect();
        setInitialDragPosition({x: e.pageX - left, y: e.pageY - top});
        setItemWidth(e.currentTarget.clientWidth)
        setDragging(true);
        dragItem.current = position;
    };


    // 드래그 중인 대상이 위로 포개졌을 때
    const dragEnter = (e: DragEvent<HTMLDivElement>, position: number) => {
        dragOverItem.current = position;
        const newList = [...list];
        const dragItemValue = newList[dragItem.current!];

        // 드래그한 요소를 제거
        newList.splice(dragItem.current!, 1);
        // 드롭 위치에 요소를 추가하고 나머지를 뒤로 밀기
        newList.splice(dragOverItem.current, 0, dragItemValue);
        setList(newList);
        dragItem.current = dragOverItem.current;
    };

    // 드랍 (커서 뗐을 때)
    const drop = () => {
        setDragging(false);
        dragItem.current = null;
        dragOverItem.current = null;
        setMousePosition(null)
        setInitialDragPosition(null)
    };

    const dragMousePosition = (e: DragEvent<HTMLDivElement>) => {
        if (initialDragPosition) {
            // console.log(e.pageX, e.pageY)
            setMousePosition({
                x: e.pageX - initialDragPosition.x,
                y: e.pageY - initialDragPosition.y
            })
        }
    }

    return (
        <ScheduleDetailList_Container>

            {list.map((item, idx) => (
                <ScheduleDetailList_Progress key={idx}>
                    <ScheduleDetailList_Structure_Container>
                        <div>
                            <ScheduleDetailList_StandHr $isNow={true}/>
                            <ScheduleDetailList_Circle $isNow={true}/>
                            <ScheduleDetailList_StandHr $isNow={true}/>
                        </div>
                        <ScheduleDetailList_Line $isNow={true}/>
                    </ScheduleDetailList_Structure_Container>
                    <ScheduleDetailList_Div
                        onDrag={dragMousePosition}
                        draggable
                        onDragStart={(e) => dragStart(e, idx)}
                        onDragEnter={(e) => dragEnter(e, idx)}
                        onDragEnd={drop}
                        onDragOver={(e) => e.preventDefault()}
                        $isDrop={dragging && dragItem.current === idx}
                    >
                        <Sub_Schedule_Top>
                            <SubScheduleTitle>제목</SubScheduleTitle>
                            <SubSchedule_Delete>id로 수정</SubSchedule_Delete>
                        </Sub_Schedule_Top>
                        <SubScheduleDuration>● 07 : 00</SubScheduleDuration>
                        <SubScheduleContent>subScheduleContent</SubScheduleContent>
                        <JoinUser>
                            <UserProfile $userId={"2c7f2d75-6dcd-4802-929d-174cb65dce22"}></UserProfile>
                            <UserProfile $userId={"2c7f2d75-6dcd-4802-929d-174cb65dce22"}></UserProfile>
                            <UserProfile $userId={"none"}></UserProfile>
                        </JoinUser>
                    </ScheduleDetailList_Div>
                </ScheduleDetailList_Progress>
            ))}
            {(dragging && mousePosition) &&
                <ScheduleDetailList_Div $isDrop={false}
                                        style={{
                                            position: 'fixed',
                                            width: `${ItemWidth}px`,
                                            left: mousePosition.x,
                                            top: mousePosition.y,
                                            pointerEvents: 'none',
                                            opacity: '0.9'
                                        }}>
                    {list[dragItem.current || 0]}
                </ScheduleDetailList_Div>}
            <ScheduleDetailAdd_Progress>
                <ScheduleDetailAdd_Structure_Container>
                    <div>
                        <ScheduleDetailAdd_StandHr/>
                        <ScheduleDetailAdd_Circle/>
                        <ScheduleDetailAdd_BlankHr/>
                    </div>
                    <ScheduleDetailAdd_Line/>
                </ScheduleDetailAdd_Structure_Container>
                <ScheduleDetailAdd_Div>
                    +
                </ScheduleDetailAdd_Div>
            </ScheduleDetailAdd_Progress>
        </ScheduleDetailList_Container>
    );
}