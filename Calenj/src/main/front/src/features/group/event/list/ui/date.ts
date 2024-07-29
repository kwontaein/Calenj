//a116c767-b469-48b0-b134-4875a65e005a -> 간순대/ 5b9a14b0-deee-442f-aadf-ae309b153c27-> 김말이순대
export const groupEventData: GroupSchedule[] = [
    {
        groupScheduleId:'5b9a14b0-deee-442f-aadf-ae309b153c27',
        host:'5b9a14b0-deee-442f-aadf-ae309b153c27',
        manager:["5b9a14b0-deee-442f-aadf-ae309b153c27","a116c767-b469-48b0-b134-4875a65e005a","5b9a14b0-deee-442f-aadf-ae309b153c27"],
        schedule_Group:"3812acf0-df0b-4786-a77d-88583979fb82", //스케줄을 생성한 그룹
        groupScheduleTitle:"김말이 순대의 일정",
        groupScheduleCreate: new Date(),
        privacy:"all", //공개범위
        maxPeople:0, //최대인원
        attendUsers:["5b9a14b0-deee-442f-aadf-ae309b153c27","a116c767-b469-48b0-b134-4875a65e005a"],//참여자
        schedule : [
            {
                index: 1,
                scheduleTitle: "타임스퀘어 가기",
                scheduleContent: "타임스퀘어",
                scheduleCreate: new Date(),
                scheduleDuration: 60,
                joinUser: "5b9a14b0-deee-442f-aadf-ae309b153c27",
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