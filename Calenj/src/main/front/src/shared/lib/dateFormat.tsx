import dayjs from "dayjs";

const minute = 1000 * 60 //1분
const hour = minute * 60;
const oneDay = hour * 24 //하루

// DB의 날짜를 받아 format형식을(오전/오후) 시간 형식으로 format
export function AHMFormat(date: Date): string {
    return dayjs(date).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')
}
export function shortAHMFormat2(date: Date): string{
    return dayjs(date).locale('ko').format('MM월 DD일 (ddd)')
}

export function AHMFormatV2(date: Date): string {
    const now = new Date();

    const lastTime = Number(now.getDate()) - Number(date.getDate())
    if (lastTime === 0) {
        return dayjs(date).locale('ko').format('오늘 A hh:mm')
    } else if (lastTime === 1) {
        return dayjs(date).locale('ko').format('어제 A hh:mm')
    } else {
        return dayjs(date).locale('ko').format('YYYY.MM.DD. A hh:mm')
    }

}

export function shortAHMFormat(date: Date): string {
    return dayjs(date).locale('ko').format('A hh:mm')
}


export const createTimePassed = (date: string): string => {
    const now = new Date();
    const created = changeDateForm(date);
    const lastTime = (Number(now) - Number(created));
    let result;

    if (lastTime < minute) {
        result = '방금'
    } else if (lastTime < oneDay) {//하루가 안 지났으면
        result = (lastTime < hour ? `${Math.floor((lastTime / minute))}분 전` : `${(lastTime / hour).toFixed(0)}시간 전`)
    } else {
        result = AHMFormat(created).slice(6);//년도 자르고 보이기
    }
    return result
}

//아래 함수 인자로 들어가기 위해 전환
export function saveDBFormat(date: Date): string {
    return dayjs(date).format('YYYY.MM.DD HH:mm')
}


// YYYY.MM.DD HH:mm 형식의 데이터를 받아 Date를 생성해주는 함수
export function changeDateForm(date: string): Date {
    let list = date.split(' ');
    let YYMMDD: number[] = list[0].split('.').map((yymmdd) => Number(yymmdd));
    let hhmm: number[] = list[1].split(':').map((hm) => Number(hm));
    return new Date(YYMMDD[0], YYMMDD[1] - 1, YYMMDD[2], hhmm[0], hhmm[1]);
}


//남은시간 계산
export const timeOperation = (endDate: string): string => {
    const now = new Date();
    const end = changeDateForm(endDate);
    const remaining = Number(end) - Number(now);

    let result: string;
    if (now > end) {
        result = `${AHMFormat(end).slice(6)} 종료`
    } else if (remaining < hour) {//1시간도 안남았으면
        result = `${Math.floor(remaining / minute)}분 남음`
    } else if (remaining < (oneDay)) { //하루 전이면
        result = `${Math.floor(remaining / hour)}시간 남음`
    } else {
        result = `${Math.round(remaining / oneDay)}일 남음`
    }
    return result;
}
