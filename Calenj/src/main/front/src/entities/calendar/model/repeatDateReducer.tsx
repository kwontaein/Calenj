
export interface RepeatState {
    startTime: Date,
    endTime: Date,
    repeat: boolean, //반복여부
    repeatNum: number,//반복횟수 (주기)
    repeatOption: string,//반복 형식(주/달/년) -주기
    repeatMode:string, //반복모드 (주기/요일)
    repeatDeadline :string, //반복 마감
    repeatEnd: Date; //반복 마감기간
    repeatCount:number, //반복횟수
    repeatWeek :boolean[],
}

export type RepeatAction =
    | { type: 'SET_START_TIME'; payload: Date }
    | { type: 'SET_END_TIME'; payload: Date }
    | { type: 'SET_REPEAT'; payload: boolean }
    | { type: 'SET_REPEAT_OPTION'; payload: string }
    | { type: 'SET_REPEAT_NUM'; payload: number }
    | { type: 'SET_REPEAT_DEADLINE'; payload: string }
    | { type: 'SET_REPEAT_COUNT'; payload: number }
    | { type: 'SET_REPEAT_END'; payload: Date }
    | { type: 'SET_REPEAT_MODE'; payload: string }
    | { type: 'SET_REPEAT_WEEK'; payload: boolean[] }
;



export const initialRepeatState: RepeatState = {
    startTime: new Date(),
    endTime: new Date(),
    repeat: false,
    repeatOption: "일",
    repeatNum: 1,
    repeatDeadline : "date",
    repeatEnd: new Date(),
    repeatMode:"none",
    repeatWeek :new Array(7).fill(false),
    repeatCount :1,
};

export const RepeatReducer = (state: RepeatState, action: RepeatAction): RepeatState => {
    switch (action.type) {
        case 'SET_START_TIME':
            return { ...state, startTime: action.payload };
        case 'SET_END_TIME':
            return { ...state, endTime: action.payload };
        case 'SET_REPEAT':
            return { ...state, repeat: action.payload };
        case 'SET_REPEAT_OPTION':
            return { ...state, repeatOption: action.payload };
        case 'SET_REPEAT_NUM':
            return { ...state, repeatNum: action.payload };
        case 'SET_REPEAT_DEADLINE':
            return { ...state, repeatDeadline: action.payload };
        case 'SET_REPEAT_END':
            return { ...state, repeatEnd: action.payload };
        case 'SET_REPEAT_MODE':
            return { ...state, repeatMode: action.payload };
        case 'SET_REPEAT_WEEK':
            return { ...state, repeatWeek: action.payload };
        case 'SET_REPEAT_COUNT':
        return { ...state, repeatCount: action.payload };

        default:
            return state;
    }
};
