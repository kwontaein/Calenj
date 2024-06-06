import React, { useReducer } from 'react';

// Initial state
export interface EventDateState {
    startDate: Date;
    endDate: Date;
    title: string;
    content: string;
    formState: string;
    startMonth: number;
    endMonth: number;
}

// Define actions
export type EventDateAction =
    | { type: 'SET_START_DATE'; payload: Date }
    | { type: 'SET_END_DATE'; payload: Date }
    | { type: 'SET_TITLE'; payload: string }
    | { type: 'SET_CONTENT'; payload: string }
    | { type: 'SET_FORM_STATE'; payload: string }
    | { type: 'SET_START_MONTH'; payload: number }
    | { type: 'SET_END_MONTH'; payload: number };

// Initial state
export const initialEventDateState: EventDateState = {
    startDate: new Date(),
    endDate: new Date(),
    title: '',
    content: '',
    formState: 'A',
    startMonth: new Date().getMonth(),
    endMonth: new Date().getMonth()
};

// Reducer function
export const EventDateReducer = (state: EventDateState, action: EventDateAction): EventDateState => {
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
        default:
            return state;
    }
};
