export interface GroupList_item {
    groupId: string;
    groupTitle: string;
    groupCreated: string;
}
interface groupMembers {
    groupRoleType: String;
    group_user_location: String;
    nickName: String;
    onlineStatus: string;
    userEmail: string;
}

export interface GroupDetail {
    groupId: string;
    groupTitle: string;
    groupCreated: string;
    groupCreater: string;
    members: groupMembers[];
}

export interface VoteList {
    voteId: string;
    myId: string;
    countVoter: string[];
    voteCreater: string;
    voteTitle: string;
    voteCreated: string;
    voteEndDate: string;
}

export interface NoticeList{
    noticeId : string;
    noticeTitle : string;
    noticeContent : string;
    noticeCreater : string;
    noticeCreated : string;
}

export interface FriendList {
    friendId: string;
    nickName: string;
    chattingRoomId: number;
    friendAddDate: string;
    ChattingRoomId: number;
}

export interface FriendEvent {
    createDate: string
    eventId: number
    eventName: string
    eventPurpose: string
    eventStatus: string
    eventUserId: string
    ownUserId: string
}