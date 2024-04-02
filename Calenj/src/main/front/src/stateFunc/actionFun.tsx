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


export function CreateDate(date: Date): string {
    return dayjs(date).locale('ko').format('YYYY년 MM월 DD일 A hh:mm')
}