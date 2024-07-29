//a116c767-b469-48b0-b134-4875a65e005a -> 간순대/ 5b9a14b0-deee-442f-aadf-ae309b153c27-> 김말이순대
export const groupEventData: GroupSchedule[] = [
    {
        groupScheduleId: '5b9a14b0-deee-442f-aadf-ae309b153c27',
        host: '7be04141-31b0-4318-9e0f-6613c22',
        manager: ["7be04141-31b0-4318-9e0f-6613c22"],
        schedule_Group: "ed957f84-6e3e-432c-963e-cbe073f647a4", //스케줄을 생성한 그룹
        groupScheduleTitle: "김말이 순대의 일정",
        groupScheduleCreate: new Date(),
        privacy: "all", //공개범위
        maxPeople: 0, //최대인원
        attendUsers: ["7be04141-31b0-4318-9e0f-6613c22"],//참여자
        schedule: [
            {
                index: 1,
                scheduleTitle: "타임스퀘어 가기",
                scheduleContent: "타임스퀘어",
                scheduleCreate: new Date(),
                scheduleDuration: 60,
                joinUser: "7be04141-31b0-4318-9e0f-6613c22",
            }
        ]
    }
]

interface GroupSchedule {
    groupScheduleId: string,
    host: string,
    manager: string[],
    schedule_Group: string, //스케줄을 생성한 그룹
    groupScheduleTitle: string,
    groupScheduleCreate: Date,
    privacy: string, //공개범위
    maxPeople: number, //최대인원
    attendUsers: string[],//참여자
    schedule: SubSchedule[],
}

interface SubSchedule {
    index: number,
    scheduleTitle: string,
    scheduleContent: string,
    scheduleCreate: Date,
    scheduleDuration: number,
    joinUser: string,
}