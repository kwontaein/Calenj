
type eventState = 'create'|'modify'|'';

interface groupEventSate{
    title:string,
    startDate:Date,
    scopeType: string,
    isLimit:boolean,
    limitNum:number,
}


export type GroupEventAction =
    | { type: 'SET_TITLE'; payload: string }
    | { type: 'SET_START_DATE'; payload: Date }
    | { type: 'SET_SCOPE_TYPE'; payload: string }
    | { type: 'SET_IS_LIMIT'; payload: boolean }
    | { type: 'SET_LIMIT_NUM'; payload: number }
    ;

export const initialGroupEventState: groupEventSate = {
    title:'',
    startDate: new Date,
    scopeType: 'all',
    isLimit:false,
    limitNum:1,
};


export const GroupEventReducer = (state: groupEventSate, action: GroupEventAction): groupEventSate => {
    switch (action.type) {
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_START_DATE':
            return { ...state, startDate: action.payload };
        case 'SET_SCOPE_TYPE':
            return { ...state, scopeType: action.payload };
        case 'SET_IS_LIMIT':
            return { ...state, isLimit: action.payload };
        case 'SET_LIMIT_NUM':
            return { ...state, limitNum: action.payload };
        default:
            return state;
    }
};
