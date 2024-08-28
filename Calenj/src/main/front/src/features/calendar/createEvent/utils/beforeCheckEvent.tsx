import {TodoItem} from "../model/types";
import {DateEventState, RepeatState} from "../../../../entities/calendar";

export const beforeCheckEvent = (repeatState:RepeatState, eventState : DateEventState, todoList:TodoItem[]):boolean =>{
    const {title, content, formState, startDate, backgroundColor } = eventState
    const {repeat, startTime, endTime, repeatDeadline, repeatWeek, repeatEnd, repeatMode, repeatNum, repeatCount} = repeatState
    let responseResult = true;

    if (title === "") {
        window.alert('제목을 입력해주세요.')
    }
    if (formState === "promise" && content === "") {
        window.alert('내용을 입력해주세요.')
        responseResult = false
    } else if (formState === "todo" && todoList.length === 0) {
        window.alert('할 일을 추가해주세요.')
        responseResult = false
    } else if (backgroundColor === "") {
        window.alert('한 개 이상의 태그를 선택해주세요.')
        responseResult = false;
    }

    if (repeat) {
        if (repeatMode === "" || repeatDeadline === "") {
            window.alert('반복 설정을 해주세요')
            responseResult = false
        }
        if (repeatMode === "cycle" && repeatNum < 1) {
            window.alert('반복 주기를 1이상의 값으로 설정해주세요')
            responseResult = false
        }
        if (repeatMode === "week" && repeatWeek && repeatWeek.indexOf(true) < 0) {
            window.alert('반복할 요일을 하나이상 선택해주세요.')
            responseResult = false;
        }
        if (repeatDeadline === "count" && repeatCount < 1) {
            window.alert('반복 횟수를 1이상으로 설정해주세요')
            responseResult = false
        }
        if (startTime > endTime) {
            window.alert('시작시간이 끝나는 시간보다 클 수 없습니다.')
            responseResult = false
        }
        if (repeatDeadline === "date" && (repeatEnd < startDate)) {
            window.alert('반복마감 기간을 설정한 시작날짜 이후로 설정해주세요.')
            responseResult = false
        }
    }
    return responseResult
}