import Select, {MultiValue, StylesConfig} from "react-select";
import React, {useEffect, useState} from 'react';
import chroma from 'chroma-js';
import {BackGroundColor, TextColor, ThemeColor2} from "./SharedStyled";
import {useSelector} from "react-redux";
import {RootState} from "../../entities/redux";

interface SelectorProps{
    options: ColorOption[];
    setValue:(values:MultiValue<ColorOption>)=>void,
    initSelected:string[];
}
export interface ColorOption {
    readonly id: string,
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isDisabled?: boolean;
}
export const  MultiSelector:React.FC<SelectorProps> = ({options,setValue,initSelected}) =>{
    const [selectedOptions, setSelectedOptions] = useState<MultiValue<ColorOption>>([]);
    const {dynamicEventTag} = useSelector((state: RootState) => state.dateEventTag)

    const selectHandler =(newValue: MultiValue<ColorOption>)=>{
        if(newValue.length>2){
            window.alert('최대 2개의 태그만 지정할 수 있습니다.')
        }else{
            console.log(newValue)
            setSelectedOptions(newValue)
            setValue(newValue)
        }
    }

    useEffect(() => {
        if(initSelected.length>0){
           initSelected.map((tagKey:string)=>{
               const colorOption ={
                   id: tagKey,
                   value: dynamicEventTag[tagKey].name,
                   label: dynamicEventTag[tagKey].name,
                   color: dynamicEventTag[tagKey].color,
                   isDisabled: false,
               }
               setSelectedOptions((prev)=>[...prev,colorOption])
           })
        }
    }, []);

    const colourStyles: StylesConfig<ColorOption, true> = {
        control: (styles) => ({ ...styles, backgroundColor: ThemeColor2, border: `1px solid ${TextColor}77`, minHeight:'25px', height:'30px'}),
        valueContainer : (styles) =>({ ...styles,height:'30px',overflow:'auto'}),
        indicatorsContainer: (styles) =>({...styles, height:'30px'}),
        input : (styles) =>({...styles, padding:'0'}),
        dropdownIndicator:(styles) =>({ ...styles, fontSize:'8px', width:'30px', height:'30px',padding:'5px'}),
        menu : (styles) =>({...styles, backgroundColor:BackGroundColor, borderRadius:'4px'}),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? BackGroundColor
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : ThemeColor2,
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
            value={selectedOptions}
            options={options}
            styles={colourStyles}
            onChange={selectHandler}
        />
    )
}