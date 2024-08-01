import {RepeatState} from "../../calendar";
import {Options} from "rrule";
import {QueryFunction} from "@tanstack/react-query";

export interface GroupList_item {
    groupId: string;
    groupTitle: string;
    groupCreated: string;
}

export interface groupMembers {
    groupRoleType: string;
    group_user_location: string;
    nickName: string;
    onlineStatus: string;
    userId: string;
}

export interface GroupDetail {
    groupId: string;
    groupTitle: string;
    groupCreated: string;
    groupCreator: string;
    members: groupMembers[];
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

export interface VoteList {
    voteId: string;
    myId: string;
    countVoter: string[];
    voteCreator: string;
    voteTitle: string;
    voteCreated: string;
    voteEndDate: string;
}

export interface VoteChoiceResponse {
    voteItem: string;
    voter: string[];
    voteIndex: number
}

export interface VoteDetail {
    voteCreator: string;
    voteTitle: string;
    voteCreated: string;
    voteEndDate: string;
    isMultiple: boolean;
    anonymous: boolean;
    voteWatcher: string[]
    voter: string[];
    countVoter: string[];
    voteChoiceResponse: VoteChoiceResponse[];
}


export interface FriendList {
    friendUserId: string;
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
    receivedUserId: string
    ownUserId: string
    nickName: string
}


export interface Message {
    chatUUID: string,
    sendDate: string,
    userId: string,
    messageType: string,
    message: string,
}

// interface FetchDataParams {
//     pageParam?: number;
// }
interface FetchDataParams {
    position: string,
    chatUUID: string,
}


export interface EventTagDTO {
    id: string,
    name: string,
    color: string,
    defaultTag: boolean, //기본 태그여부
}

export interface UserDateEvent {
    id: string,
    title: string,
    start: Date,
    end: Date,
    allDay: boolean,
    extendedProps: {
        tagKeys: string[],
        formState: string,
        content: string,
        todoList: string[],
        repeatState: RepeatState,
        friendList: string[],
    }
}


export interface UserInfo {
    nickname: string,
    userEmail: string,
    userIntroduce: string,
    userPhone: string,
    userJoinDate: string,
    userUsedName: string,
    userId: string,
}

export interface GroupSchedule {
    groupId: string, //스케줄을 생성한 그룹
    scheduleId: string,
    host: string,
    managers: string[],
    scheduleTitle: string,
    scheduleCreate: Date,
    startDate: Date,
    privacy: boolean, //공개범위
    maxPeople: number, //최대인원
    member: string[],//참여자
}

export interface SubSchedule {
    index: number,
    subSubScheduleId: string,
    subScheduleTitle: string,
    subScheduleContent: string,
    subScheduleCreate: Date,
    subScheduleDuration: number,
    joinUser: string[],
}


// export type FetchData = ({pageParam}: FetchDataParams) => Promise<Message[] | any[]>;
export type FetchData = QueryFunction<Message[], string[], { position: string; chatUUID: string; }>
export type ReceivedData = ({pageParam}: { pageParam?: number | undefined }) => Message;