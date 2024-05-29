import styled from 'styled-components';
import {PointColor, TextColor, TextColor2, ThemaColor2, ThemaColor3} from "../../../../../../style/FormStyle";

interface DetailTopProps{
    $state:string,
}
export const BoardDetailTop_Container = styled.div`
    width: calc(100% - 20px);
    height: 38px;
    padding-inline: 10px;
    padding-block: 15px;
    background-color: ${ThemaColor3};
    color: ${TextColor};
    display: flex;
    flex-direction: row;
`

export const BoardDetailTop_title = styled.div<DetailTopProps>`
    font-size: ${props=> props.$state ==="notice"? "14px": "18px"};
    width: 100%;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: space-between;

`
