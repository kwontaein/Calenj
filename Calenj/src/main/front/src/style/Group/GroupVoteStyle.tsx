import styled from 'styled-components';
import {TextColor, TextColor2, ThemaColor2, PointColor, ThemaColor3, PointColor2} from "../FormStyle";
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const GroupVoteModal_TopContent_Container_height =40
const GroupVoteModal_TopContent_Container_marginBottom = 10;
const MiniVote_Input_height =30;
const GroupVoteModal_Button_Container_marginTop =5;


/** VoteMake **/
export const GroupVoteModal_Container = styled.div`
    background-color: ${ThemaColor2};
    width: 400px;
    height:460px;
    padding: 15px;
    border-radius: 5px;
`
export const GroupVoteModal_close_Btn = styled.button`
    width: 70px;
    height: 100%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${ThemaColor3};
    margin-right: 5px;
    font-size: 14px;
    &:hover{
        background-color: rgb(0,0,0,0.4);
    }
`

//1588 1688
export const MiniVote_Input = styled.input`
    width: calc(100% - 16px);
    height: ${MiniVote_Input_height}px;
    margin-block: 5px;
    border-radius: 5px;
    border: 2px solid ${ThemaColor3};
    padding-left: 10px;
    font-size: 14px;
    color: ${TextColor};
    background-color: ${ThemaColor2};
    &:focus{
        outline: none;
        border: 2px solid;
        border-color: ${PointColor};
    }
`

export const GroupVoteModal_TopContent_Container = styled.div`
    width: 100%;
    height:${GroupVoteModal_TopContent_Container_height}px;
    margin-bottom:${GroupVoteModal_TopContent_Container_marginBottom}px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const GroupVoteModal_Title = styled.div`
    font-size: 20px;
`

export const ListInput_Container = styled.div`
    display: flex;
    flex-direction: row;
`
export const AddVoteList_Btn = styled.button`
    display: flex;
    position: absolute;
    margin-top: 5px;
    margin-left: 341px;
    height: ${MiniVote_Input_height+6}px;
    width: 60px;
    align-items: center;
    border-radius: 0 5px 5px 0;
    justify-content: center;
    font-size: 14px;
    font-weight: 550;
`

export const VoteTypeRadio_Lable_Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 30px;
    align-items: center;
    &:focus{
        outline: none;
        border: 2px solid ${PointColor};
    }
`
export const VoteTypeRadio_Label = styled.label`
    margin-right: 5px;
`

export const VoteType_Radio = styled.input`
    appearance: none; /* 기본 브라우저 스타일 제거 */
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid ${ThemaColor3};
    background-color: ${ThemaColor2};
    margin-right: 5px;
    margin-top: 5px;
    /* 체크됐을 때의 색상 */
    &:checked {
        background-color: ${PointColor}; /* 체크됐을 때의 배경색 */
        border-color: ${TextColor}; /* 체크됐을 때의 테두리 색 */
    }
    &:focus {
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5); /* 포커스 효과 */
    }
`

export const VoteList_Container = styled.div`
    margin-top:5px;
    height: 170px;
    overflow-y: auto; /* 수직 스크롤을 활성화. */
`

export const VoteListEmptyText = styled.div`
    width: 100%;
    height: 100%;
    color: ${TextColor2};
    display: flex;
    align-items: center;
    justify-content: center;
`

export const VoteListItem_Container = styled.div`
    width: calc(100% - 3px);
    height: ${GroupVoteModal_TopContent_Container_height-10}px;
    display: flex;
    flex-direction: row;
    margin-block: 10px;
    border-radius: 5px;
    border: 1px solid ${TextColor2};
    border-right: 0px;
    align-items: center;

`
export const VoteListItem_Content = styled.div`
    height: 100%;
    width: 360px;
    padding-left: 10px;
    display: flex;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: center;
    font-weight: 550;
`

export const VoteListContent_Drop_Btn = styled.button`
    height: ${MiniVote_Input_height+2}px;
    width: 60px;
    display: flex;
    position: relative;
    align-items: center;
    border-radius: 0 5px 5px 0;
    justify-content: center;
    font-size: 13px;
    border: 1px solid ${TextColor2};
    border-left: 0px;
`

export const ButtomContent_Containr = styled.div`
    margin-top: 10px;
`


export const GroupVoteModal_Button_Container = styled.div`
    width: 100%;
    height:${GroupVoteModal_TopContent_Container_height}px;
    margin-top: ${GroupVoteModal_Button_Container_marginTop}px;
    display: flex;
    align-items: center;
    justify-content: right;
`

export const VoteSetting_Container = styled.div`
    width: 100%;
    height: 37px;
    display: flex;
    flex-direction: row;
`
export const VoteCheckOption_Container = styled.div`
    width: 195px;
    height: 100%;
    margin-left: 5px;
    display: flex;
    align-items: center;
`

