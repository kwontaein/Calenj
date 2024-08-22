import styled from 'styled-components';
import {PointColor, PointColor2, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const GroupInviteModal_Container = styled.div`
    background-color: ${ThemeColor2};
    width: 420px;
    min-height: 200px;
    max-height: 500px;
    padding: 15px;
    position: relative;
`
export const Group_Invite_Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 30px;

`
export const Group_Invite_Title = styled.div`
    font-size: 20px;
`
export const Group_Name = styled.span`
    font-size: 20px;
    color: ${PointColor2};
`

export const Close_Button = styled.div`
    font-size: 12px;
`
export const No_Friend_Div = styled.div`
    background-color: ${ThemeColor3};
    padding: 10px;
`

export const InviteLink_Div = styled.div`
    padding: 10px;
    background-color: ${ThemeColor3}77;
    margin-block: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Copy_Link = styled.button`
    background-color: ${PointColor};
    font-size: 12px;
`