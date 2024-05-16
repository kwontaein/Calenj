type role = "MANAGER" | "ADMIN" | "USER";

export interface UserData {
    nickname: string;
    userPassword: string;
    passwordCheck?: string;
    userEmail: string;
}

//인터페이스 확장
export interface User extends UserData {
    userRole?: role;
    userJoinDate?: string;
}