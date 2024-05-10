import styled from 'styled-components';
import {TextColor3, TextColor, TextColor2, ThemaColor2, PointColor} from "../FormStyle";


const GroupVoteModal_TopContent_Container_height =40
const GroupVoteModal_TopContent_Container_marginBottom = 10;
const MiniVote_Input_height =30;
const GroupVoteModal_Button_Container_marginTop =5;


export const GroupVoteModal_Container = styled.div`
    background-color: ${ThemaColor2};
    width: 400px;
    height:460px;
    padding: 15px;
    border-radius: 5px;
`
export const GroupVoteModal_close_Btn = styled.button`
    &:hover{
        background-color: rgb(0,0,0,0.4);
    }
`

export const MiniVote_Input = styled.input`
    width: calc(100% - 16px);
    height: ${MiniVote_Input_height}px;
    margin-block: 5px;
    border-radius: 5px;
    border: 2px solid #ccc;
    padding-left: 10px;
    font-size: 14px;
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
`
export const VoteTypeRadio_Label = styled.label`
    margin-right: 5px;
`

export const VoteType_Radio = styled.input`
    appearance: none; /* 기본 브라우저 스타일 제거 */
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid #ccc;
    background-color: ${TextColor};
    margin-right: 5px;
    margin-top: 5px;
    /* 체크됐을 때의 색상 */
    &:checked {
        background-color: #007bff; /* 체크됐을 때의 배경색 */
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
    color: ${TextColor3};
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
    align-content: center;
`

export const VoteCheckOption_Label = styled.label`
    margin-inline: 5px;
    height: 100%;
    align-items: center;
`
