

export function stateFilter (error:string): void{
    if (error === "ALL_TOKEN_EXPIRED") {
        window.alert("모든 토큰이 만료되었습니다. 재로그인하세요.")
        document.location.replace('/sign')
        
    } else if (error === "UNKNOWN_EXCEPTION") {
        window.alert("알수없는 접근입니다 재로그인하세요.")
        document.location.replace('/sign')

    } else if (error === "NON_EXISTENT_ERROR") {
        window.alert("존재하지 않는 아이디 입니다. 다시 확인해주세요.")
        
    } else if (error === "PW_ERROR") {
        window.alert("비밀번호가 틀렸습니다. 다시 입력해주세요.")
    }
}