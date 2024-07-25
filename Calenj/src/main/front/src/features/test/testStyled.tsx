import styled from "styled-components";
import {PointColor, TextColor, ThemeColor2, ThemeColor3} from "../../shared/ui/SharedStyled";

export const TestContainer = styled.div`
    width: 1000px;
`
export const TestDiv = styled.div`
    text-align: center;
    font-size: 40px;
    width: 500px;
    border-radius: 5px;
    border: 1px solid ${TextColor};
    background-color: ${ThemeColor2};
    white-space: pre-wrap;
`

export const TestProgress = styled.div`
    display: flex;
    align-items: center;
`
export const Structure_Container = styled.div`
    display: flex;
    align-items: center;
`

export const StandHr = styled.hr<{ $isNow: boolean }>`
    min-height: 110px;
    border: 1px solid ${props => props.$isNow ? PointColor : TextColor};
    margin: 0 0 0 9px;
`

export const Line = styled.div<{ $isNow: boolean }>`
    height: 2px;
    width: 40px;
    background-color: ${props => props.$isNow ? PointColor : TextColor};
`

export const Circle = styled.div<{ $isNow: boolean }>`
    height: 16px;
    width: 16px;
    border: 2px solid white;
    background-color: ${props => props.$isNow ? PointColor : TextColor};
    border-radius: 50%;
    position: absolute;
`