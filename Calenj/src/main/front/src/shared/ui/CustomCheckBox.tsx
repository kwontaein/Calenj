import {
    CustomCheck_Icon,
    CustomCheckBox_Input,
    CustomCheckBox_Label,
} from "./CustomCheckBoxStyled";
import {ChangeEvent, useEffect, useId, useState} from "react";

interface CheckBoxProps{
    isCheck:boolean,
    checkKey:string,
    bgColor:string,
    updateClickState: (id:string) =>void,
}
export const CustomCheckBox:React.FC<CheckBoxProps> = ({isCheck, checkKey, bgColor,updateClickState}) =>{
    const id = useId()
    return(
        <CustomCheckBox_Label className={checkKey+id}>
            <CustomCheckBox_Input key ={checkKey} checked={isCheck} onChange={()=>updateClickState(checkKey)}>
            </CustomCheckBox_Input>
            <CustomCheck_Icon $bgColor={bgColor}/>
        </CustomCheckBox_Label>
    )

}