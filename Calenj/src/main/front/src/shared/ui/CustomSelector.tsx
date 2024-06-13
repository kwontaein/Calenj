import Select, {StylesConfig} from "react-select";
import React from 'react';
import chroma from 'chroma-js';
import {BackGroundColor, ThemaColor2} from "./SharedStyled";

interface SelectorProps{
    options: ColourOption[];
}
export interface ColourOption {
    readonly id: string,
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isDisabled?: boolean;
}
export const  CustomSelector:React.FC<SelectorProps> = ({options}) =>{

    const colourStyles: StylesConfig<ColourOption, true> = {
        control: (styles) => ({ ...styles, backgroundColor: ThemaColor2 }),
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
                            : undefined,
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
        />
    )
}