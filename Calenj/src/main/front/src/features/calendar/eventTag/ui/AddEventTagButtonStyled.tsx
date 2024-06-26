import styled from "styled-components";
import {PointColor} from "../../../../shared/ui/SharedStyled";

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

export const CreateButton_Container= styled.div`
    width: 100%;
    height: calc(100% - 10px);
    display: flex;
    flex-direction: row;
    padding-top: 10px;
`
