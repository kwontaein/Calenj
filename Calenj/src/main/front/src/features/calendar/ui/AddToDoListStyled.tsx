import styled from "styled-components";
import {BackGroundColor, PointColor, TextColor, TextColor2, ThemaColor2} from "../../../shared/ui/SharedStyled";

export const AddToDoList_Container = styled.div`
    margin-left: 10px;
    width: calc(100% - 30px);
    height: 100%;
`
export const ListInput_Container = styled.div`
    width: 100%;
    height :30px;
    display: flex;
    flex-direction: row;
`

export const AddToDo_Input = styled.input`
    width: calc(100% - 52px);
    height: calc(100% - 6px);
    border-radius: 5px 0 0 5px;
    border-block: 2px solid ${ThemaColor2};
    border-left: 2px solid ${ThemaColor2};
    border-right: 0;
    padding-left: 10px;
    font-size: 14px;
    color: ${TextColor};
    background-color: ${ThemaColor2};

    &:focus {
        outline: none;
        border-block: 2px solid ${PointColor};
        border-left: 2px solid ${PointColor};
    }
`

export const AddVoteList_Btn = styled.button`
    display: flex;
    height: 100%;
    width: 50px;
    align-items: center;
    border-radius: 0 5px 5px 0;
    justify-content: center;
    font-size: 12px;
    font-weight: 550;
    background-color: ${BackGroundColor};
    &:hover{
        background-color: rgb(0,0,0,0.3);
    }
`

export const TodoList_Container = styled.div`
    margin-top: 5px;
    width: 100%;
    height: 170px;
    overflow-y: auto; /* 수직 스크롤을 활성화. */
`

export const TodoListEmptyText = styled.div`
    width: 100%;
    margin-left: -20px;
    height: 100%;
    color: ${TextColor2};
    display: flex;
    align-items: center;
    justify-content: center;
`



export const TodoListItem_Container = styled.div`
    width: calc(100% - 5px);
    height: 28px;
    display: flex;
    flex-direction: row;
    margin-block: 5px;
    justify-content: space-between;
    border-radius: 2px;
    border: 1px solid ${TextColor2}77;
    align-items: center;

`
export const TodoListItem_Content = styled.div`
    height: 100%;
    width: 250px;
    padding-left: 10px;
    display: flex;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: center;
    font-weight: 550;
`
export const TodoListContent_Drop_Btn = styled.button`
    height: 100%;
    width: 30px;
    display: flex;
    position: relative;
    align-items: center;
    border-radius: 0 5px 5px 0;
    justify-content: center;
    font-size: 10px;
    background-color: transparent;
    border-left: 0;
`