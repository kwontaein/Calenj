import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import {PointColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../../../shared/ui/SharedStyled";


interface VoteProps {
    $isCreator: boolean;
    $ableClick: boolean;
}

interface VoteAble {
    $end: boolean
}


/** VoteDetail*/

export const TrasformButton = styled.button<VoteProps>`

    width: ${props => props.$isCreator ? '50%' : '100%'};
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid ${ThemeColor2};
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: ${props => props.$ableClick ? PointColor : ThemeColor2};

    &:hover {
        ${props => props.$ableClick && `
            background-color : ${PointColor}77;
        `}
    }
`;

/**
 * 투표 상태에 따른 체인지 버튼
 */

//투표에서 활용되는 div로 투표가 만료되면 투명도를 저절
export const TransVoteContainer = styled.div<VoteAble>`
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    background-color: ${ThemeColor3};
    border-radius: 10px;
    border: 1px solid ${ThemeColor2};
    padding: 10px;
    margin-Top: 20px;
    ${props => props.$end && `
        & > * {
            opacity: 0.8;
        }
    `}
`;


export const VoteDetail_Container = styled.div`
    width: 500px;
    height: auto;
    border-radius: 10px;
`

export const VoteContent_Container = styled.div`
    width: calc(100% - 20px);
    height: calc(100% - 90px);
    padding: 10px;
`

export const ViewVoter_Container = styled.div`
    border: 2px solid ${ThemeColor2};
    width: calc(100% - 20px);
    max-height: 220px;
    border-radius: 5px;
    background-color: ${ThemeColor3};
    padding: 10px;
    overflow-y: auto; /* 수직 스크롤을 활성화. */
`
export const VoteResult_Hr = styled.hr`
    width: 100%;
    margin-block: 10px;
    height: 2px;
    background-color: ${ThemeColor2};
    border: 0;
    border-radius: 10px;
`

export const MyVoteIcon = styled.div`
    border-radius: 50px;
    background-color: ${PointColor};
    color: white;
    font-weight: 550;
    font-size: 9px;
    padding: 2px;
    padding-inline: 4px;
    margin-right: 5px;
    margin-top: 3px;
`

export const VoteConditionItem_Container = styled.div`
    width: 100%;
    height: auto;
    margin-bottom: 10px;
`

export const VoteCondition_Item = styled.div`
    font-size: 12px;
    color: ${TextColor};
    margin-block: 3px;
    margin-inline: 3px;
`


export const VoteDetailItem_Container = styled.div`
    width: 100%;
    height: calc(100% - 60px); //VoteConditionItem_Container_height + margin-top 
`

export const VoteContentList_Container = styled.div`
    width: 100%;
    height: calc(100% - 50px);
    max-height: 400px;
    overflow-y: auto; /* 수직 스크롤을 활성화. */
`
export const VoteItem_Label = styled.label`
    width: 100%;
    display: flex;
    align-items: center;
    margin-block: 5px;
`


export const Vote_CheckBox = styled.input`
    width: 1.2rem;
    height: 1.2rem;
    appearance: none; //모양해제
    border-radius: 50%;
    background-color: ${TextColor}77;
    transition: background-color 300ms;
    cursor: pointer;


    &::before {
        content: '';
        color: transparent;
        display: block;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        border: none;
        background-color: transparent;
        background-size: cover;
        box-shadow: inset 0 0 0 1px #ccd3d8;
    }

    &:checked {
        background-color: ${PointColor};
        border: 1px solid ${ThemeColor3};
    }

    &:checked::before {
        box-shadow: none;
        background-image: url("data:image/svg+xml,%3Csvg   xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
    }

`

interface MyVoteProps {
    $isPick: boolean;
}


export const MyPickCheck_div = styled.div<MyVoteProps>`
    width: 1.2rem;
    height: 1.2rem;
    font-size: 14px;
    ${props => props.$isPick &&
            `background-image: url("data:image/svg+xml,%3Csvg   xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23007bff'/%3E%3C/svg%3E");
     fill: ${PointColor};`
    }
`

export const MyPickItem_div = styled.div<MyVoteProps>`
    margin-inline: 3px;
    color: ${props => props.$isPick ? PointColor : TextColor};
`

interface VoterPercentProps {
    $persent: number,
}

export const CurrentVotePersentLine = styled.div<VoterPercentProps>`
    width: ${props => 100 * props.$persent}%;
    height: 3px;
    background-color: ${PointColor};
`
export const CurrentVotePersentLine_BG = styled.div`
    width: calc(100% - 4px);
    height: 3px;
    margin: 2px;
    background-color: ${ThemeColor2};
`


export const VoteResultHover_div = styled.div`
    height: 20px;
    margin-left: 10px;
    margin-top: 1px;
    font-size: 14px;
    color: ${PointColor};
`