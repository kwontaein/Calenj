export interface NoticeDetails {
    groupId: string;
    noticeContent: string;
    noticeCreated: string;
    noticeCreater: string;
    noticeWatcher: string[];
    noticeTitle: string;
}

export interface NoticeListProps {
    noticeId: string,
    subWidth: number,
}