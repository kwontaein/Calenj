import {TextColor, TextColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";
import styled from "styled-components";
import {MessageSend_Container_height} from "../../messageScrollBox/ui/MessageScrollBoxStyled";

export const MessageSend_Textarea = styled.textarea`
    background-color: transparent;
    color: ${TextColor};
    resize: none;
    width: calc(100% - 50px);
    font-size: 15px;
    padding: 10px;
    line-height: 20px;
    box-sizing: border-box; /* padding과 border를 높이에 포함 */
    border: 1px solid transparent;
    &:focus{
        border: 1px solid transparent;
        outline: none;
    }
    overflow-y: unset;


`
export const MessageIcon_Container = styled.div`
    width: 40px;
    height: 40px;
    margin-left: 10px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${TextColor2};
    &:hover{
        color: ${TextColor};
    }
    overflow-y: auto;
`

export const Message_Box_Container = styled.div<{$isFocus:boolean}>`
    width: calc(100% - 24px);
    border: 1px solid ${props=> props.$isFocus ? TextColor : TextColor2};
    height: calc(100% - 20px);
    margin-inline: 12px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
`


export const MessageInput_Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`





export const MessageSend_Container = styled.div<{$inputSize:number}>`
    height: ${props=>props.$inputSize}px; //padding 만큼 빼기
    padding-inline: 10px;
    display: flex;
    align-items: center;
`