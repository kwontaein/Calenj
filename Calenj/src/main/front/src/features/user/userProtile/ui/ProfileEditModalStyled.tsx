import styled from 'styled-components';
import {TextColor, ThemeColor2, ThemeColor3} from "../../../../shared/ui/SharedStyled";

export const Modal_Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;


export const Modal_Content = styled.div`
    background: ${ThemeColor2};
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
`;

export const Modal_Input = styled.input`
    width: calc(100% - 20px);
    padding: 10px;
    color: ${TextColor};
    outline: none;
    border-radius: 5px;
    border: none;
    background-color: ${ThemeColor3};
`;

export const Modal_Button = styled.button`
    padding: 10px 20px;
    margin: 10px 5px;
    cursor: pointer;
`;
