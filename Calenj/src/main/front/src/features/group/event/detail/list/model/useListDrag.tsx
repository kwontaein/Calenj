import {DragEvent, useEffect, useRef, useState} from "react";
import {SubSchedule} from "../../../../../../entities/reactQuery";
import {v4 as uuidv4} from "uuid";
import {shortAHMTimeFormat} from "../../../../../../shared/lib/dateFormat";


interface ReturnListDrag{
    dragStart : (e: DragEvent<HTMLDivElement>, position: number)=>void,
    dragEnter : (e: DragEvent<HTMLDivElement>, position: number) => void,
    drop: ()=>void,
    dragMousePosition : (e: DragEvent<HTMLDivElement>) => void,
    mousePosition: {x: number, y: number} | null,
    ItemWidth:number|null,
    scheduleData:SubSchedule[],
    dragIndex: React.MutableRefObject<number | null>,
    addSubSchedule: ()=>void,
    scheduleTime:Date[]
}
export const useListDrag = (initScheduleList :SubSchedule[], startTime:Date):ReturnListDrag =>{
    const dragIndex = useRef<number | null>(null); // 드래그할 아이템의 인덱스
    const dragOverIndex = useRef<number | null>(null); // 드랍할 위치의 아이템의 인덱스
    const [initialDragPosition, setInitialDragPosition] = useState<{ x: number, y: number } | null>(null); // 드래그 시작 시 요소의 위치
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number }|null>(null);
    const [ItemWidth,setItemWidth] = useState<number|null>(null);
    const [scheduleData,setScheduleData] =useState<SubSchedule[]>(initScheduleList)
    const [scheduleTime, setScheduleTime] = useState<Date[]>([startTime])
    // 드래그 시작될 때 실행
    const dragStart = (e: DragEvent<HTMLDivElement>, position: number) => {

        dragIndex.current = position;

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setDragImage(new Image(), 0, 0); // Hide the default drag image
        const {top, left} = e.currentTarget.getBoundingClientRect();
        setInitialDragPosition({x: e.pageX - left, y: e.pageY - top});
        setItemWidth(e.currentTarget.clientWidth)
    };


    // 드래그 중인 대상이 위로 포개졌을 때
    const dragEnter = (e: DragEvent<HTMLDivElement>, position: number) => {
        dragOverIndex.current = position;
        const newList = [...scheduleData];
        const dragIndexValue = newList[dragIndex.current!];

        // 드래그한 요소를 제거
        newList.splice(dragIndex.current!, 1);
        // 드롭 위치에 요소를 추가하고 나머지를 뒤로 밀기
        newList.splice(dragOverIndex.current, 0, dragIndexValue);
        setScheduleData(newList);
        dragIndex.current = dragOverIndex.current;
    };

    // 드랍 (커서 뗐을 때)
    const drop = () => {
        dragIndex.current = null;
        dragOverIndex.current = null;
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

    const addSubSchedule = ()=>{
        setScheduleData((prev:SubSchedule[])=>{
            const UUid = uuidv4();
            const newSchedule = {
                index: prev.length,
                subSubScheduleId: UUid,
                subScheduleTitle: "",
                subScheduleContent: "",
                subScheduleCreate: new Date(),
                subScheduleDuration: 0,
                joinUser: [],
            }
            return [...prev,newSchedule]
        })
    }


    useEffect(() => {
        scheduleTimeOperation();
    }, [scheduleData]);

    const scheduleTimeOperation = ()=>{
        let timeResult:Date[]=[];
        let time =new Date(startTime);
        scheduleData.forEach((schedule)=>{
            time.setMinutes(time.getMinutes() + schedule.subScheduleDuration)
            const cloneTime = new Date(time)
            timeResult.push(cloneTime)
        })
        console.log(timeResult)
        setScheduleTime(timeResult)
    }
    return {dragEnter, dragMousePosition, drop, dragStart,addSubSchedule, mousePosition, ItemWidth, scheduleData, dragIndex,scheduleTime}
}