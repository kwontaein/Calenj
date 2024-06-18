import Select, { SingleValue, StylesConfig } from "react-select";
import React, {useEffect, useState} from 'react';
import {BackGroundColor, PointColor, TextColor, ThemeColor2} from "../../../../../shared/ui/SharedStyled";
import chroma from "chroma-js";
import {useDispatch, useSelector} from "react-redux";
import {setCalendarForm} from "../../../../../entities/redux/model/slice/CalendarControllerSlice";
import {RootState} from "../../../../../entities/redux";

// 옵션 타입 정의
export interface GridOption {
    readonly value: string;
    readonly label: string;
}

const options: GridOption[] = [
    { value: 'month', label: '월간' },
    { value: 'week', label: '주간' },
    { value: 'day', label: '일간' },
    { value: 'list', label: '목록' }
];

export const CalendarFromSelector: React.FC = () => {
    const {gridForm} = useSelector((state:RootState)=>state.calendarController)

    const formStyles: StylesConfig<GridOption, false> = {
        control: (styles) => ({ ...styles, backgroundColor: ThemeColor2, border: `1px solid ${TextColor}77`, height: '30px',width:'calc(100% - 2px)', padding:'5px' }),
        valueContainer: (styles) => ({ ...styles, height: '30px', overflow: 'auto' }),
        indicatorsContainer: (styles) => ({ ...styles, height: '30px' }),
        input: (styles) => ({ ...styles, padding: '0', color:TextColor }),
        dropdownIndicator: (styles) => ({ ...styles, fontSize: '8px', width: '30px', height: '30px', padding: '5px' }),
        clearIndicator: (styles) => ({ ...styles, fontSize: '8px', width: '30px', height: '30px', padding: '5px' }),
        menu: (styles) => ({ ...styles, backgroundColor: BackGroundColor, borderRadius: '4px', width:'100px' }),
        option: (styles, { isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected
                        ? ThemeColor2
                        : isFocused
                            ? BackGroundColor
                            : BackGroundColor,
                color: isSelected
                        ? PointColor
                        : TextColor,
                cursor: 'default',
            };
        },
        singleValue: (styles, { data }) => ({
            ...styles,
            color:TextColor,
            fontSize:'12px',
        }),

    };

    const dispatch = useDispatch();
    const handleChange = (newValue: SingleValue<GridOption>) => {
        if(newValue){
            dispatch(setCalendarForm({gridForm:{value:newValue.value, label:newValue.label}}))
        }
    };

    return (
        <Select
            closeMenuOnSelect={true}
            options={options}
            styles={formStyles}
            blurInputOnSelect={false}
            onChange={handleChange}
            isSearchable={false}
            value={gridForm}
            isMulti={false}
        />
    )
}
