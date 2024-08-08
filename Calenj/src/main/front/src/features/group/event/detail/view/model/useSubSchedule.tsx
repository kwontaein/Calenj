import {DragEvent, useCallback, useEffect, useReducer, useRef, useState} from "react";
import {
    GroupSchedule,
    SubSchedule,
    useFetchGroupScheduleList,
    useFetchGroupSubScheduleList, useFetchUserDateEvent
} from "../../../../../../entities/reactQuery";
import {v4 as uuidv4} from "uuid";
import {groupEventSate, GroupSubScheduleAction, groupSubScheduleReducer} from "../../../../../../entities/group";
import {useConfirm} from "../../../../../../shared/model";
import {saveSubScheduleApi} from "../api/saveSubScheduleApi";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../entities/redux";
import {joinSubScheduleApi} from "../api/joinSubScheduleApi";
import {ReturnSubSchedule} from "./types";


export const useSubSchedule = (originGroupSchedule: GroupSchedule, groupScheduleEdit: groupEventSate, setEditMode: React.DispatchWithoutAction):ReturnSubSchedule => {
    const dragIndex = useRef<number | null>(null); // 드래그할 아이템의 인덱스
    const dragOverIndex = useRef<number | null>(null); // 드랍할 위치의 아이템의 인덱스
    const [initialDragPosition, setInitialDragPosition] = useState<{ x: number, y: number } | null>(null); // 드래그 시작 시 요소의 위치
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
    const [ItemWidth, setItemWidth] = useState<number | null>(null);
    const [scheduleTime, setScheduleTime] = useState<Date[]>([groupScheduleEdit.startDate])
    const deleteRef = useRef<number | null>(null)

    const groupId = useSelector((state: RootState) => state.subNavigation.group_subNavState.param)
    const groupScheduleList = useFetchGroupScheduleList(groupId)


    const groupSubScheduleList = useFetchGroupSubScheduleList(originGroupSchedule.scheduleId); //이 리스트로 넣으면 됨
    const [subScheduleEdit, dispatchSubSchedule] = useReducer(groupSubScheduleReducer, [])

    const userId = localStorage.getItem('userId')||''
    const userEventDateState = useFetchUserDateEvent(userId)

    useEffect(() => {
        if (groupSubScheduleList.data) {
            console.log(groupSubScheduleList.data)
            dispatchSubSchedule({type: 'SET_SUB_SCHEDULE_LIST', payload: groupSubScheduleList.data})
        }
    }, [groupSubScheduleList.data])

    // 드래그 시작될 때 실행
    const dragStart = (e: DragEvent<HTMLDivElement>, position: number) => {

        dragIndex.current = position;
        deleteRef.current = position;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setDragImage(new Image(), 0, 0); // Hide the default drag image
        const {top, left} = e.currentTarget.getBoundingClientRect();
        setInitialDragPosition({x: e.pageX - left, y: e.pageY - top});
        setItemWidth(e.currentTarget.clientWidth)
    };


    // 드래그 중인 대상이 위로 포개졌을 때
    const dragEnter = (e: DragEvent<HTMLDivElement>, position: number) => {
        dragOverIndex.current = position;
        const newList = [...subScheduleEdit];
        const dragIndexValue = newList[dragIndex.current!];

        // 드래그한 요소를 제거
        newList.splice(dragIndex.current!, 1);
        // 드롭 위치에 요소를 추가하고 나머지를 뒤로 밀기
        newList.splice(dragOverIndex.current, 0, dragIndexValue);
        dispatchSubSchedule({type: "SET_SUB_SCHEDULE_LIST", payload: newList});
        dragIndex.current = dragOverIndex.current;
        deleteRef.current = dragOverIndex.current;
    };

    // 드랍 (커서 뗐을 때)
    const drop = () => {
        dispatchSubSchedule({type: "SET_INDEX"})
        dragIndex.current = null;
        dragOverIndex.current = null;
        setMousePosition(null)
        setInitialDragPosition(null)
    };

    const dragMousePosition = (e: DragEvent<HTMLDivElement>) => {
        if (initialDragPosition === null) return
        // console.log(e.pageX, e.pageY)
        if ((e.pageX - initialDragPosition.x) > 0 && (e.pageY - initialDragPosition.y) > 0) {
            setMousePosition({
                x: e.pageX - initialDragPosition.x,
                y: e.pageY - initialDragPosition.y
            })
        }

    }

    const addSubSchedule = () => {

        const UUid = uuidv4();
        const newSchedule = {
            index: subScheduleEdit.length || 0,
            subScheduleId: UUid,
            subScheduleTitle: "",
            subScheduleContent: "",
            subScheduleCreate: new Date(),
            subScheduleDuration: 0,
            location: "",
            positionX: "",
            positionY: "",
            duration: "",
            joinUser: [],
        }
        dispatchSubSchedule({type: "SET_SUB_SCHEDULE_LIST", payload: [...subScheduleEdit, newSchedule]});
    }

    const deleteSubSchedule = useCallback(() => {
        if (deleteRef.current === null) return
        const deleteSchedule = () => {
            const newList = [...subScheduleEdit];
            // 드래그한 요소를 제거
            newList.splice(dragIndex.current!, 1);
            dispatchSubSchedule({type: "SET_SUB_SCHEDULE_LIST", payload: newList});
        }
        useConfirm("정말로 해당 일정을 삭제하시겠습니까?", deleteSchedule, () => {
        })
        deleteRef.current = null

    }, [deleteRef.current])

    useEffect(() => {
        scheduleTimeOperation();
    }, [subScheduleEdit, groupScheduleEdit.startDate]);


    const saveGroupSchedule = () => {
        const postAble = subScheduleEdit.every((subSchedule) => subSchedule.subScheduleTitle !== "")
        if (postAble) {
            const postScheduleData = {
                ...originGroupSchedule,
                ...groupScheduleEdit,
                groupSubSchedules: subScheduleEdit
            }
            saveSubScheduleApi(postScheduleData)
                .then(() => {
                    window.alert('저장이 완료되었습니다')
                    groupScheduleList.refetch()
                    groupSubScheduleList.refetch()
                    setEditMode()
                })
                .catch((err) => {
                    console.log()
                })
        } else {
            window.alert('일정의 제목을 입력해주세요.')
        }
    }


    const scheduleTimeOperation = () => {
        let timeResult: Date[] = [];
        let time = new Date(groupScheduleEdit.startDate);
        subScheduleEdit.forEach((schedule) => {
            time.setMinutes(time.getMinutes() + schedule.subScheduleDuration)
            const cloneTime = new Date(time)
            timeResult.push(cloneTime)
        })
        setScheduleTime(timeResult)
    }

    const joinSubSchedule = (subScheduleId:string,index:number)=>{
        const postJoin = ()=>{
            joinSubScheduleApi(subScheduleId).then((res) => {
                window.alert(res)
                groupSubScheduleList.refetch()
                userEventDateState.refetch()
            })
        }
        const isExit = subScheduleEdit[index].joinUser.some((id)=> id===localStorage.getItem('userId'))
            useConfirm(isExit ? '해당 일정에 나가겠습니까?':'해당 일정에 참여하시겠습니까?',postJoin,()=>{})

    }

    return {
        dragEnter,
        dragMousePosition,
        drop,
        dragStart,
        subScheduleEdit,
        dispatchSubSchedule,
        addSubSchedule,
        deleteSubSchedule,
        saveGroupSchedule,
        joinSubSchedule,
        mousePosition,
        ItemWidth,
        dragIndex,
        deleteRef,
        scheduleTime
    }
}