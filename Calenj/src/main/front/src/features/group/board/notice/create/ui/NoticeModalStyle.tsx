import styled from 'styled-components';
import {PointColor, TextColor, ThemaColor2, ThemaColor3} from "../../../../../../shared/ui/SharedStyled";


const GroupNoticeModal_TopContent_Container_height = 40
const GroupNoticeModal_Button_Container_height = 40;
const GroupNoticeModal_TopContent_Container_marginBottom = 10;
const GroupNoticeModal_Button_Container_marginTop = 5;
const GroupNoticeTitle_Input_height = 20;

/** MakeNotice **/
//공지 생성하기
export const GroupNoticeModal_Container = styled.div`
    background-color: ${ThemaColor2};
    width: 400px;
    height: 50%;
    padding: 15px;
    border-radius: 5px;
`
export const GroupNoticeModal_Textarea = styled.textarea`
    width: calc(100% - 10px);
    height: calc(100% -
    ${
            //105(40+40+10+10+5)
            GroupNoticeModal_TopContent_Container_height +
            GroupNoticeModal_Button_Container_height +
            GroupNoticeModal_TopContent_Container_marginBottom +
            GroupNoticeModal_Button_Container_marginTop +
            GroupNoticeTitle_Input_height + 34
    }px);
    margin-top: 10px;
    padding: 5px;
    border-radius: 5px;
    border: 2px solid ${ThemaColor2};
    font-size: 15px;
    resize: none;
    font-weight: 550;
    background-color: ${ThemaColor3};
    color: ${TextColor};

    &:focus {
        outline: none;
        border: 2px solid;
        border-color: ${PointColor};
    }
`


export const GroupNoticeTitle_Input = styled.input`
    width: calc(100% - 10px);
    height: ${GroupNoticeTitle_Input_height}px;
    padding: 5px;
    border-radius: 5px;
    border: 2px solid ${ThemaColor2};
    font-size: 15px;
    background-color: ${ThemaColor3};
    color: ${TextColor};

    &:focus {
        outline: none;
        border: 2px solid;
        border-color: ${PointColor};
    }
`

export const GroupNoticeModal_TopContent_Container = styled.div`
    width: 100%;
    height: ${GroupNoticeModal_TopContent_Container_height}px;
    margin-bottom: ${GroupNoticeModal_TopContent_Container_marginBottom}px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const GroupNoticeModal_Title = styled.div`
    font-size: 20px;
`


export const GroupNoticeModal_Button_Container = styled.div`
    width: 100%;
    height: ${GroupNoticeModal_Button_Container_height}px;
    margin-top: ${GroupNoticeModal_Button_Container_marginTop}px;
    display: flex;
    align-items: center;
    justify-content: right;
`
export const GroupNoticeModal_close_Btn = styled.button`
    width: 70px;
    height: 100%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${ThemaColor3};
    margin-right: 5px;
    font-size: 14px;

    &:hover {
        background-color: rgb(0, 0, 0, 0.4);
    }
`