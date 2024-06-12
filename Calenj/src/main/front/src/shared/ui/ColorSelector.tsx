import React, {useState} from 'react';
import {ColorResult, SketchPicker} from 'react-color';
import styled from "styled-components";
import {BackGroundColor, Modal_Condition_Button, TextColor, ThemaColor3} from "./SharedStyled";



const StyledSketchPicker = styled(SketchPicker)`
        background-color:  ${BackGroundColor} !important;
        color: ${TextColor} !important;
      
        input {
            color: ${TextColor} !important;
            background-color: ${ThemaColor3};
        }
    
        .flexbox-fix,
        .sketch-picker__header,
        .sketch-picker__body,
        .sketch-picker__footer {
            background-color: ${BackGroundColor} !important;
        }
    `;

const StyledSketchButton_Container= styled.div`
        width: 200px;
        height: 30px;
        padding-inline: 10px;
        padding-bottom: 10px;
        display: flex;
        flex-direction: row;
        background-color: ${BackGroundColor};
        box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px, rgba(0, 0, 0, 0.15) 0 8px 16px;
        border-radius: 0 0 4px 4px;
        align-items: center;
        justify-content: right;
    }
`
interface ColorProps{
    color : string,
    changeColor: (color:string)=>void,
}

export const ColorSelector : React.FC<ColorProps> = ({color, changeColor}) =>{
    const [pickerColor,setPickerColor] = useState<string>(color);

    return(
        <div>
        <StyledSketchPicker
            color={pickerColor}
            onChange={(color: ColorResult)=>{setPickerColor(color.hex)}}
            className="custom-sketch-picker"
        />
        <StyledSketchButton_Container>
            <Modal_Condition_Button style={{width:"50px", height:"30px", borderRadius:'4px'}}
                                    $isAble={color!==pickerColor}
                                    onClick={()=>color!==pickerColor && changeColor(pickerColor)}>
                변경
            </Modal_Condition_Button>
        </StyledSketchButton_Container>
        </div>
    )
}