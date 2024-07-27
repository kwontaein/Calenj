import React, {useState, useRef, DragEvent} from "react";
import {Circle, Line, StandHr, Structure_Container, TestContainer, TestDiv, TestProgress} from "./testStyled";

export const Test: React.FC = () => {
    const dragItem = useRef<number | null>(null); // 드래그할 아이템의 인덱스
    const dragOverItem = useRef<number | null>(null); // 드랍할 위치의 아이템의 인덱스

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
        dragItem.current = position;
        setDragging(true);
        console.log(e.currentTarget.innerHTML);
    };

    // 드래그 중인 대상이 위로 포개졌을 때
    const dragEnter = (e: DragEvent<HTMLDivElement>, position: number) => {
        dragOverItem.current = position;
        console.log(e.currentTarget.innerHTML);

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
    };

    return (
        <TestContainer>
            {list.map((item, idx) => (
                <TestProgress key={idx}>
                    <Structure_Container>
                        <Circle $isNow={true}/>
                        <StandHr $isNow={true}/>
                        <Line $isNow={true}/>
                    </Structure_Container>
                    <TestDiv
                        draggable
                        onDragStart={(e) => dragStart(e, idx)}
                        onDragEnter={(e) => dragEnter(e, idx)}
                        onDragEnd={drop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        {item}
                    </TestDiv>
                </TestProgress>
            ))}
        </TestContainer>
    );
};
