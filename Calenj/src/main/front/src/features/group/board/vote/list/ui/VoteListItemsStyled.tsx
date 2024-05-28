import styled from "styled-components";
import {PointColor, TextColor2, ThemaColor3} from "../../../../../../style/FormStyle";

interface subScreenWidthProps{
    $subScreenWidth: number;
}

interface GroupVoteListProps{
    $join?:boolean;
}

export const GroupVoteListView_Li = styled.li`
    width: calc(100% - 20px);
    list-style: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-inline: 10px;
    padding-block: 5px;
    margin-block: 2px;
    &:hover {
        background-color: ${ThemaColor3};
    }
`


export const GroupVoteJoin_div = styled.div<GroupVoteListProps>`
    color: ${props=> props.$join ?  PointColor: `${TextColor2}77`};
    margin-top: 5px;
    font-size: 12px;
    align-items: center;
`



export const GroupVoterListTitle = styled.div<subScreenWidthProps>`
    width: 100%;
    max-width: ${props=>props.$subScreenWidth-40}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
