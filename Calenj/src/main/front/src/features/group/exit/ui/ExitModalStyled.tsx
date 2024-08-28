import styled from 'styled-components';
import {PointColor, PointColor2, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const GroupExitModal_Container = styled.div`
    background-color: ${ThemeColor2};
    width: 200px;
    min-height: 100px;
    max-height: 100px;
    padding: 15px;
    position: relative;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const Group_Exit_Wrapper = styled.div`


`
export const Group_Exit_Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 30px;
`
export const Content_Exit_Div = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
`
export const ExitLink_Div = styled.div`
    background-color: ${ThemeColor3};
    padding: 5px;
    border-radius: 5px;
    margin-inline: 5px;
`
export const Exit_Cancel_Div = styled.div`
    background-color: ${PointColor};
    padding: 5px;
    border-radius: 5px;
    margin-inline: 5px;
`