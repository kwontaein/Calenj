import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale 추가

export function loginFilter(error: string): void {
    if (error === "NON_EXISTENT_ERROR") {
        window.alert("존재하지 않는 아이디 입니다. 다시 확인해주세요.")

    } else if (error === "PW_ERROR") {
        window.alert("비밀번호가 틀렸습니다. 다시 입력해주세요.")
    } else {
        window.alert("알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.")
    }
}

export function stateFilter(error: string): void {
    if (error === "302") {
        window.alert("모든 토큰이 만료되었습니다. 재로그인하세요.")
        document.location.replace('/sign')

    } else if (error === "401") {
        window.alert("알수없는 접근입니다 재로그인하세요.")

    } else if (error === "409") {
        window.alert("다른 곳에서 로그인되었습니다. 로그아웃합니다")
        document.location.replace('/sign')
    }
}


export function useConfirm(massage = " ", onConfirm: () => void, onCancel: () => void, refetchQuery?:UseQueryResult) {
    if (typeof onConfirm !== "function") {
        return;
    }
    if (typeof onCancel !== "function") {
        return;
    }
    const confrimAction = () => { //취할 행동
        if (window.confirm(massage)) { //확신 시
            onConfirm();
            setTimeout(()=>{
                if(refetchQuery){
                    console.log('refetch')
                    refetchQuery.refetch();
                }
            },500)
            
        } else {
            onCancel(); //취소 누르면 실행
        }
    };
    return confrimAction();
}







/*************************************날짜 관련 함수*************************************/

const minute = 1000*60 //1분
const hour = minute*60;
const oneDay = hour*24 //하루

// DB의 날짜를 받아 format형식을(오전/오후) 시간 형식으로 format
export function AHMFormat(date:Date):string{
    return dayjs(date).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')
}


export const createTimePassed =(date:string)=>{
    const now = new Date();
    const created = changeDateForm(date);
    const lastTime = (Number(now)-Number(created));
    let result;

    if(lastTime<minute){
        result='방금'
    }else if(lastTime<oneDay){//하루가 안 지났으면
        result =(lastTime<hour? `${Math.floor((lastTime/minute))}분 전`:`${(lastTime/hour).toFixed(0)}시간 전`)
    }else{
        result = AHMFormat(created).slice(6);//년도 자르고 보이기
    }
    return result
}

//아래 함수 인자로 들어가기 위해 전환
export function saveDBFormat(date:Date):string{
    return dayjs(date).format('YYYY.MM.DD HH:mm')
}



// YYYY.MM.DD HH:mm 형식의 데이터를 받아 Date를 생성해주는 함수
export function changeDateForm(date:string){
    let list = date.split(' ');
    let YYMMDD :number[]= list[0].split('.').map((yymmdd)=> Number(yymmdd));

    let hhmm:number[]= list[1].split(':').map((hm)=> Number(hm));
    const newDate = new Date(YYMMDD[0], YYMMDD[1]-1,YYMMDD[2], hhmm[0], hhmm[1]);
    return newDate;
}


//남은시간 계산
export const TimeOperation =(endDate:string)=>{
    const now = new Date();
    const end = changeDateForm(endDate);
    const remaining =Number(end)-Number(now);

    let result:string;
    if(now>end){
        result = `${AHMFormat(end).slice(6)} 종료`
    }else if(remaining< hour){//1시간도 안남았으면
        result = `${Math.floor(remaining/minute)}분 남음`
    }else if(remaining<(oneDay)){ //하루 전이면
        result = `${Math.floor(remaining/hour)}시간 남음`
    }else{
        result = `${Math.round(remaining/oneDay)}일 남음`
    }
    return result;
}
