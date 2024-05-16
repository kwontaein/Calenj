export function useLoginFilter(error: string): void {
    if (error === "NON_EXISTENT_ERROR") {
        window.alert("존재하지 않는 아이디 입니다. 다시 확인해주세요.")

    } else if (error === "PW_ERROR") {
        window.alert("비밀번호가 틀렸습니다. 다시 입력해주세요.")
    } else {
        window.alert("알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.")
    }
}
