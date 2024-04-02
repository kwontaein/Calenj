import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 locale 추가


export function stateFilter(error: string): void {
    if (error === "ALL_TOKEN_EXPIRED") {
        window.alert("모든 토큰이 만료되었습니다. 재로그인하세요.")
        document.location.replace('/sign')

    } else if (error === "UNKNOWN_EXCEPTION") {
        window.alert("알수없는 접근입니다 재로그인하세요.")
        console.log('ㅎㅇ')

    } else if (error === "NON_EXISTENT_ERROR") {
        window.alert("존재하지 않는 아이디 입니다. 다시 확인해주세요.")

    } else if (error === "PW_ERROR") {
        window.alert("비밀번호가 틀렸습니다. 다시 입력해주세요.")
    }
}


export function useConfirm(massage = " ", onConfirm: () => void, onCancel: () => void) {
    if (typeof onConfirm !== "function") {
        return;
    }
    if (typeof onCancel !== "function") {
        return;
    }
    const confrimAction = () => { //취할 행동
        if (window.confirm(massage)) { //확신 시
            onConfirm();
        } else {
            onCancel(); //취소 누르면 실행
        }
    };
    return confrimAction();
}







/*************************************날짜 관련 함수*************************************/ 
const now = new Date();
const minute = 1000*60 //1분
const hour = minute*60;
const oneDay = hour*24 //하루

// DB의 날짜를 받아 format형식을(오전/오후) 시간 형식으로 format
export function AHMFormat(date:Date):string{
    return dayjs(date).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')
}


export const createTimePassed =(date:string)=>{
    const created = changeDateForm(date);
    const lastTime = (Number(now)-Number(created));
    let result;

    if(lastTime<minute){
        result='방금'
    }else if(lastTime<oneDay){//하루가 안 지났으면
        result =(lastTime<hour? `${(lastTime/minute).toFixed(0)}분 전`:`${(lastTime/hour).toFixed(0)}시간 전`)
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