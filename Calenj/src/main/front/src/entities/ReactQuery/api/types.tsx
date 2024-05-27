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
    groupCreator: string;
    members: groupMembers[];
}

export interface VoteList {
    voteId: string;
    myId: string;
    countVoter: string[];
    voteCreator: string;
    voteTitle: string;
    voteCreated: string;
    voteEndDate: string;
}

export interface NoticeList {
    noticeId: string;
    noticeTitle: string;
    noticeContent: string;
    noticeCreator: string;
    noticeCreated: string;
}

export interface NoticeDetail {
    groupId: string;
    noticeContent: string;
    noticeCreated: string;
    noticeCreator: string;
    noticeWatcher: string[];
    noticeTitle: string;
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

export interface Message {
    chatUUID: string,
    sendDate: string,
    userId: string,
    messageType: string,
    message: string,
}

interface FetchDataParams {
    pageParam?: number;
}

export type FetchData = ({pageParam}: FetchDataParams) => Promise<Message[] | any[]>;
export type ReceiveData = ({pageParam}: { pageParam?: number | undefined }) => Message