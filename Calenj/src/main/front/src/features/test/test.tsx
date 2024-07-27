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

    const dragStart = (e: DragEvent<HTMLDivElement>, position: number) => {
        dragItem.current = position;
        setDragging(true);
        console.log(e.currentTarget.innerHTML);
    };

    const dragEnter = (e: DragEvent<HTMLDivElement>, position: number) => {
        dragOverItem.current = position;
        console.log(e.currentTarget.innerHTML);

        // 드래그한 아이템과 드랍할 위치의 인덱스를 이용해 리스트를 재배치
        if (dragItem.current !== null) {
            const newList = [...list];
            const dragItemValue = newList[dragItem.current];

            // 드래그한 요소를 제거
            newList.splice(dragItem.current, 1);

            // 드랍할 위치에 요소를 추가
            newList.splice(dragOverItem.current!, 0, dragItemValue);

            setList(newList);
            dragItem.current = dragOverItem.current;
        }
    };

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
                        style={{
                            border: dragging && dragOverItem.current === idx ? '2px dashed #000' : 'none',
                        }}
                    >
                        {item}
                    </TestDiv>
                </TestProgress>
            ))}
        </TestContainer>
    );
};
