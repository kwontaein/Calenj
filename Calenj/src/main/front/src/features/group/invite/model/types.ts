export interface GroupInfo {
    groupId: string;
    groupTitle: string;
    inviter: string;
    onlineCount: number;
    memberCount: number;
    ableCode: string;
}



export interface Friends {
    // 친구 아이디
    friendUserId: string;
    // 친구 닉네임
    nickName: string;
}
