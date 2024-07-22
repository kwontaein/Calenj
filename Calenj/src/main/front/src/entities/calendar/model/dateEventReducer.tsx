import React, { useReducer } from 'react';

// Initial state
export interface DateEventState {
    startDate: Date;
    endDate: Date;
    title: string;
    content: string;
    formState: string;
    startMonth: number;
    endMonth: number;
    backgroundColor:string,
    tagKeys : string[],
    friendList:string[],
}

interface friendListMap {
    [friendId:string]:{
        name:string,
    }
}

// Define actions
export type DateEventAction =
    | { type: 'SET_START_DATE'; payload: Date }
    | { type: 'SET_END_DATE'; payload: Date }
    | { type: 'SET_TITLE'; payload: string }
    | { type: 'SET_CONTENT'; payload: string }
    | { type: 'SET_FORM_STATE'; payload: string }
    | { type: 'SET_START_MONTH'; payload: number }
    | { type: 'SET_END_MONTH'; payload: number }
    | { type: 'SET_BG_COLOR'; payload:string}
    | { type: 'SET_TAG_KEYS'; payload: string[]}
    | { type: 'SET_FRIEND_LIST'; payload:string[]}
    ;

// Initial state
export const initialEventDateState: DateEventState = {
    startDate: new Date(),
    endDate: new Date(),
    title: '',
    content: '',
    formState: 'A',
    startMonth: new Date().getMonth(),
    endMonth: new Date().getMonth(),
    backgroundColor:'',
    tagKeys: [],
    friendList:[],
};

// Reducer function
export const DateEventReducer = (state: DateEventState, action: DateEventAction): DateEventState => {
    switch (action.type) {
        case 'SET_START_DATE':
            return { ...state, startDate: action.payload };
        case 'SET_END_DATE':
            return { ...state, endDate: action.payload };
        case 'SET_TITLE':
            return { ...state, title: action.payload };
        case 'SET_CONTENT':
            return { ...state, content: action.payload };
        case 'SET_FORM_STATE':
            return { ...state, formState: action.payload };
        case 'SET_START_MONTH':
            return { ...state, startMonth: action.payload };
        case 'SET_END_MONTH':
            return { ...state, endMonth: action.payload };
        case 'SET_BG_COLOR':
            return { ...state, backgroundColor: action.payload };
        case 'SET_TAG_KEYS':
            return { ...state, tagKeys : action.payload };
        case 'SET_FRIEND_LIST' :
            return {...state, friendList: action.payload}
        default:
            return state;
    }
};
