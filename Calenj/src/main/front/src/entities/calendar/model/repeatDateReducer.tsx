
export interface RepeatState {
    startTime: Date;
    endTime: Date;
    repeat: boolean;
    repeatOption: string;
    repeatNum: number;
    repeatEnd: Date;
}

export type RepeatAction =
    | { type: 'SET_START_TIME'; payload: Date }
    | { type: 'SET_END_TIME'; payload: Date }
    | { type: 'SET_REPEAT'; payload: boolean }
    | { type: 'SET_REPEAT_OPTION'; payload: string }
    | { type: 'SET_REPEAT_NUM'; payload: number }
    | { type: 'SET_REPEAT_END'; payload: Date };

export const initialRepeatState: RepeatState = {
    startTime: new Date(),
    endTime: new Date(),
    repeat: false,
    repeatOption: "일",
    repeatNum: 1,
    repeatEnd: new Date()
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
        case 'SET_REPEAT_END':
            return { ...state, repeatEnd: action.payload };
        default:
            return state;
    }
};
