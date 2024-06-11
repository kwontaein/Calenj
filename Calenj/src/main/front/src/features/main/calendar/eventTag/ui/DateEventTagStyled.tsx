import styled from "styled-components";
import {TextColor, ThemaColor3} from "../../../../../shared/ui/SharedStyled";

const tagPaddingLeft = 20;

export const DateEventTag_Container = styled.div`
    width: 100%;
    height: 300px;
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
    padding: 5px;
    display: flex;
    align-items: center;
    padding-left: ${tagPaddingLeft}px;
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
    height: calc(100% - 35px);
`

export const TagItemIcon_Container= styled.div`
    width: 15%;
    height: 100%;
    color: transparent;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-weight: 550;
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

export const TagItem_Container = styled.li`
    width: 100%;
    height:30px;
    display: flex;
    flex-direction: row;
    &:hover {
        ${TagItemIcon_Container}{
                color: ${TextColor};
        }
        background-color: rgb(0,0,0,0.3);
    }
`

export const TagCheckBox = styled.input`
        
`

