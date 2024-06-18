import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface GridOption {
    readonly value: string;
    readonly label: string;
}

interface CalendarState {
    compound: string;
    gridForm:GridOption;
}

const initialState: CalendarState = {
    compound: '',
    gridForm:{value:"month", label:"월간"},
};

const calendarControllerSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setCalendarCompound: (state, action: PayloadAction<{ compound: string }>) => {
            if(action.payload){
                state.compound = action.payload.compound;
            }
        },
        setCalendarForm : (state, action: PayloadAction<{ gridForm: GridOption }>) => {
            if(action.payload){
                state.gridForm = action.payload.gridForm;
            }
        },
    },
});

export const { setCalendarCompound, setCalendarForm } = calendarControllerSlice.actions;
export default calendarControllerSlice.reducer;