export const VoteCheckOption_Label = styled.label`
    margin-inline: 5px;
    height: 100%;
    display: flex;
    align-items: center;
    
`
export const VoteCheckStyle_CheckBox = styled.input`
    appearance: none; /* 기본 브라우저 스타일 제거 */
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid ${ThemaColor3};
    background-color: ${ThemaColor2};
    margin-right: 5px;
    /* 체크됐을 때의 색상 */
    &:checked {
        background-color: ${PointColor}; /* 체크됐을 때의 배경색 */
        border-color: ${TextColor}; /* 체크됐을 때의 테두리 색 */
        border: 2px solid ${TextColor}
    }
    &:focus {
        box-shadow: ${PointColor}; /* 포커스 효과 */
    }
`



export const DatePicker_Styled = styled(DatePicker)`
    width: 200px;
    height : 20px;
    margin-block: 5px;
    border-radius: 5px;
    border: 0px solid ${ThemaColor3};
    background-color: ${ThemaColor2};
    color:${TextColor};
`;



export const VoteCounter_DatePicker = styled(DatePicker)`
    width: 200%;
    height: 30px;
    margin-block: 5px;
    background-color: ${ThemaColor2};
    color:${TextColor};
    border-radius: 5px;
    border: 2px solid ${ThemaColor3};
    padding-left: 10px;
    font-size: 14px;
    &:focus{
        outline: none;
        border: 2px solid ${PointColor};
    }
`;

/** VoteList **/
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
    margin-block: 2px;

    &:hover {
        background-color: ${ThemaColor3};
    }
`




export const GroupVoteListDivistion = styled.div`
    font-size: 12px;
    align-items: center;
    padding-block: 5px;
    padding-inline: 2px;
    color: ${TextColor2};
    background-color: ${ThemaColor3}A5;
`
export const GroupVoteListContainer = styled.div`
    height: calc(100% - 40px);
    width: 100%;
`
export const GroupVoterListTitle = styled.div<subScreenWidthProps>`
    width: 100%;
    max-width: ${props=>props.$subScreenWidth-40}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`


/** VoteDetail*/

export const TrasformButton = styled.button<VoteProps>`
    
    width: ${props => props.$isCreater ? '50%' : '100%'};
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    font-size: 15px;
    border-radius: 5px;
    border: 1px solid ${ThemaColor2};
    cursor: pointer;
    transition : background-color 0.3s ease;
    background-color: ${props => props.$ableClick ? PointColor : ThemaColor2};
    &:hover{
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
    background-color: ${ThemaColor3};
    border-radius: 10px;
    border: 1px solid ${ThemaColor2};
    padding: 10px;
    margin-Top: 20px;
    ${props => props.$end && `
        & > * {
            opacity: 0.7;
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

export const ViewVoter_Container =styled.div`
    width: calc(100% - 20px);
    max-height: 300px;
    border-radius: 5px;
    background-color: ${ThemaColor3};
    padding: 10px;
    margin-Top: 20px;
    overflow-y: auto; /* 수직 스크롤을 활성화. */
`
export const VoteResult_Hr = styled.hr`
    width: 100%;
    margin-block: 10px;
    height: 2px;
    background-color: ${ThemaColor2};
    border: 0px;
    border-radius: 10px;
`

export const MyVoteIcon =styled.div`
    border-radius: 50px;
    background-color: ${PointColor};
    color: white;
    font-weight: 550;
    font-size: 10px;
    padding: 3px;
    margin-top: 1px;`

export const VoteConditionItem_Container = styled.div`
    width: 100%;
    height: 50px;
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

export const VoteContentList_Container =styled.div`
    width: 100%;
    height: calc(100% - 50px);
    max-height: 500px;
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
    appearance: none;//모양해제
    border-radius: 50%;
    background-color: #ffffff;
    transition: background-color 300ms;
    cursor: pointer;


    &::before {
        content: '';
        color: transparent;
        display: block;
        width: inherit;
        height: inherit;
        border-radius: inherit;
        border: 0;
        background-color: transparent;
        background-size: contain;
        box-shadow: inset 0 0 0 1px #ccd3d8;
    }

    &:checked {
        background-color: #0070E8;
    }

    &:checked::before {
        box-shadow: none;
        background-image: url("data:image/svg+xml,%3Csvg   xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E %3Cpath d='M15.88 8.29L10 14.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0z' fill='%23fff'/%3E %3C/svg%3E");
    }
    
`
interface MyVoteProps{
    $isPick:boolean;
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
    color: ${props=> props.$isPick ? PointColor : TextColor};
`
interface VoterPercentProps{
    $persent:number,
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
    background-color: ${ThemaColor2};
`



export const VoteResultHover_div = styled.div`
    height: 20px;
    margin-left: 10px;
    margin-top:1px;
    font-size:14px;
    color: ${PointColor};    
`