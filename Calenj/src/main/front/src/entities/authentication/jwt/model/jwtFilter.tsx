export function jwtFilter(error: string): void {
    console.log(error)
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