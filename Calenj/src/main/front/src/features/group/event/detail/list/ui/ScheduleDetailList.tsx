import React, {DragEvent, useRef, useState} from "react";
import {
    ScheduleDetailList_Circle,
    ScheduleDetailList_Container,
    ScheduleDetailList_Div, ScheduleDetailList_Line,
    ScheduleDetailList_Progress, ScheduleDetailList_StandHr, ScheduleDetailList_Structure_Container
} from "./ScheduleDetailListStyled";

export const ScheduleDetailList: React.FC = () => {
    const dragItem = useRef<number | null>(null); // 드래그할 아이템의 인덱스
    const dragOverItem = useRef<number | null>(null); // 드랍할 위치의 아이템의 인덱스
    const [initialDragPosition, setInitialDragPosition] = useState<{ x: number, y: number } | null>(null); // 드래그 시작 시 요소의 위치
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
    const [list, setList] = useState<string[]>([
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6"
    ]);
    const [dragging, setDragging] = useState<boolean>(false);

    // 드래그 시작될 때 실행
    const dragStart = (e: DragEvent<HTMLDivElement>, position: number) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setDragImage(new Image(), 0, 0); // Hide the default drag image
        const {top, left} = e.currentTarget.getBoundingClientRect();
        setInitialDragPosition({x: e.pageX - left, y: e.pageY - top});

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
                        {item}
                    </ScheduleDetailList_Div>
                </ScheduleDetailList_Progress>
            ))}
            {(dragging && mousePosition) &&
                <ScheduleDetailList_Div $isDrop={false}
                                        style={{
                                            position: 'fixed',
                                            left: mousePosition.x,
                                            top: mousePosition.y,
                                            pointerEvents: 'none',
                                            opacity: '0.9'
                                        }}>
                    {list[dragItem.current || 0]}
                </ScheduleDetailList_Div>}
        </ScheduleDetailList_Container>
    );
}