import styled from 'styled-components';
import {PointColor, TextColor, ThemeColor2, ThemeColor3} from "../../../../../../shared/ui/SharedStyled";


const GroupNoticeModal_TopContent_Container_height = 40
const GroupNoticeModal_Button_Container_height = 40;
const GroupNoticeModal_TopContent_Container_marginBottom = 10;
const GroupNoticeModal_Button_Container_marginTop = 5;
const GroupNoticeTitle_Input_height = 20;

/** MakeNotice **/
export const GroupNoticeModal_Textarea = styled.textarea`
    width: calc(100% - 10px);
    height: 310px;
    margin-top: 10px;
    padding: 5px;
    border-radius: 5px;
    border: 2px solid ${ThemeColor2};
    font-size: 15px;
    resize: none;
    font-weight: 550;
    background-color: ${ThemeColor2};
    color: ${TextColor};

    &:focus {
        outline: none;
        border: 2px solid ${PointColor};
    }
`


export const GroupNoticeTitle_Input = styled.input`
    width: calc(100% - 10px);
    height: ${GroupNoticeTitle_Input_height}px;
    padding: 5px;
    border-radius: 5px;
    border: 2px solid ${ThemeColor2};
    font-size: 15px;
    background-color: ${ThemeColor2};
    color: ${TextColor};

    &:focus {
        outline: none;
        border: 2px solid ${PointColor};
    }
`


export const GroupNoticeModal_Button_Container = styled.div`
    width: 100%;
    height: 40px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: right;
`
