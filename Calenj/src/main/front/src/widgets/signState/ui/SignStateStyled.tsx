import styled from "styled-components";
import {TextColor, ThemeColor3} from "../../../shared/ui/SharedStyled";

export const SIGN_STATE_TEXT = styled.span`
    color: ${TextColor}; /* 전체 페이지 텍스트 색상 */
    height: 30px;
    border-radius: 20px;
    border: 0;
    display: flex;
    align-items: center;
`;

export const SignState_Container = styled.div`
    background-color: ${ThemeColor3};
    color: ${TextColor}; /* 전체 페이지 텍스트 색상 */
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;

`;