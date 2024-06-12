import styled from "styled-components";
import {PointColor, TextColor, ThemaColor3} from "../../../../../shared/ui/SharedStyled";

const tagPaddingLeft = 20;

interface ClickProps{
   $isClick : boolean,
}

export const DateEventTag_Container = styled.div`
    width: 100%;
    height: 200px;
`

export const TagTop_Container = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
        &:hover {
        background-color: rgb(0,0,0,0.3);
    }
`

export const TopContent_Container = styled.div`
    width: calc(85% - 10px);
    height: calc(100% - 10px);
    display: flex;
    align-items: center;
    padding: 5px 5px 5px ${tagPaddingLeft}px;
    font-size: 14px;
`
export const TopIcon_Container = styled.div`
    width: calc(15% - 10px);
    height: calc(100% - 10px);
    padding: 5px;
    display: flex;
    font-size: 20px;
`

export const BottomContent_Container = styled.div`
    width: 100%;
    height: calc(100% - 75px);
    overflow-y: auto;
`

export const TagItemIcon_Container= styled.div<ClickProps>`
    width: 13%;
    height: calc(100% - 4px);
    color: ${props=> props.$isClick ? TextColor : `transparent` };
    font-size: 12px;
    display: flex;
    margin-right: 2%;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-weight: 550;
    background-color: ${props=> props.$isClick ? `rgb(0,0,0,0.3)`: `transparent` };

        &:hover{
                background-color: rgb(0,0,0,0.3);
        }
`
export const TagItemContent_Container= styled.label`
        width: calc(85% - 10px);
        height: calc(100% - 10px);
        display: flex;
        align-items: center;
        padding: 5px 5px 5px ${tagPaddingLeft}px;
        font-size: 14px;
        flex-direction: row;
`
export const TagItemText_Container = styled.div`
    font-size: 14px;
    margin-left: 10px;

`

export const TagItem_Container = styled.li<ClickProps>`
    width: 100%;
    height:30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props=> props.$isClick ? `rgb(0,0,0,0.3)`: `transparent` };
    &:hover {
        ${TagItemIcon_Container}{
                color: ${TextColor};
        }
        background-color: rgb(0,0,0,0.3);
    }
`

export const AddTagButton_Container = styled.div`
    width: 100%;
    height: 45px;
`
export const AddTag_Button = styled.button`
    width: calc(100% - 20px);
    margin-top: 10px;
    margin-inline: 10px;
    background-color: ${PointColor};
    
    &:hover{
        background-color: ${PointColor}77;
    }
`

export const CreateTag_Container = styled.div`
    width: 100%;
    height:30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgb(0,0,0,0.3);
`
export const CreateTag_Content = styled.div`
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    display: flex;
    align-items: center;
    padding: 5px 5px 5px ${tagPaddingLeft}px;
    font-size: 14px;
    flex-direction: row;
`
export const CreateTagColor_Container = styled.div<{$color : string}>`
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: ${props =>props.$color};
    border: 1px solid ${TextColor};
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    margin-left: 4px;
`
export const CreateTagInput_Container = styled.input.attrs({ type: 'text' })`
    width: calc(100% - 90px);
    margin-inline: 15px;
    background-color: transparent;
    color:${TextColor};
    border: 1px dotted ${TextColor};

    &:focus {
        outline: none;
        border: 1px solid ${PointColor};
    }
`
export const CreateTagText_Container = styled.div`
    width: 30px;
    background-color: transparent;
    color:${PointColor};
    font-weight: 550;
    font-size: 12px;
`

export const CreateButton_Container= styled.div`
    width: 100%;
    height: calc(100% - 10px);
    display: flex;
    flex-direction: row;
    padding-top: 10px;
`

export const ColorPicker_Container = styled.div`
    display: flex;
    position: absolute;
    z-index: 1;
    top:0;
    left:305px;
`