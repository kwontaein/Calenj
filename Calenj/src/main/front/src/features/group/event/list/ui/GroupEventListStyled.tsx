import styled from "styled-components";
import {TextColor2, ThemeColor3} from "../../../../../shared/ui/SharedStyled";

export const GroupEventListView_Li = styled.li`
    width: calc(100% - 20px);
    list-style: none;
    padding-inline: 10px;
    padding-block: 10px;
    margin-block: 2px;

    &:hover {
        background-color: ${ThemeColor3};
    }
`

export const GroupEventListTitle = styled.div`
    width:100%;
    max-width: calc(100% - 30px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const MaxPeopleText_Container= styled.div`
    color: ${TextColor2};
    margin-top: 2px;
    font-size: 12px;
    align-items: center;
`