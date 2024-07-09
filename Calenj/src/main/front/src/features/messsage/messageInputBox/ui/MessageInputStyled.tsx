import {TextColor, TextColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";
import styled from "styled-components";
import {MessageSend_Container_height} from "../../messageScrollBox/ui/MessageScrollBoxStyled";

export const MessageSend_Textarea = styled.textarea`
    background-color: ${ThemeColor3}60;
    color: ${TextColor};
    border-radius: 4px;
    resize: none;
    border: 1px solid ${TextColor2};
    width: calc(100% - 80px);
    margin-inline: 12px;
    font-size: 15px;
    padding: 9px;
    line-height: 20px;
    box-sizing: border-box; /* padding과 border를 높이에 포함 */
`


export const MessageSend_Container = styled.div<{ $inputSize: number }>`
    height: ${props => props.$inputSize - 20}px; //padding 만큼 빼기
    padding-inline: 10px;
    display: flex;
`