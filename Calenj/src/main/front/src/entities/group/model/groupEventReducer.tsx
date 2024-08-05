type eventState = 'create' | 'modify' | '';

export interface groupEventSate {
    scheduleTitle: string,
    startDate: Date,
    privacy: boolean,
    isLimit: boolean,
    maxPeople: number,
}


export type GroupEventAction =
    | { type: 'SET_TITLE'; payload: string }
    | { type: 'SET_START_DATE'; payload: Date }
    | { type: 'SET_PRIVACY'; payload: boolean }
    | { type: 'SET_IS_LIMIT'; payload: boolean }
    | { type: 'SET_MAX_PEOPLE'; payload: number }
    ;

export const initialGroupEventState: groupEventSate = {
    scheduleTitle: '',
    startDate: new Date,
    privacy: false,
    isLimit: false,
    maxPeople: 1,
};


export const groupEventReducer = (state: groupEventSate, action: GroupEventAction): groupEventSate => {
    switch (action.type) {
        case 'SET_TITLE':
            return {...state, scheduleTitle: action.payload};
        case 'SET_START_DATE':
            return {...state, startDate: action.payload};
        case 'SET_PRIVACY':
            return {...state, privacy: action.payload};
        case 'SET_IS_LIMIT':
            return {...state, isLimit: action.payload};
        case 'SET_MAX_PEOPLE':
            return {...state, maxPeople: action.payload};
        default:
            return state;
    }
};
