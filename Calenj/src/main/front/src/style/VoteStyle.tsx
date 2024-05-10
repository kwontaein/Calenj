import styled from 'styled-components'
import {TextColor2, TextColor3, ThemaColor2} from "./FormStyle";

interface VoteProps {
    $isCreater: boolean;
    $ableClick: boolean;
}

interface VoteAble {
    $end: boolean
}

interface subScreenWidthProps{
    $subScreenWidth: number;
}

export const GroupVoteList_Container = styled.div`
    width: 100%;
    height: calc(100% - 5px);
`

export const GroupVoteListView_Li = styled.li`
    width: calc(100% - 20px);
    list-style: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-inline: 10px;
    padding-block: 5px;

    &:hover {
        background-color: ${ThemaColor2};
    }
`



/**
 * 투표 상태에 따른 체인지 버튼
 */
export const TrasformButton = styled.button<VoteProps>`
    
    width: ${props => props.$isCreater ? '43.5vw' : '88vw'};
    padding: ${props => props.$isCreater ? '1.2vw' : '15px'};
    margin-top: 2vw;
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    ${props => props.$ableClick ?
    `cursor: pointer;
        hover:#ccc;
        transition : background-color 0.3s ease;
        &:hover{
            background-color: rgb(228, 227, 227);
        }`
    :
    `
    background-color : #fafafa;
    color :#d6d6d6;
    border: 1px solid rgb(219, 219, 219);
    `}
   
`;

//투표에서 활용되는 div로 투표가 만료되면 투명도를 저절
export const TransVoteContainer = styled.div<VoteAble>`
    margin-top: 20px;
    
    ${props => props.$end && `
        & > * {
            opacity: 0.7;
        }
    `}
`;

export const GroupVoteListDivistion = styled.div`
    color: ${TextColor3};
    font-size: 12px;
    align-items: center;
    padding-block: 5px;
    padding-inline: 2px;
    border-block: 1px solid ${TextColor2};
`
export const GroupVoteListContainer = styled.div`
    height: calc(100% - 40px);
    width: 100%;
`
export const GroupVoterListTitle = styled.div<subScreenWidthProps>`
    width: 100%;
    max-width: ${props=>props.$subScreenWidth-30}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`


