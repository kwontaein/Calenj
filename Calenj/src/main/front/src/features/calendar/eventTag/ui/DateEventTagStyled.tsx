import styled from "styled-components";
import {PointColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const tagPaddingLeft = 20;

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
    background-color: rgb(0,0,0,0.3);
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

export const ColorPicker_Container = styled.div`
    display: flex;
    position: absolute;
    z-index: 1;
    top:0;
    left:305px;
`