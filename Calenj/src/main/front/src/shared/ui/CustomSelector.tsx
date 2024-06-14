import Select, {MultiValue, StylesConfig} from "react-select";
import React from 'react';
import chroma from 'chroma-js';
import {BackGroundColor, TextColor, ThemaColor2, ThemaColor3} from "./SharedStyled";

interface SelectorProps{
    options: ColorOption[];
    setValue:(values:MultiValue<ColorOption>)=>void,
}
export interface ColorOption {
    readonly id: string,
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isDisabled?: boolean;
}
export const  CustomSelector:React.FC<SelectorProps> = ({options,setValue}) =>{

    const colourStyles: StylesConfig<ColorOption, true> = {
        control: (styles) => ({ ...styles, backgroundColor: ThemaColor2, border: `1px solid ${TextColor}77`, minHeight:'25px', height:'30px'}),
        valueContainer : (styles) =>({display: 'flex', flexDirection:'row', width:'200px', height:'25px'}),
        input:(styles) =>({width:'0px'}),
        dropdownIndicator:(styles) =>({fontSize:'8px'}),
        clearIndicator:(styles)=>({fontSize:'8px'}),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : TextColor,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',
                fontSize: '12px',
                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },

        multiValue: (styles, { data }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: color.alpha(0.2).css(),
                display:"flex",
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.color,
            fontSize:'10px',
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ':hover': {
                backgroundColor: data.color,
                color: BackGroundColor,
            },
        }),
    };


    return(
        <Select
            closeMenuOnSelect={false}
            isMulti
            options={options}
            styles={colourStyles}
            onChange={(newValue: MultiValue<ColorOption>)=>{setValue(newValue)}}
        />
    )
}